Meteor.methods({
  'markers.insert'(user_id, kitchen_id, lat, lng) {
    Markers.insert({
      user_id: user_id,
      kitchen_id: kitchen_id,
      lat: lat,
      lng: lng,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  'markers.update'(user_id, kitchen_id, lat, lng) {
    Markers.update({
      user_id: user_id
    },{$set: {
      kitchen_id: kitchen_id,
      lat: lat,
      lng: lng,
      updatedAt: new Date()
    }});
  }
});
