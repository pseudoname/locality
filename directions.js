var DirectionsManager = function(map){
  var self = this;
  var _markers = [];
  var _selectedMarker;
  var _directionSvc = new google.maps.DirectionsService();
  var _directionDisp = new google.maps.DirectionsRenderer();
  var _map = map;
  var _geocoder = new google.maps.Geocoder();
  var _currentRoute;
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
        self.addMarkerEvent = function(marker, eventName, handler){
                google.maps.event.addListener(marker, eventName, handler);
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
        //gets directions using the markers on the map
        self.getDirections = function(success, error){
                if(_markers.length < 2){
                        console.log("add atleast 2 markers");
                        alert("Add atleast 2 markers");
                        return;
                }
                _directionDisp.setMap(_map);
                var wayPoints = [];
                var tempMarkers = _markers.slice();
                var wayPtMarkers = tempMarkers.splice(1,tempMarkers.length-1);
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
                        var pos = _markers[0].getPosition();
                        self.clearMarkers();
                        //serlf.clearMarkers(wayPtMarkers);
                        _directionDisp.setDirections(response);
                        _currentRoute = response.routes[0];
                        if(success){
                          success({
                            startPosition:pos,
                            route: response.routes[0]
                          });
                        }
                        
                }
                else{
                  if(error){
                    error("Could not get directions");
                  }
                }
                });
        };
        self.getCurrentRoute = function(){
          return _currentRoute;
        };
        //clears all markers from the map
        self.clearMarkers = function(){
                for(var i=0; i<_markers.length; i++){
                        _markers[i].setMap(null);
                        console.log('Clearing marker ' + i);
                }
                _markers = [];
        };
        self.clearDirections = function(){
          _directionDisp.setMap(null);
          _currentRoute = null;
        };
        //hasDirections property
        self.hasDirections = (_markers.length>2)?true:false;
        //centers the map to the given address
        self.codeAddress = function(address, success, error) {
          _geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              _map.setCenter(results[0].geometry.location);
              self.addPathMarker(results[0].geometry.location);
              if(success){
                success({result:results[0]});
              }
            } else {
              if(error){
                error('Geocode was not successful for the following reason: ' + status);
              }
            }
          });
        };
}
