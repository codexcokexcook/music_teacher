import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'dish.remove'(dish_id) {
    Dishes.remove({_id:dish_id});
  },
  'dish_image.remove'(image_id) {
    Images.remove({_id:image_id});
  },
  'dish.update'(dish_id,image_id, user_id, kitchen_id, dish_name, dish_description, serving_option, cooking_time, dish_cost, dish_selling_price, dish_profit, allergy_tags, dietary_tags, cuisines_tags, proteins_tags, categories_tags, cooking_methods_tags, tastes_tags, textures_tags, vegetables_tags, condiments_tags, serving_temperature_tags) {
    Dishes.update(
      {_id: dish_id},
      {$set: {
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
      }}
    );
  },
  'dish.online'(dish_id, status) {
    Dishes.update({_id: dish_id},{$set:{online_status: status}});
  }
});
