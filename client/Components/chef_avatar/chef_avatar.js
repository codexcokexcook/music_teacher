Template.chef_avatar.helpers({
  'chef_avatar': function () {
    var returned_dish_id = Session.get('dish_id');
    var get_dish_details = Dishes.findOne({"_id":returned_dish_id});
    var get_dish_creator = get_dish_details && get_dish_details.user_id;
    var get_profile_images = profile_images.findOne({'userId': get_dish_creator, 'meta':{"purpose": 'homecook_profile_picture'}});
    return get_profile_images.meta.base64;
  }
});
