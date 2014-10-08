var Locality = function(mapEle, mapOptions){
        var self = this;
        var _mapEle = mapEle;
        var _options;
        if(mapOptions != undefined && mapOptions != null){
                _options = mapOptions;
        } else {
                _options = {
                        center: { lat: -34.397, lng: 150.644},
                        zoom: 1
                };
        }
        var _map;
        self.initialize = function(){
                if(_mapEle){
                        _map = new google.maps.Map(_mapEle, _options);
                }
        };
        self.addMapEvent = function(eventName, handler){
                google.maps.event.addListener(_map, eventName, handler);
        }
}
/*function initialize(mapEle) {
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8
        };
        var map = new google.maps.Map(mapEle,
            mapOptions);
            var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            title: 'Click to zoom'
        });

        google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
            window.setTimeout(function() {
            map.panTo(marker.getPosition());
            }, 3000);
        });

        google.maps.event.addListener(marker, 'click', function() {
            map.setZoom(8);
            map.setCenter(marker.getPosition());
        });
      }*/
