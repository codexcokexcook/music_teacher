Markers = new Mongo.Collection('markers');

Template.mapping.helpers({
  location: [
    {name: 'Home', id: 'home', address: '92 Bauhinia Road, Fairview Park'},
    {name: 'Office', id: 'office', address: 'Room 803, 8/F, Lai Cheong Factory Building, 479 Castle Peak Road, Lai Chi Kok, Kowloon, Hong Kong'},
    {name: 'Map', id:'map', address:'Tung Fat Building, Yuen Long'},
  ],

  'exampleMapOptions': function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(22.286394, 114.149139),
        zoom: 11
      };
    }
  }
});

Template.location_search_card.events({
  'click .material-icons': function () {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('location_search_input').value;

    GoogleMaps.ready('exampleMap', function(map) {
      geocoder.geocode({'address': address}, function(results,status) {
        if(status == 'OK') {
          alert('OK!');
          map.instance.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map.instance,
            position: results[0].geometry.location,
            zoom: 5
          });
        } else {
          alert('not working');
        }
      });
    });
  }
});

Template.mapping.onRendered(function(){
  GoogleMaps.load({key: 'AIzaSyBxRWAwnS9h8pP1mF6sAa4ZnkqGYUPBGac' });
  // We can use the `ready` callback to interact with the map API once the map is ready.
});

Template.mapping.onCreated(function(){
  GoogleMaps.ready('exampleMap', function(map) {
    google.maps.event.addListener(map.instance, 'click', function(event) {
        Markers.insert({lat:event.latLng.lat(),lng:event.latLng.lng() });
        console.log(Markers.find());
    });
    var markers = {};

    Markers.find().observe({
      added: function(document) {
        // Create a marker for this document
        var marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: map.instance,
          // We store the document _id on the marker in order
          // to update the document within the 'dragend' event below.
          id: document._id
        });

        // This listener lets us drag markers on the map and update their corresponding document.
        google.maps.event.addListener(marker, 'dragend', function(event) {
          Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
        });

        // Store this marker instance within the markers object.
        markers[document._id] = marker;
      },
      changed: function(newDocument, oldDocument) {
        markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
      },
      removed: function(oldDocument) {
        // Remove the marker from the map
        markers[oldDocument._id].setMap(null);

        // Clear the event listener
        google.maps.event.clearInstanceListeners(
          markers[oldDocument._id]);

        // Remove the reference to this marker instance
        delete markers[oldDocument._id];
      }
    });
  });
});
