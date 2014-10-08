var Locality = function(mapEle, mapOptions){
        var self = this;
        var _mapEle = mapEle;
        var _options;
        var _markers = [];
        var _selectedMarker;
        
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
        var _map;
        self.initialize = function(){
                 _map = new google.maps.Map(_mapEle, _options);
                
        };
        self.addMapEvent = function(eventName, handler){
                google.maps.event.addListener(_map, eventName, handler);
        };
        self.addMarkerEvent = function(marker, eventName, handler){
                google.maps.event.addListener(marker, eventName, handler);
        }
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
                addMarkerEvent(marker, 'click', function(){
                        _selectedMarker = this;
                        addMarkerEvent(this, 'rightclick', function(event){
                                var key = event.keyCode || event.charCode;
                                if(key == 46 )
                                        self.removeSelectedPathMarker();
                        });
                });
                
        };
        self.removeSelectedPathMarker = function(){
                _selectedMarker.setMap(null);
                for(var i=0; i<_markers.length;i++){
                        if(_markers[i].id == _selectedMarker.id){
                                _markers.splice(i,1);
                                break;
                        }
                }
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
