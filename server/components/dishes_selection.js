import {
  Mongo
} from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import {
  Match
} from 'meteor/check'

Meteor.methods({
  'dish.remove' (dish_id) {
    // check format
    check(dish_id, String);
    Dishes.update({
      _id: dish_id
    }, {
      $set: {
        deleted: true
      }
    });
  },
  'dish_image.remove' (image_id) {
    // check format
    check(image_id, String);
    Images.remove({
      _id: image_id
    });
  },
  'dish.update' (dish_id, image_id, user_id, kitchen_id, dish_name, dish_description, serving_option, cooking_time, dish_cost, dish_selling_price, dish_profit, allergy_tags, dietary_tags, cuisines_tags, proteins_tags, categories_tags, cooking_methods_tags, tastes_tags, textures_tags, vegetables_tags, condiments_tags, serving_temperature_tags) {
    check(dish_id, String);
    check(image_id, String);
    check(user_id, String);
    check(kitchen_id, String);
    check(dish_name, String);
    check(dish_description, String);
    check(serving_option, Match.any);
    check(cooking_time, String);
    check(dish_cost, String);
    check(dish_selling_price, String);
    check(dish_profit, Number);
    check(allergy_tags, Match.any);
    check(dietary_tags, Match.any);
    check(cuisines_tags, Match.any);
    check(proteins_tags, Match.any);
    check(categories_tags, Match.any);
    check(cooking_methods_tags, Match.any);
    check(tastes_tags, Match.any);
    check(textures_tags, Match.any);
    check(vegetables_tags, Match.any);
    check(condiments_tags, Match.any);
    check(serving_temperature_tags, Match.any);

    Dishes.update({
      _id: dish_id
    }, {
      $set: {
        image_id: image_id,
        user_id: user_id,
        kitchen_id: kitchen_id,
        dish_name: dish_name,
        dish_description: dish_description,
        serving_option: serving_option,
        cooking_time: cooking_time,
        dish_cost: dish_cost,
        dish_selling_price: dish_selling_price,
        dish_profit: dish_profit,
        allergy_tags: allergy_tags,
        dietary_tags: dietary_tags,
        cuisines_tags: cuisines_tags,
        proteins_tags: proteins_tags,
        categories_tags: categories_tags,
        cooking_methods_tags: cooking_methods_tags,
        tastes_tags: tastes_tags,
        textures_tags: textures_tags,
        vegetables_tags: vegetables_tags,
        condiments_tags: condiments_tags,
        serving_temperature_tags: serving_temperature_tags,
        updatedAt: new Date()
      }
    });
  },
  'dish.online' (dish_id, status) {
    // check format data before excute action
    check(dish_id, String);
    check(status, Boolean);
    Dishes.update({
      _id: dish_id
    }, {
      $set: {
        online_status: status
      }
    });
  }
});
