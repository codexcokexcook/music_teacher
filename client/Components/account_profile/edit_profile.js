import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import {checkboxes_recall} from '/imports/functions/checkboxes_recall.js'
import './edit_profile.html';



Template.edit_foodie_profile.helpers ({
  'get_foodie_profile': function(){
    return Profile_details.findOne({'user_id': Meteor.userId()});
  },

  'check_gender': function(){
    var gender = this.gender
    if (gender === "male"){
      return true
    }

  }

})

Template.edit_foodie_profile.onRendered(function(){

  var get_profile = Profile_details.findOne({'user_id': Meteor.userId()});

  //activate dropdown
  this.$('select').material_select();

  //activate characterCounter
  this.$('input#input_text, textarea#about_myself').characterCounter();

  //activate the selection tabs
  this.$(document).ready(function(){
    $('ul.tabs').tabs();
  });

  //activate checkboxes_recall
  checkboxes_recall(get_profile.allergy_tags)
  checkboxes_recall(get_profile.dietary_tags)
});


Template.edit_foodie_profile.events({
  'submit form': function(event, template){
    event.preventDefault();

    const profile_id = Profile_details.findOne({'user_id': Meteor.userId()})._id;
    const foodie_name = trimInput(event.target.foodie_name.value);
    const mobile = trimInput(event.target.mobile.value);
    const profile_keywords = trimInput(event.target.profile_keywords.value);
    const date_of_birth = trimInput(event.target.date_of_birth.value);
    const gender = event.target.gender.value
    const about_myself = trimInput(event.target.about_myself.value);
    const home_address = trimInput(event.target.home_address.value);
    const office_address = trimInput(event.target.office_address.value);
    const allergy_tags = Session.get('allergy_tags');
    const dietary_tags = Session.get('dietary_tags');
    const card_number = trimInput(event.target.card_number.value);
    const card_fullname = trimInput(event.target.card_fullname.value);
    const card_exp_month = trimInput(event.target.card_exp_month.value);
    const card_exp_year = trimInput(event.target.card_exp_year.value);
    const cvv_code = trimInput(event.target.cvv_code.value);


/**      if( isNotEmpty(kitchen_name)           &&
          isNotEmpty(profile_keywords)       &&
          isNotEmpty(last_name)              &&
          isNotEmpty(first_name)             &&
          isNotEmpty(date_of_birth)          &&
          isNotEmpty(gender)                 &&
          isNotEmpty(about_myself)           &&
          isNotEmpty(address_name_1)         &&
          isNotEmpty(address_details_1)      &&
          isNotEmpty(mobile_no_1)            &&
          isNotEmpty(address_name_2)         &&
          isNotEmpty(address_details_2)      &&
          isNotEmpty(mobile_no_2)            &&
          isNotEmpty(card_number)            &&
          isNotEmpty(card_fullname)          &&
          isNotEmpty(card_exp_month)         &&
          isNotEmpty(card_exp_year)          &&
          isNotEmpty(cvv_code)               &&
          isNotEmpty(bank_fullname)          &&
          isNotEmpty(bank_name)              &&
          isNotEmpty(bank_account_no)           )**/

          {

            Meteor.call('profile_details.update',
            profile_id,
            foodie_name,
            mobile,
            profile_keywords,
            date_of_birth,
            gender,
            about_myself,
            allergy_tags,
            dietary_tags,
            home_address,
            office_address,
            card_number,
            card_fullname,
            card_exp_month,
            card_exp_year,
            cvv_code
            );


    //divert to the profile page
    Blaze.render(Template.foodie_profile_card, document.getElementById('profile'));
    Blaze.remove(Template.instance().view);

      }
    /**  else{

      return false;
    } **/
  }
  });

  //Kitchen Database
    Template.edit_homecook_profile.events({
      'submit form': function(event, template){
        event.preventDefault();

        const profile_id = Kitchen_details.findOne({'user_id': Meteor.userId()})._id
        const kitchen_name = trimInput(event.target.kitchen_name.value);
        const chef_name = trimInput(event.target.chef_name.value);
        const homecook_profile_keywords = trimInput(event.target.homecook_profile_keywords.value);
        const kitchen_address = trimInput(event.target.kitchen_address.value);
        const about_homecook_myself = trimInput(event.target.about_homecook_myself.value);
        const bank_fullname = trimInput(event.target.bank_fullname.value);
        const bank_account_no = trimInput(event.target.bank_account_no.value);
        const bank_name = trimInput(event.target.bank_name.value);
        const user_id = Meteor.userId()

    /**      if( isNotEmpty(kitchen_name)           &&
              isNotEmpty(profile_keywords)       &&
              isNotEmpty(last_name)              &&
              isNotEmpty(first_name)             &&
              isNotEmpty(date_of_birth)          &&
              isNotEmpty(gender)                 &&
              isNotEmpty(about_myself)           &&
              isNotEmpty(address_name_1)         &&
              isNotEmpty(address_details_1)      &&
              isNotEmpty(mobile_no_1)            &&
              isNotEmpty(address_name_2)         &&
              isNotEmpty(address_details_2)      &&
              isNotEmpty(mobile_no_2)            &&
              isNotEmpty(card_number)            &&
              isNotEmpty(card_fullname)          &&
              isNotEmpty(card_exp_month)         &&
              isNotEmpty(card_exp_year)          &&
              isNotEmpty(cvv_code)               &&
              isNotEmpty(bank_fullname)          &&
              isNotEmpty(bank_name)              &&
              isNotEmpty(bank_account_no)           )**/

              {

                Meteor.call('kitchen_details.update',
                profile_id,
                kitchen_name,
                chef_name,
                homecook_profile_keywords,
                kitchen_address,
                about_homecook_myself,
                bank_fullname,
                bank_name,
                bank_account_no
                );


        //divert to the profile page
        Blaze.render(Template.profile_card, document.getElementById('profile'));
        Blaze.remove(Template.instance().view);

          }
        /**  else{

          return false;
        } **/
      }
      });

      var trimInput = function(value){
        return value.replace(/^\s*|\s*$/g,"");
      }
