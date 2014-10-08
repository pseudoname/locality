var LocalityPlayer = function(map, options){
  var self = this;
  var _map = map;
  var _options = options || {};
  if(!_options.position){
    _options = {
      position: _map.getCenter(),
      pov: {
        heading: 34,
        pitch: 10
      }
    };
  }
  self.loadStreetView = function(){
    var panorama = new google.maps.StreetViewPanorama(_map.getDiv(), panoramaOptions);
    _map.setStreetView(panorama);
  }
}
