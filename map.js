var Locality = function(mapEle, previewEle, mapOptions){
        var self = this;
        var _mapEle = mapEle;
        var _options;
        var _map;
        var _directions;
        var _streetView;
        var _previewEle = previewEle;
        
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
                _streetView = new LocalityPlayer(_map);
                _streetView.setViewContainer(_previewEle);
                _streetView.setPosition(_map.getCenter());
                _directions = new DirectionsManager(_map, _streetView);
                _streetView.loadStreetView();
                self.directions = _directions;
                self.streetView = _streetView;
                
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
        self.directions = _directions;
        self.streetView = _streetView;
}
