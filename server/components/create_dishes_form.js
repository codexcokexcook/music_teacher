import {
  Meteor
} from 'meteor/meteor';
import {
  Match
} from 'meteor/check';
import {
  check
} from 'meteor/check';

Shopping_cart = new Mongo.Collection('shopping_cart');
Dishes = new Mongo.Collection('dishes');
Ingredients = new Mongo.Collection('ingredients');
Images = new FilesCollection({
  storagePath: () => {
    return process.env.PWD + '/public/dishes_upload/';
  },
  collectionName: 'Images',
  allowClientCode: false,
  onBeforeUpload(file) {

    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

// set permission for Dishes collection
Dishes.deny({
  remove() {
    return true;
  }
});

// set permission for Dishes collection
Images.deny({
  remove() {
    return true;
  }
});

Meteor.publish('files.images.all', function() {
  return Images.find().cursor;
});

Meteor.methods({
  'shopping_cart.insert' (
    foodie_id,
    homecook_id,
    foodie_name,
    homecook_name,
    address,
    serving_option,
    ready_time,
    dish_id,
    dish_name,
    quantity,
    dish_price,
  ) {
    check(foodie_id, String);
    check(homecook_id, String);
    check(foodie_name, String);
    check(homecook_name, String);
    check(address, String);
    check(serving_option, Match.any);
    check(ready_time, String);
    check(dish_id, String);
    check(dish_name, String);
    check(quantity, Number);
    check(dish_price, String);

    Shopping_cart.insert({
      buyer_id: foodie_id,
      seller_id: homecook_id,
      buyer_name: foodie_name,
      seller_name: homecook_name,
      address: address,
      serving_option: serving_option,
      ready_time: ready_time,
      product_id: dish_id,
      product_name: dish_name,
      quantity: quantity,
      product_price: dish_price,
      total_price_per_dish: dish_price,
      updatedAt: new Date(),
      createdAt: new Date()
    })
  },

  'shopping_cart.update' (
    order_id,
    quantity,
    total_price_per_dish
  ) {

    check(order_id, String);
    check(quantity, Number);
    check(total_price_per_dish, Match.any);

    Shopping_cart.update({
      _id: order_id
    }, {
      $set: {
        quantity: quantity,
        total_price_per_dish: total_price_per_dish,
        updatedAt: new Date()

      }
    });
  },

  'shopping_cart.remove' (
    cart_id
  ) {

    check(cart_id, String);

    Shopping_cart.remove({
      _id: cart_id
    })
  },

  'shopping_cart.update_serving' (
    buyer_id,
    seller_id,
    address,
    serving_option
  ) {

    check(buyer_id, String);
    check(seller_id, String);
    check(address, String);
    check(serving_option, Match.any);

    Shopping_cart.update({
      buyer_id: buyer_id,
      seller_id: seller_id
    }, {
      $set: {
        address: address,
        serving_option: serving_option,
        updatedAt: new Date()
      }
    }, {
      multi: true
    });
  },


  'ingredient.update' (dish_name, user_id, ingredient_name, ingredient_quantity, ingredient_unit) {
    check(dish_name, String);
    check(user_id, String);
    check(ingredient_quantity, Match.any);
    check(ingredient_unit, Match.any);

    Ingredients.insert({
      dish_name: dish_name,
      user_id: user_id,
      ingredient_name: ingredient_name,
      ingredient_quantity: ingredient_quantity,
      ingredient_unit: ingredient_unit,
    });
  },
  'ingredient.remove' (_id) {
    check(_id, String);
    Ingredients.remove({
      _id: _id
    })
  }
});
