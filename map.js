var Locality = function(mapEle, mapOptions){
        var self = this;
        var _mapEle = mapEle;
        var _options;
        var _map;
        var _directions;
        
        
        if(mapOptions != undefined && mapOptions != null){
                _options = mapOptions;
                _options.minZoom = 16;
                _options.maxZoom = 19;
        } else {
                _options = {
                        center: { lat: 42.345573, lng: -71.098326},
                        zoom: 16,
                        minZoom:16,
                        maxZoom:19
                };
        }
        
        self.initialize = function(){
                _map = new google.maps.Map(_mapEle, _options);
                _directions = new DirectionsManager(_map);
        };
        self.addMapEvent = function(eventName, handler){
                google.maps.event.addListener(_map, eventName, handler);
        };
        self.addMarkerEvent = function(marker, eventName, handler){
                google.maps.event.addListener(marker, eventName, handler);
        };
        self.addDomEvent = function(element, eventName, handler){
          google.maps.event.addDomListener(element, eventName, handler);      
        };
        /**************** Properties **********************/
        this.directions = _directions;
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
