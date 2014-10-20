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
      speed:200
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
    _panorama.setPosition(position);
  };
  self.play = function(route, positionChangedFn){
    
    google.maps.event.clearInstanceListeners(_panorama);
    google.maps.event.addListener(_panorama, 'position_changed', function(){
      if(positionChangedFn){
        positionChangedFn(_panorama.getPosition());
      }
    });
    //_map.setStreetView(_panorama);
    console.log(route.legs.length);
    if(route.legs){
      for(var i=0;i<route.legs.length;i++){
        console.log('Leg: ' + i)
        if(route.legs[i] && route.legs[i].steps){
          for(var j=0;j<route.legs[i].steps.length;j++){
            console.log('Step: ' + j);
            if(route.legs[i].steps[j] && route.legs[i].steps[j].path){
              for(var k=0;k<route.legs[i].steps[j].path.length; k++){
                console.log('Path: ' + k);
                
                var interval = setInterval(function(){
                  if(i < route.legs.length){
                    _panorama.setPosition(route.legs[i].steps[j].path[k]);
                    _map.setStreetView(_panorama);
                  }
                  clearInterval(interval);
                },_options.speed);
              }
            }
          }
        }
      }
    }
  };
  
}
