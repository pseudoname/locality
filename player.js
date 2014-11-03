var LocalityPlayer = function(map, viewContainerEle, options){
  var self = this;
  var _map = map;
  var _panorama;
  var _options = options || {};
  var _viewContainer = viewContainerEle;
  var _currentStep = 0;
  var _currentRoute;
  
  if(!_options.position){
    _options = {
      position: _map.getCenter(),
      pov: {
        heading: 34,
        pitch: 0
      },
      speed:1000
    };
  }
  _panorama = new google.maps.StreetViewPanorama(_viewContainer, _options);
  _map.setStreetView(_panorama);
  self.addPanoramaEvent = function(eventName, handler){
    google.maps.event.addListener(_panorama, eventName, handler);
  };
  self.addPanoramaEvent('pano_changed', function(){
    if(_currentStep > -1 && _currentStep >= _currentRoute.length){
      _currentStep = 0;
      _currentRoute = [];
      if(_options.playEnded){
        _options.playEnded();
      }
      return;
    }
    _map.setStreetView(_panorama);
    _currentStep++;
    console.log("Street View set on map for step " + _currentStep-1);
    self.setPosition(_currentRoute[_currentStep-1]);
    console.log('Status of set position for Pano ID ' + _panorama.getPano() + ' is ' + _panorama.getStatus());
      
      
      
  });
  self.setViewContainer = function(ele){
    _viewContainer = ele;
  };
  self.loadStreetView = function(container, options){
    _panorama = new google.maps.StreetViewPanorama(container, options);
    _map.setStreetView(_panorama);
  };
  self.setPosition = function(position){
    _options.position = position;
    
    _panorama.setPosition(position);
    if(_currentRoute.length > 0 && _currentStep > 0 && _options.streetViewChanged){
        _options.streetViewChanged(_currentRoute[_currentStep-1]);
    }
    
  };
  self.play = function(route){
    var panoramas = [];
    for(var i=0; i<route.overview_path.length; i++){
      var panoOptions = {
        pov: _options.pov,
        speed:_options.speed
      };
      var pano = new google.maps.StreetViewPanorama(_viewContainer, panoOptions);
      pano.setPosition(route.overview_path[i]);
      panoramas.push(pano);
    }
    _currentRoute = route.overview_path;
    self.setPosition(_currentRoute[_currentStep]);
    //stepThrough(0,0,0,route);
    
    //stepThroughPath(route.overview_path, 0);
    
    //self.setPosition(route.overview_path[3]);
  };
  function stepThroughPath(panos, currentStep){
    
    if(currentStep >= panos.length){
      if(_options.playEnded){
        _options.playEnded();
      }
      return;
    }
    console.log("Step " + currentStep + " position: " + panos[currentStep].toString());
    setTimeout(function(){
      //console.log('Current Step: ' + currentStep);
      
      self.setPosition(panos[currentStep]);
      //_map.setStreetView(_panorama);
      console.log("Street View set on map for step " + currentStep);
      if(_options.streetViewChanged){
        _options.streetViewChanged(panos[currentStep]);
      }
      currentStep++;
      stepThroughPath(panos, currentStep);
    },_options.speed);
  }
  
}
