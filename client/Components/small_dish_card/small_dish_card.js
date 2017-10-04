import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Template.small_dish_card.helpers({
    // dishes are currently displayed based on everything
    //  in the database, which is not correct. It has to be improved
    //  by retreiving dish based on search result with top 6 results
    'dishes_item': function () {
        return Dishes.find();
    },

  'get_image_extension': function () {
    var extract_dish = Dishes.findOne({"image_id":this.image_id});
    var extract_image_id = extract_dish.image_id;
    var refer_image_id = Images.findOne({"_id":extract_image_id});
    var get_image_extension = refer_image_id && refer_image_id.extensionWithDot;
    return get_image_extension;
  }
});
