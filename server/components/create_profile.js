import { Meteor } from 'meteor/meteor';
Profile_details = new Mongo.Collection('profile_details');
Kitchen_details = new Mongo.Collection('kitchen_details');

profile_images = new FilesCollection({
  storagePath: () => {
      return process.env.PWD + '/public/profile_upload/';
  },
  collectionName: 'profile_images',
  allowClientCode: false,
  onBeforeUpload(file) {

    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

// set permission for Profile Details collection
Profile_details.deny({
  remove() { return true; }
});

// set permission for Kitchen Datails collection
Profile_details.deny({
  remove() { return true; }
});

Meteor.publish('files.profile_images.all', function () {
    return profile_images.find().cursor;
});

Meteor.methods({
  'profile_images.remove'(purpose){
    profile_images.remove({userId: Meteor.userId(),meta:{purpose: purpose}});
  },

  'profile_details.insert'(
    user_id,
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
    Profile_details.insert({
    user_id: user_id,
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
    createdAt: new Date(),
    updatedAt: new Date()

  });
},

  'kitchen_details.insert'(
    user_id,
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
  Kitchen_details.insert({
  user_id: user_id,
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
  createdAt: new Date(),
  updatedAt: new Date()


  });
  }
});
