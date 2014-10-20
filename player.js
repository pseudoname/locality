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
    stepThrough(0,0,0,route);
  };
  function stepThrough(currentLeg, currentStep, currentPath, route){
    console.log(route.legs.length);
    if(route.legs && currentLeg < route.legs.length){
      
        console.log('Leg: ' + currentLeg)
        if(route.legs[currentLeg] && route.legs[currentLeg].steps && currentStep < route.legs[currentLeg].steps.length){
          
            console.log('Step: ' + currentStep);
            if(route.legs[currentLeg].steps[currentStep] && route.legs[currentLeg].steps[currentStep].path && currentPath < route.legs[currentLeg].steps[currentStep].path.length){
             
                console.log('Path: ' + currentPath);
                
                var interval = setTimeout(function(){
                  //if(i < route.legs.length){
                    _panorama.setPosition(route.legs[currentLeg].steps[currentStep].path[currentPath]);
                    _map.setStreetView(_panorama);
                    if(++currentPath >= route.legs[currentLeg].steps[currentStep].path.length){
                      currentPath = 0;
                      currentStep++;
                      if(currentStep >= route.legs[currentLeg].steps.length){
                        currentStep = 0;
                        currentLeg++;
                        if(currentLeg >= route.legs.length){
                          return;
                        }
                        else{
                          currentLeg++;
                        }
                      }
                      else{
                        currentStep++;
                      }
                    }
                    else{
                      currentPath++;
                    }
                    
                    
                    stepThrough(currentLeg, currentStep, currentPath, route);
                  //}
                  //clearTimeout(interval);
                },_options.speed);
              
            }
          
        }
      
    }
  }
}
