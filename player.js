var LocalityPlayer = function(map, viewContainerEle, options){
  var self = this;
  var _map = map;
  var _panorama;
  var _options = options || {};
  var _viewContainer = viewContainerEle;
  if(!_options.position){
    _options = {
      position: _map.getCenter(),
      pov: {
        heading: 34,
        pitch: 0
      },
      speed:500
    };
  }
  self.playEnded = function(callback){
    if(callback){
      callback();
    }
  };
  self.setViewContainer = function(ele){
    _viewContainer = ele;
  };
  self.loadStreetView = function(){
    _panorama = new google.maps.StreetViewPanorama(_viewContainer, _options);
    _map.setStreetView(_panorama);
  };
  self.setPosition = function(position){
    _options.position = position;
    _panorama.setPosition(position);
  };
  self.play = function(route, positionChangedFn){
    var panoramas = [];
    for(var i=0; i<route.overview_path.length; i++){
      var pano = new google.maps.StreetViewPanorama(_viewContainer, _options);
      pano.setPosition(route.overview_path[i]);
      panoramas.push(pano);
    }
    //stepThrough(0,0,0,route);
    stepThroughPath(panoramas, 0);
  };
  function stepThroughPath(panos, currentStep){
    if(currentStep >= panos.length){
      return;
    }
    setTimeout(function(){
      console.log('Current Step: ' + currentStep);
      
      //_panorama.setPosition(route.overview_path[currentStep]);
      _map.setStreetView(panos[currentStep]);
      currentStep++;
      stepThroughPath(panos, currentStep);
    },_options.speed);
  }
  
}
