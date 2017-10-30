import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


Meteor.methods({


  'profile_details.update'(
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
    cvv_code ){
    Profile_details.update(
    {_id: menu_id},
    {$set: {
      foodie_name: foodie_name,
      mobile: mobile,
      profile_keywords: profile_keywords,
      date_of_birth: date_of_birth,
      gender: gender,
      about_myself: about_myself,
      allergy_tags: allergy_tags,
      dietary_tags: dietary_tags,
      home_address: home_address,
      office_address: office_address,
      card_number: card_number,
      card_fullname: card_fullname,
      card_exp_month: card_exp_month,
      card_exp_year: card_exp_year,
      cvv_code: cvv_code

  }});
},

  'kitchen_details.update'(
  profile_id,
  kitchen_name,
  chef_name,
  homecook_profile_keywords,
  kitchen_address,
  about_homecook_myself,
  bank_fullname,
  bank_name,
  bank_account_no
  ){
  Kitchen_details.insert(
  {_id: menu_id},
  {$set: {
      kitchen_name: kitchen_name,
      chef_name: chef_name,
      homecook_profile_keywords: homecook_profile_keywords,
      kitchen_address: kitchen_address,
      about_homecook_myself: about_homecook_myself,
      bank_fullname: bank_fullname,
      bank_name: bank_name,
      bank_account_no: bank_account_no

  }});
  }
});
