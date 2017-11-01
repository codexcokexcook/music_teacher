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
    first_name,
    last_name,
    mobile,
    profile_keywords,
    date_of_birth,
    gender,
    about_myself,
    home_address,
    office_address,
    allergy_tags,
    dietary_tags,
    card_number,
    card_fullname,
    card_exp_month,
    card_exp_year,
    cvv_code
   ){
    Profile_details.insert({
    user_id: user_id,
    foodie_name: foodie_name,
    first_name: first_name,
    last_name: last_name,
    mobile: mobile,
    profile_keywords: profile_keywords,
    date_of_birth: date_of_birth,
    gender: gender,
    about_myself: about_myself,
    home_address: home_address,
    office_address: office_address,
    allergy_tags: allergy_tags,
    dietary_tags: dietary_tags,
    card_number: card_number,
    card_fullname: card_fullname,
    card_exp_month: card_exp_month,
    card_exp_year: card_exp_year,
    cvv_code: cvv_code,
    createdAt: new Date(),
    updatedAt: new Date()

  });
},

  'kitchen_details.insert'(
  user_id,
  kitchen_name,
  chef_name,
  homecook_profile_keywords,
  kitchen_address,
  about_homecook_myself,
  bank_fullname,
  bank_name,
  bank_account_no
  ){
  Kitchen_details.insert({
  user_id: user_id,
  kitchen_name: kitchen_name,
  chef_name: chef_name,
  homecook_profile_keywords: homecook_profile_keywords,
  kitchen_address: kitchen_address,
  about_homecook_myself: about_homecook_myself,
  bank_fullname: bank_fullname,
  bank_name: bank_name,
  bank_account_no: bank_account_no,
  createdAt: new Date(),
  updatedAt: new Date()


  });
  }
});
