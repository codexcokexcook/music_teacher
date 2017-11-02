import { Meteor } from 'meteor/meteor';

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
  'ingredient.update'(dish_name,user_id,ingredient_name,ingredient_quantity,ingredient_unit){
    Ingredients.insert({
      dish_name: dish_name,
      user_id: user_id,
      ingredient_name: ingredient_name,
      ingredient_quantity: ingredient_quantity,
      ingredient_unit: ingredient_unit,
    });
  },
  'ingredient.remove'(_id) {
    Ingredients.remove({
      _id: _id
    })
  }
});
