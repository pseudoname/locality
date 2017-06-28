var LocalityPlayer = function(map, viewContainerEle, options){
  var self = this;
  var _map = map;
  var _panorama;
  var _options = MergeRecursive(_options,options);
  var _viewContainer = viewContainerEle;
  var _currentStep = 0;
  var _currentRoute = [];
  
  if(!_options){
    _options = {
      panoOptions:{
        position: _map.getCenter(),
        pov: {
          heading: 34,
          pitch: 0
        }
      },
      speed:1000
    };
  }
  _panorama = new google.maps.StreetViewPanorama(_viewContainer, _options.panoOptions);
  _map.setStreetView(_panorama);
  self.addPanoramaEvent = function(eventName, handler){
    google.maps.event.addListener(_panorama, eventName, handler);
  };
  
  self.setViewContainer = function(ele){
    _viewContainer = ele;
  };
  self.loadStreetView = function(container, options){
    _panorama = new google.maps.StreetViewPanorama(container, options);
    _map.setStreetView(_panorama);
  };
  self.setPosition = function(position){
    _options.panoOptions.position = position;
    _panorama.setPosition(position);
    if(_currentRoute && _currentRoute.length > 0 && _currentStep > 0 && _options.streetViewChanged){
        _options.streetViewChanged(_currentRoute[_currentStep-1]);
    }
    _map.setStreetView(_panorama);
  };
  self.play = function(route){
    _currentRoute = route.overview_path;
    stepThroughPath(route, 0);
  };
  
  function stepThroughPath(route, currentStep){
    _currentStep = currentStep;
    if(currentStep >= route.overview_path.length){
      _currentStep = 0;
       return;
     }
    setTimeout(function(){
      console.log('Current Step: ' + currentStep);
      _panorama.setPosition(route.overview_path[currentStep]);
      _map.setStreetView(_panorama);
     currentStep++;
      stepThroughPath(route, currentStep);
    },_options.speed);
  }
  /*
  * Recursively merge properties of two objects 
  */
  function MergeRecursive(obj1, obj2) {
    if(obj2 == null || obj2 == undefined){
      return obj1;
    }
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor==Object ) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
  
        } else {
          obj1[p] = obj2[p];
  
        }
  
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
  
      }
    }
  return obj1;
  }
}
