import { Blaze } from 'meteor/blaze';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { navbar_find_by } from '/imports/functions/find_by.js'

Template.mapping.helpers({
  'map_options': function() {
  // initial setting of when google map is loaded, set center and zoom range
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(22.3964, 114.1095),
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      };
    }
  }
});

Template.location_search_card.helpers({
  'address':function() {
    var address = Session.get('address');
    if (typeof address === "undefined") {
      return "Search your location here";
    } else {
      return address;
    }
  }
});

Template.location_search_card.events({
  'keypress .input-field': function (event) {
    // collect address from search panel and pass to geocoder using Session
    if (event.which === 13) {
      var address = document.getElementById('location_search_input').value;
      Session.set('address', address);
      try {
        Blaze.remove(Template.instance().view);
      }
      catch (err) {
        return false;
      }
    }
  }
});

Template.mapcard.onRendered(function(){
  Blaze.render(Template.mapping, $('#location_search_card')[0]);
  // using blaze to render the template everytime preventing google map
  // having partial grey area when rerendered
});

Template.mapping.onRendered(function(){
  GoogleMaps.ready('Map_location', function(map) {
  // Define markers properties when google map is created. pointer didn't specify
  // as we will obtain current location later on
  marker = new google.maps.Marker({
    draggable: true,
    animation: google.maps.Animation.DROP,
    map: map.instance,
    zoom: 15
  });

  // Reactive markers on google map to reflect search results

  kitchen_marker = []; //define a global marker array to administrate pin locations of kitchens on google map

  Tracker.autorun(function() {
    var kitchen_details = navbar_find_by("Kitchen_details").fetch();
    console.log(kitchen_marker);
    if (kitchen_marker.length > 0) {
      console.log('yes');
      for (i=0; i< kitchen_marker.length; i++) {
        kitchen_marker[i].setMap(null);
      }
      kitchen_marker = [];
    } else {
      console.log('no');
    }
    console.log(kitchen_details.length);
    for (i=0; i < kitchen_details.length; i++) {
      kitchen_marker[i] = new google.maps.Marker({
        position: kitchen_details[i].kitchen_address_conversion,
        animation: google.maps.Animation.DROP,
        title: String(kitchen_details[i].kitchen_name),
        kitchen_id: kitchen_details[i]._id
      })
      kitchen_marker[i].setMap(map.instance);
      console.log(kitchen_marker[i]);
      console.log(kitchen_marker[i].kitchen_id);
    }
  });


  var geocoder = new google.maps.Geocoder(); //Define new geocoder of the map
  if (navigator.geolocation) {
    //obtain current location of user
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // set center and marker position based on current location colleccted
      map.instance.setCenter(pos);
      this.marker.setPosition(pos);
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
  // Add event listener to get marker info after drag finish, using "event.latlng"
  google.maps.event.addListener(this.marker, 'dragend', function(event) {
    marker_position = event.latLng;
    // User geocoder to reverse geocoding to obtain aaddress, with error checking
    geocoder.geocode({'location': marker_position}, function(results, status){
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
  });
});
  // Set autorun of the code after template is created
  // get address from Session above to look for the location using geo code
  // set map center and marker on position found
  var self = this;
  GoogleMaps.ready('Map_location', function(map) {
      var geocoder = new google.maps.Geocoder();
    self.autorun(function(){
      geocoder.geocode({'address': Session.get('address')}, function(results,status) {
        if(status == 'OK') {
          map.instance.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
        }
      });
    });
  });

//Multiple marker function on click, with drag function, a good refernce
/*  GoogleMaps.ready('Map_location', function(map) {
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
  }); */
});
