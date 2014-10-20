var LocalityPlayer = function(map, viewContainerEle, options){
  var self = this;
  var _map = map;
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
    var panorama = new google.maps.StreetViewPanorama(_viewContainer, _options);
    _map.setStreetView(panorama);
  };
  self.setPosition = function(position){
    _options.position = position;
  };
  self.play = function(directions, positionChangedFn){
    if(options){
      _options = options;
      
    }
    var panorama = new google.maps.StreetViewPanorama(_viewContainer, _options);
    google.maps.event.addListener(panorama, 'position_changed', function(){
      if(positionChangedFn){
        positionChangedFn(panorama.getPosition());
      }
    });
    _map.setStreetView(panorama);
    for(int i=0; i< directions.legs.length;i++){
      for(int j=0; j<direcitons.legs[i].steps.length; j++){
        for(int k=0; k<directions.legs[i].steps[j].path.length; k++){
          var interval = setInterval(_options.speed, function(){
            panorama.setPosition(directions.legs[i].steps[j].path[k]);
            clearInterval(interval);
          });
        }
      }
    }
  };
}
