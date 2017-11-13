import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { FilesCollection } from 'meteor/ostrio:files';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.dishes_list.onRendered(function(){
  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        $('ul.tabs').tabs();
      },
      complete: function() {} // Callback for Modal close
    }
  );

})

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


Template.dishes_thumbnails.onRendered(function(){
  var first_dish_display = Dishes.findOne({});
  var first_dish_id = first_dish_display._id;
  Session.set('dish_id',first_dish_id);
});

Template.dishes_thumbnails.events({
  'click .dish_thumbnail': function () {
    var dish_id = this._id;
    Session.set('dish_id', dish_id);
    $('ul.tabs').tabs();
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

//Action for template dishes_card_layout (Ordering)

Template.dishes_card_layout.events({
  'click #chef_avatar': function() {
    var route = '/' + this.user_id + '/';
    FlowRouter.go(window.open(route,'_blank'));
  },
  'click #place_order': function () {
    var dish_details = Dishes.findOne({"_id":this._id});
    var foodie_details = Profile_details.findOne({"user_id": Meteor.userId()});
    var foodie_id = Meteor.userId();
    var homecook_id = dish_details.user_id;
    var homecook_details = Kitchen_details.findOne({"user_id": homecook_id});
    var foodie_name = foodie_details.foodie_name;
    var homecook_name =  homecook_details.chef_name;
    var dish_id = dish_details._id;
    var dish_price = dish_details.dish_selling_price;
    var dish_name = dish_details.dish_name;
    var quantity = 1;

    //check if the dish has been put in shopping check_shopping_cart
    var order = Shopping_cart.findOne({"product_id":this._id});
    if (order)
    {
      var order_id = order._id;
      quantity = parseInt(order.quantity) + 1;
      Meteor.call('shopping_cart.update',
      order_id,
      quantity
    )
    }
    else{
      Meteor.call('shopping_cart.insert',
      foodie_id,
      homecook_id,
      foodie_name,
      homecook_name,
      dish_id,
      dish_name,
      quantity,
      dish_price,
      );
    }

    }
});
