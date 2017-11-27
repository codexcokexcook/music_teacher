import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


Meteor.methods({


  'profile_details.update'(
    foodie_profile_id,
    foodie_name,
    email,
    date_of_birth,
    mobile_dial_code,
    mobile,
    profile_keywords,
    gender,
    about_myself,
    home_address_country,
    home_address,
    home_address_conversion,
    office_address_country,
    office_address,
    office_address_conversion,
    allergy_tags,
    dietary_tags,
    card_number,
    card_fullname,
    card_exp_month,
    card_exp_year,
    cvv_code,
    billing_address_country,
    billing_address
    ){
    Profile_details.update(
    {_id: foodie_profile_id},
    {$set: {
      foodie_name: foodie_name,
      email: email,
      date_of_birth: date_of_birth,
      mobile_dial_code: mobile_dial_code,
      mobile: mobile,
      profile_keywords: profile_keywords,
      gender: gender,
      about_myself: about_myself,
      home_address_country: home_address_country,
      home_address: home_address,
      home_address_conversion: home_address_conversion,
      office_address_country: office_address_country,
      office_address: office_address,
      office_address_conversion: office_address_conversion,
      allergy_tags: allergy_tags,
      dietary_tags: dietary_tags,
      card_number: card_number,
      card_fullname: card_fullname,
      card_exp_month: card_exp_month,
      card_exp_year: card_exp_year,
      cvv_code: cvv_code,
      billing_address_country: billing_address_country,
      billing_address: billing_address,
      updatedAt: new Date()
  }
})
},

  'kitchen_details.update'(
  kitchen_profile_id,
  kitchen_name,
  chef_name,
  homecook_profile_keywords,
  kitchen_address_country,
  kitchen_address,
  kitchen_address_conversion,
  about_homecook_myself,
  serving_option,
  bank_fullname,
  bank_name,
  bank_account_no,
  bank_address_country,
  bank_address
  ){
  Kitchen_details.update(
  {_id: kitchen_profile_id},
  {$set: {
      kitchen_name: kitchen_name,
      chef_name: chef_name,
      homecook_profile_keywords: homecook_profile_keywords,
      kitchen_address_country: kitchen_address_country,
      kitchen_address: kitchen_address,
      kitchen_address_conversion: kitchen_address_conversion,
      about_homecook_myself: about_homecook_myself,
      serving_option,
      bank_fullname: bank_fullname,
      bank_name: bank_name,
      bank_account_no: bank_account_no,
      bank_address_country: bank_address_country,
      bank_address: bank_address,
      updatedAt: new Date()
  }})
}
});
