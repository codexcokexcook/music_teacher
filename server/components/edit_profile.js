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
    check(email, Match.Any);
    check(date_of_birth, Match.Any);
    check(mobile_dial_code, Match.Any);
    check(mobile, Match.Any);
    check(profile_keywords, Match.Any);
    check(gender, Match.Any);
    check(about_myself, Match.Any);
    check(home_address_country, Match.Any);
    check(home_address, Match.Any);
    check(home_address_conversion, Match.Any);
    check(office_address_country, Match.Any);
    check(office, Match.Any);
    check(office_address_conversion, Match.Any);
    check(allergy_tags, Match.Any);
    check(dietary_tags, Match.Any);
    check(card_number, Match.Any);
    check(card_fullname, Match.Any);
    check(card_exp_month, Match.Any);
    check(card_exp_year, Match.Any);
    check(billing_address_country, Match.Any);
    check(cvv_code, Match.Any);
    check(billing_address, Match.Any);

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
    check(homecook_profile_keywords, Match.Any);
    check(kitchen_address_country, Match.Any);
    check(kitchen_address, Match.Any);
    check(kitchen_address_conversion, Match.Any);
    check(about_homecook_myself, Match.Any);
    check(serving_option, Match.Any);
    check(bank_fullname, Match.Any);
    check(bank_name, Match.Any);
    check(bank_account_no, Match.Any);
    check(bank_address_country, Match.Any);
    check(bank_address, Match.Any);

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
