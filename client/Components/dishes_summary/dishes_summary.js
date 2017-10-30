import { Blaze } from 'meteor/blaze'
import { Tracker } from 'meteor/tracker'
import { checkboxes_recall } from '/imports/functions/checkboxes_recall.js'

Template.dishes_summary.onRendered(function(){
  $('.modal').modal();
  $('.tooltipped').tooltip({delay: 500});
});

Template.dishes_summary.events({
  'click #btn_add_dish': function() {
    if (Blaze.getView($("#add_dish_modal")[0])._templateInstance.lastNode.children.length > 1) {
      $(".create_dishes_form_container").remove();
    };
    Blaze.render(Template.create_dishes_form,$("#add_dish_modal")[0]);
  },
  'click #btn_edit_dish': function(event,template) {
    if (Blaze.getView($("#edit_dish_modal")[0])._templateInstance.lastNode.children.length > 1) {
      $(".create_dishes_form_container").remove();
    };
    var selected_dishes = Session.get('selected_dishes_id');

    //Validation of dish selection checkbox
    if (!selected_dishes || selected_dishes.length === 0) {
      Materialize.toast("Please select a dish you'd like to edit", 4000);
      return false;
    } else if (selected_dishes.length > 1 )  {
      Materialize.toast("Ops! You can't choose more than 1 dish to edit, please try again", 4000);
      return false;
    } else {
      var selected_dishes = Session.get('selected_dishes_id');
      var get_dish = Dishes.findOne({_id: selected_dishes[0]});

      // Recall ingredients of the dish to tempoaray collection for display
      Ingredients.find({dish_name: get_dish.dish_name}).forEach(
        function(doc){
          Ingredients_temporary.insert(doc);
        }
      );
      // Bellow parameters will be passed to create_dishes_form template using Blaze.renderWithData
      var get_dish_contents = {
        dish_name: get_dish.dish_name,
        dish_description: get_dish.dish_description,
        serving_option: get_dish.serving_option,
        cooking_time: get_dish.cooking_time,
        dish_cost: get_dish.dish_cost,
        dish_selling_price: get_dish.dish_selling_price,
      };
      Blaze.renderWithData(Template.create_dishes_form, get_dish_contents,$("#edit_dish_modal")[0]);
      checkboxes_recall(get_dish.allergy_tags);
      checkboxes_recall(get_dish.dietary_tags);
      checkboxes_recall(get_dish.cuisines_tags);
      checkboxes_recall(get_dish.proteins_tags);
      checkboxes_recall(get_dish.categories_tags);
      checkboxes_recall(get_dish.cooking_methods_tags);
      checkboxes_recall(get_dish.tastes_tags);
      checkboxes_recall(get_dish.textures_tags);
      checkboxes_recall(get_dish.vegetables_tags);
      checkboxes_recall(get_dish.condiments_tags);
      checkboxes_recall(get_dish.serving_temperature_tags);
    }
  },
  'click #btn_delete_dish': function() {
    var selected_dishes = Session.get('selected_dishes_id');
    if (!selected_dishes) {
      Materialize.toast("Please select a dish you'd like to delete", 4000);
    } else {
      for (i = 0; i < selected_dishes.length; i++) {
        var dish_details = Dishes.findOne({_id: selected_dishes[i]});
        var image_id = Images.findOne({_id: dish_details.image_id});
        var delete_message = dish_details.dish_name + " deleted";
        Meteor.call('dish.remove', selected_dishes[i]);
        Meteor.call('dish_image.remove',image_id);
        Session.keys = {};
        Materialize.toast(delete_message, 3000);
      }
    }
  }
});
