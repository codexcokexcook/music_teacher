export function get_current_location() {
    var geocoder = new google.maps.Geocoder(); //Define new geocoder of the map
    if (navigator.geolocation) {
      //obtain current location of user
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // set center and marker position based on current location colleccted
      //  map.instance.setCenter(pos);
      //  this.marker.setPosition(pos);
        geocoder.geocode({'location': pos}, function(results, status){
          if (status === 'OK') {
            if (results[0]) {
              var address = results[0].formatted_address;
              Session.set('address', address);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }, function() {
        handleLocationError(true, infoWindow, map.instance.getCenter());
      });
    } else {
    // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.instance.getCenter());
    }
}
