var DirectionsManager = function(map, player){
  var self = this;
  var _markers = [];
  var _selectedMarker;
  var _directionSvc = new google.maps.DirectionsService();
  var _directionDisp = new google.maps.DirectionsRenderer();
  var _map = map;
  var _player = player;
  _directionDisp.setMap(_map);
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
        self.getDirections = function(success, error){
                if(_markers.length < 2){
                        console.log("add atleast 2 markers");
                        alert("Add atleast 2 markers");
                        return;
                }
                var wayPoints = [];
                var tempMarkers = _markers.slice();
                var wayPtMarkers = tempMarkers.splice(1,tempMarkers.length-2);
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
                        //serlf.clearMarkers(wayPtMarkers);
                        _directionDisp.setDirections(response);
                        var route = response.routes[0];
                        if(success){
                          success(response.routes[0]);
                        }
                        
                }
                else{
                  if(error){
                    error("Could not get directions");
                  }
                }
                });
        };
        self.clearMarkers = function(){
                for(var i=0; i<_markers.length; i++){
                        _markers[i].setMap(null);
                }
                _markers = [];
        }
}
