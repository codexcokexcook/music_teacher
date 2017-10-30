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
  'dish.update'(dish_id){
    Dishes.update({_id: dish_id},
      {$set: {

      }}
    );
  }
});
