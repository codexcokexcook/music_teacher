import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random'

Template.surprise_me.helpers({
  'random_dish': function() {
    var random = Math.random();
    console.log(random);
    var random_dish =  Dishes.find({"random" : {"$lt" : random}});
    if (random_dish == null) {
      random_dish = Dishes.find({"random" : {"$gt" : random}})
    }
    return Random.choice(random_dish);
  }
});
