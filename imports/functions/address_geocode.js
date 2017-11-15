export function address_geocode(name, address) {
  //name - is used to store as the Session name
  //address - the address to be geocoded
  // This function converts an address into lattitude and longitude, which will stored
  // in a session with the name given from you

  var geocoder = new google.maps.Geocoder();
  if (address) {
    geocoder.geocode({'address': String(address)}, function(results,status){
      if (status == 'OK') {
        var latlnt = [];
        var latlng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        Session.set(name, latlng);
      } else {
        Materialize.toast('Ops... Looks like the addresses provided are incorrect, please double check!', 4000)
      }
    });
  }
}
