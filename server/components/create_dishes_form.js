import { Meteor } from 'meteor/meteor';

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

Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});

Meteor.methods({

  'shopping_cart.insert'(
    foodie_id,
    homecook_id,
    foodie_name,
    homecook_name,
    dish_id,
    dish_name,
    quantity,
    dish_price,
  ){
  Shopping_cart.insert({
    buyer_id: foodie_id,
    seller_id: homecook_id,
    buyer_name: foodie_name,
    seller_name: homecook_name,
    product_id: dish_id,
    product_name: dish_name,
    quantity: quantity,
    product_price: dish_price,

    createdAt: new Date()
  })
},

  'shopping_cart.update'(
      order_id,
      quantity
    ){
    Shopping_cart.update(
      {_id: order_id},
      {$set: {
      quantity: quantity,

      createdAt: new Date()
    }});
  }

}

  )
