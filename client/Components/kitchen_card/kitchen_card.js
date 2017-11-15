Template.kitchen_card.helpers({
  'get_kitchen_image': function() {
    var kitchen_image = profile_images.findOne({userId: this.user_id, meta:{purpose: "homecook_banner_picture"}});
    return kitchen_image._id + kitchen_image.extensionWithDot;
  },
  'get_homecook_image': function() {
    var homecook_image = profile_images.findOne({userId: this.user_id, meta:{purpose: "homecook_profile_picture"}});
    return homecook_image._id + homecook_image.extensionWithDot;
  }
})
