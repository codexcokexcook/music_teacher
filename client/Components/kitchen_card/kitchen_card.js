import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.kitchen_card.helpers({
  'get_kitchen_image': function() {
    var kitchen_image = profile_images.findOne({
      userId: this.user_id,
      'meta.purpose': "homecook_banner_picture"
    });
    if (kitchen_image) {
      return kitchen_image.meta.base64;
    }
  },
  'get_homecook_image': function() {
    var homecook_image = profile_images.findOne({
      userId: this.user_id, 'meta.purpose': "homecook_profile_picture"
    });
    if (homecook_image) {
      return homecook_image.meta.base64;
    }
  }
});

Template.kitchen_card.events({
  'click .kitchen_card': function() {
    var route = '/kitchen/' + this.user_id;
    FlowRouter.go(window.open(route,'_blank'));
  }
})
