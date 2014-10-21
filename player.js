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
      speed:1000
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
   
    //stepThrough(0,0,0,route);
    stepThroughPath(route, 0);
  };
  function stepThroughPath(route, currentStep){
    if(currentStep >= route.overview_path.length){
      return;
    }
    console.log('Current Step: ' + currentStep);
    _panorama.setPosition(route.overview_path[currentStep]);
    _map.setStreetView(_panorama);
    currentStep++;
  }
  function stepThrough(currentLeg, currentStep, currentPath, route){
    
    
      
        
        if(currentLeg < route.legs.length){
          console.log('Current Leg: ' + currentLeg)
          console.log('Steps in Leg ' + currentLeg + ': ' + route.legs[currentLeg].steps.length);
          if(currentStep < route.legs[currentLeg].steps.length){
            console.log('Current Step: ' + currentStep);
            console.log('Paths in Step ' + currentStep + ': ' + route.legs[currentLeg].steps[currentStep].path.length);
            if(currentPath < route.legs[currentLeg].steps[currentStep].path.length){
              console.log('Current Path: ' + currentPath);
            }
          }
        }
        
                
                var interval = setTimeout(function(){
                  //if(i < route.legs.length){
                    
                    if(currentLeg < route.legs.length && currentStep < route.legs[currentLeg].steps.length && currentPath >= route.legs[currentLeg].steps[currentStep].path.length){
                      currentPath = 0;
                      
                      if(currentLeg < route.legs.length && currentStep >= route.legs[currentLeg].steps.length){
                        currentStep = 0;
                        
                        if(currentLeg >= route.legs.length){
                          return;
                        }
                        else{
                          _panorama.setPosition(route.legs[currentLeg].steps[currentStep].path[currentPath]);
                          _map.setStreetView(_panorama);
                          currentLeg++;
                        }
                      }
                      else{
                        if(currentLeg >= route.legs.length){
                          return;
                        }
                        else{
                          _panorama.setPosition(route.legs[currentLeg].steps[currentStep].path[currentPath]);
                          _map.setStreetView(_panorama);
                          currentLeg++;
                        }
                        currentStep++;
                      }
                    }
                    else{
                      if(currentLeg < route.legs.length && currentStep >= route.legs[currentLeg].steps.length){
                        currentStep = 0;
                        
                        if(currentLeg >= route.legs.length){
                          return;
                        }
                        else{
                          _panorama.setPosition(route.legs[currentLeg].steps[currentStep].path[currentPath]);
                          _map.setStreetView(_panorama);
                          currentLeg++;
                        }
                      }
                      else{
                        if(currentLeg >= route.legs.length){
                          return;
                        }
                        else{
                          _panorama.setPosition(route.legs[currentLeg].steps[currentStep].path[currentPath]);
                          _map.setStreetView(_panorama);
                          currentLeg++;
                        }
                        currentStep++;
                      }
                      //_panorama.setPosition(route.legs[currentLeg].steps[currentStep].path[currentPath]);
                      //_map.setStreetView(_panorama);
                      currentPath++;
                    }
                    
                    
                    stepThrough(currentLeg, currentStep, currentPath, route);
                  //}
                  //clearTimeout(interval);
                },_options.speed);
              
            
          
        
      
    
  }
}
