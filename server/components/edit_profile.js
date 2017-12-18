import {
  Accounts
} from 'meteor/accounts-base';
import {
  FlowRouter
} from 'meteor/ostrio:flow-router-extra';
import {
  Template
} from 'meteor/templating';
import {
  Blaze
} from 'meteor/blaze';

import {
  Match
} from 'meteor/check';
import {
  check
} from 'meteor/check';


Meteor.methods({


  'profile_details.update' (
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
  ) {
    check(foodie_profile_id, String);
    check(foodie_name, String);
    check(email, Match.any);
    check(date_of_birth, Match.any);
    check(mobile_dial_code, Match.any);
    check(mobile, Match.any);
    check(profile_keywords, Match.any);
    check(gender, Match.any);
    check(about_myself, Match.any);
    check(home_address_country, Match.any);
    check(home_address, Match.any);
    check(home_address_conversion, Match.any);
    check(office_address_country, Match.any);
    check(office, Match.any);
    check(office_address_conversion, Match.any);
    check(allergy_tags, Match.any);
    check(dietary_tags, Match.any);
    check(card_number, Match.any);
    check(card_fullname, Match.any);
    check(card_exp_month, Match.any);
    check(card_exp_year, Match.any);
    check(billing_address_country, Match.any);
    check(cvv_code, Match.any);
    check(billing_address, Match.any);

    Profile_details.update({
      _id: foodie_profile_id
    }, {
      $set: {
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

  'kitchen_details.update' (
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
  ) {


    check(kitchen_profile_id, String);
    check(kitchen_name, String);
    check(chef_name, String);
    check(homecook_profile_keywords, Match.any);
    check(kitchen_address_country, Match.any);
    check(kitchen_address, Match.any);
    check(kitchen_address_conversion, Match.any);
    check(about_homecook_myself, Match.any);
    check(serving_option, Match.any);
    check(bank_fullname, Match.any);
    check(bank_name, Match.any);
    check(bank_account_no, Match.any);
    check(bank_address_country, Match.any);
    check(bank_address, Match.any);

    Kitchen_details.update({
      _id: kitchen_profile_id
    }, {
      $set: {
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
      }
    })
  }
});
