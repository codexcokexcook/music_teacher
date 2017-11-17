import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


Menu = new Mongo.Collection('menu');

Meteor.methods({
  'menu.insert'(menu_name, user_id, menu_selling_price, min_order, lead_hours,lead_days,dishes_id,image_id) {
    Menu.insert({
      menu_name: menu_name,
      user_id: user_id,
      createdAt: new Date(),
      menu_selling_price: menu_selling_price,
      min_order: min_order,
      lead_hours: lead_hours,
      lead_days: lead_days,
      dishes_id: dishes_id,
      image_id: image_id,
      updatedAt: new Date()
    });
  },
  'menu.update'(menu_id, menu_name, menu_selling_price, min_order, lead_hours,lead_days,dishes_id,image_id) {
    Menu.update(
      {_id: menu_id},
      {$set: {
        menu_name: menu_name,
        menu_selling_price: menu_selling_price,
        min_order: min_order,
        lead_hours: lead_hours,
        lead_days: lead_days,
        dishes_id: dishes_id,
        image_id: image_id,
        updatedAt: new Date()
      }}
    );
  }
});
