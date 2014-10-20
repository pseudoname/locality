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
      }
    };
  }
  self.setViewContainer = function(ele){
    _viewContainer = ele;
  };
  self.loadStreetView = function(){
    _panorama = new google.maps.StreetViewPanorama(_viewContainer, _options);
    _map.setStreetView(_panorama);
  };
  self.setPosition = function(position){
    _options.position = position;
    _panoram.setPosition(position);
  };
  self.play = function(route, positionChangedFn){
    if(options){
      _options = options;
      
    }
    google.maps.event.clearInstanceListeners(_panorama);
    google.maps.event.addListener(_panorama, 'position_changed', function(){
      if(positionChangedFn){
        positionChangedFn(panorama.getPosition());
      }
    });
    _map.setStreetView(panorama);
    for(int i=0; i< route.legs.length;i++){
      for(int j=0; j<route.legs[i].steps.length; j++){
        for(int k=0; k<route.legs[i].steps[j].path.length; k++){
          var interval = setInterval(_options.speed, function(){
            panorama.setPosition(route.legs[i].steps[j].path[k]);
            clearInterval(interval);
          });
        }
      }
    }
  };
}
