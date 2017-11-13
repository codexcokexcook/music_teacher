import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';

Template.show_room_dish.helpers ({


  'find_dishes_by': function(){

    var location = Session.get('location');
    var method = Session.get('method');
    var date = Session.get('date');
    var time = Session.get('time');
    var check_location = 0
    var check_method = 0
    var check_date = 0
    var check_time = 0
    var check = 0

    var result = Dishes.find({user_id:{$ne: Meteor.userId()}});

    if(location){
      check_location = 1
    }else{
      check_location = 0
    }

    if(method){
      check_method = 1
    }else{
      check_method = 0
    }
    if(date){
      check_date = 1
    }else{
      check_date = 0
    }
    if(time){
      check_time = 1
    }else{
      check_time = 0
    }

    check = check_location*8 + check_method*4 + check_date*2 + check_time

    while (check === 0){return result}
    while (check === 1){return result}
    while (check === 2){return result}
    while (check === 3){return result}
    while (check === 4){return Dishes.find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})}
    while (check === 5){return Dishes.find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})}
    while (check === 6){return Dishes.find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})}
    while (check === 7){return Dishes.find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})}
    while (check === 8){return result}
    while (check === 9){return result}
    while (check === 10){return result}
    while (check === 11){return result}
    while (check === 12){return result}
    while (check === 13){return result}
    while (check === 14){return result}
    while (check === 15){return result}

}
})
