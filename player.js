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
        pitch: 10
      }
    };
  }
  self.setViewContainer = function(ele){
    _viewContainer = ele;
  };
  self.loadStreetView = function(){
    var panorama = new google.maps.StreetViewPanorama(_viewContainer, panoramaOptions);
    _map.setStreetView(panorama);
  };
  self.setPosition = function(position){
    _options.position = position;
  }
}
