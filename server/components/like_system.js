import {
    Meteor
} from 'meteor/meteor';

Meteor.methods({
    'dish.like' (dishId) {
        Dishes.update( { _id: dishId }, { $push: { like: Meteor.userId() } });
    },
    'dish.unlike' (dishId) {
        Dishes.update( { _id: dishId }, { $pull: { like: Meteor.userId() } });
    },
    'menu.like' (menuId) {
        Menu.update( { _id: menuId }, { $push: { like: Meteor.userId() } });
    },
    'menu.unlike' (menuId) {
        Menu.update( { _id: menuId }, { $pull: { like: Meteor.userId() } });
    },
});