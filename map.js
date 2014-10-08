var Locality = function(mapEle, mapOptions){
        var self = this;
        var _mapEle = mapEle;
        var _options;
        var _markers = [];
        var _selectedMarker;
        var _map;
        var _directionSvc = new google.maps.DirectionsService();
        var _directionDisp = new google.maps.DirectionsRenderer();
        
        if(mapOptions != undefined && mapOptions != null){
                _options = mapOptions;
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
                _directionDisp.setMap(_map);
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
        self.addPathMarker = function(latlong){
                for(var i=0; i<_markers.length; i++){
                        if(_markers[i].getPosition() == latlong){
                                return;
                        }
                }
                var marker = new google.maps.Marker({
                   position:latlong,
                   draggable:true,
                   id:(_markers.length > 0)?_markers.length:0,
                   map: _map
                });
                _markers.push(marker);
                _selectedMarker = marker;
                self.addMarkerEvent(marker, 'click', function(){
                        _selectedMarker = this;
                });
                self.addMarkerEvent(marker, 'rightclick', function(event){
                        _selectedMarker = this;
                        self.removeSelectedPathMarker();
                });
        };
        self.removeSelectedPathMarker = function(){
                _selectedMarker.setMap(null);
                for(var i=0; i<_markers.length;i++){
                        if(_markers[i].id == _selectedMarker.id){
                                _selectedMarker = _markers[i-1];
                                _markers.splice(i,1);
                                break;
                        }
                }
        };
        self.getDirections = function(){
                if(_markers.length < 2){
                        console.log("add atleast 2 markers");
                        alert("Add atleast 2 markers");
                        return;
                }
                var wayPoints = [];
                var wayPtMarkers = _markers.splice(1,_markers.length-2);
                for(var i=0; i< wayPtMarkers.length;i++){
                        wayPoints.push({location:wayPtMarkers[i].getPosition()});
                }
                var request = {
                        origin: _markers[0].getPosition(),
                        destination: (_markers.length == 2)?_markers[_markers.length-1].getPosition():_markers[0].getPosition(),
                        waypoints: wayPoints,
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode.DRIVING
                };
                _directionSvc.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                        self.clearMarkers();
                        _directionDisp.setDirections(response);
                        var route = response.routes[0];
                        
                }
                });
        };
        self.clearMarkers = function(){
                for(var i=0, i<_markers.length; i++){
                        _markers[i].setMap(null);
                }
                _markers = [];
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
