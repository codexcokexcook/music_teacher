import {
  Mongo
} from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';


Menu = new Mongo.Collection('menu');

// set permission about Menu
Menu.deny({
  remove() {
    return true;
  }
});

Meteor.methods({
  'menu.insert' (menu_name, user_id, kitchen_id, menu_selling_price, min_order, lead_hours, lead_days, dishes_id, image_id) {
    check(menu_name, String);
    check(user_id, String);
    check(kitchen_id, String);
    check(menu_selling_price, Match.Any);
    check(min_order, Match.Any);
    check(lead_hours, Match.Any);
    check(lead_days, Match.Any);
    check(dishes_id, Match.Any);
    check(image_id, Match.Any);

    Menu.insert({
      menu_name: menu_name,
      user_id: Meteor.userId(),
      kitchen_id: kitchen_id,
      createdAt: new Date(),
      menu_selling_price: menu_selling_price,
      min_order: min_order,
      lead_hours: lead_hours,
      lead_days: lead_days,
      dishes_id: dishes_id,
      image_id: image_id,
      updatedAt: new Date(),
      deleted: false
    });
  },
  'menu.update' (menu_id, menu_name, menu_selling_price, min_order, lead_hours, lead_days, dishes_id, image_id) {
    check(menu_id, String);
    check(menu_name, String);
    check(menu_selling_price, Match.Any);
    check(min_order, Match.Any);
    check(lead_hours, Match.Any);
    check(lead_days, Match.Any);
    check(dishes_id, Match.Any);
    check(image_id, Match.Any);

    Menu.update({
      _id: menu_id
    }, {
      $set: {
        menu_name: menu_name,
        menu_selling_price: menu_selling_price,
        min_order: min_order,
        lead_hours: lead_hours,
        lead_days: lead_days,
        dishes_id: dishes_id,
        image_id: image_id,
        updatedAt: new Date()
      }
    });
  },
  'menu.online' (menu_id, status) {
    check(menu_id, String);
    check(status, Boolean);

    Menu.update({
      _id: menu_id
    }, {
      $set: {
        online_status: status
      }
    });
  }
});

Meteor.methods({
  'menu.checkDish': function(dish_id) {
    check(dish_id, String);

    return (Menu.findOne({
      'dishes_id': dish_id
    })) ? true : false;
  }
});

Meteor.methods({
  'menu.delete': function(menu_id) {
    check(menu_id, String);

    return (Menu.update({
      _id: menu_id
    }, {
      $set: {
        deleted: true
      }
    })) ? true : false;
  }
});

Meteor.methods({
  'checkAlreadyMenu': function() {

    var count = Menu.find({
      'user_id': Meteor.userId(),
      "deleted": false
    }).count();
    if (count > 0) {
      return true;
    }
    return false;
  }
});
