var map;

function initialize() {
  var mapOptions = {
    zoom: 15,

    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      var myLatLng = new google.maps.LatLng(40.740914940834045,-74.178628);

      var infowindow = new google.maps.InfoWindow ({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });
      var marker  = new google.maps.Marker ({
        map: map,
        position: pos,
        title: 'Your Location',
      }); 
      
      var infowindow = new google.maps.InfoWindow ({
        map: map,
        position: myLatLng,
        content: 'This is Grease Trucks!'
      });
      
      var marker = new google.maps.Marker({
      	  map: map,
	      position: myLatLng,
	      title:'grease trucks',
    });    
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  /*var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };*/

  var infowindow = new google.maps.InfoWindow(options);

}

google.maps.event.addDomListener(window, 'load', initialize);