import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Template.get_dish_image.onRendered(function() {
  $('#dish_image').width($('#dish_image').parent().width());
});

Template.get_dish_image.helpers ({
  'get_image_extension': function () {
    var extract_dish = Dishes.findOne({"image_id":this.image_id});
    var extract_image_id = extract_dish.image_id;
    var refer_image_id = Images.findOne({"_id":extract_image_id});
    var get_image_extension = refer_image_id && refer_image_id.extensionWithDot;
    return get_image_extension;
  }
});
