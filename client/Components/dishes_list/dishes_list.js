import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Template.dishes_list.onRendered(function(){
  this.$('.modal').modal();
  this.$('ul.tabs').tabs();
})

Template.dishes_list.helpers ({
  // dishes are currently displayed based on everything
  //  in the database, which is not correct. It has to be improved
  //  by retreiving dish based on search result with top 6 results
  'dishes_item': function () {
      return Dishes.find();
  }
});

Template.dishes_card.helpers ({
  'dish_details': function () {
    var returned_dish_id = Session.get('dish_id');
    var get_dish_details = Dishes.findOne({"_id":returned_dish_id});
    return get_dish_details;
  }
});

Template.info_tabs.onRendered(function(){
  this.$('ul.tabs').tabs();
});


Template.dishes_rotation.onRendered(function(){
  var first_dish_display = Dishes.findOne({});
  var first_dish_id = first_dish_display._id;
  Session.set('dish_id',first_dish_id);
});

Template.dishes_rotation.events({
  'click .dish_thumbnail': function () {
    var dish_id = this._id;
    Session.set('dish_id', dish_id);
  }
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

Template.ingredients_loop.helpers ({
  'get_ingredients': function () {
    var extract_dish = Dishes.findOne({"dish_name":this.dish_name});
    var extract_dish_name = extract_dish.dish_name;
    return Ingredients.find({"dish_name":extract_dish_name});
  }
});

Template.service_info.onRendered(function(){
var serving_option = this.serving_option;
/**  if this.serving_option.value = "Delivery" {
    document.getSVGDocument().getElementById("pick_up_option").style.color=rgba(0,0,0,0.18);
  } **/
});
