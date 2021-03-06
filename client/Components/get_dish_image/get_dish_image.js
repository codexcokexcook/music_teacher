import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Template.get_dish_image.onRendered(function() {
  $('#dish_image').width($('#dish_image').parent().width());
});

Template.get_dish_image.helpers ({
  'get_image': function () {

    var extract_dish = Dishes.findOne({"image_id":this.image_id});
    var extract_image_id = extract_dish.image_id;
    var refer_image_id = Images.findOne({"_id":extract_image_id});
    return refer_image_id.meta.base64;
    
    //- return metadata of image size
    //- fetch image by user_id
    
    // var meta = Dishes
    // .findOne({
    //   user_id: Meteor.userId(),
    // });
    // var meta = Dishes
    // .find({
    //   user_id: Meteor.userId()
    // }).fetch();
    // console.log('metadata: ', meta[0]);


  }
});
