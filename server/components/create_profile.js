import { Meteor } from 'meteor/meteor';

Profile_details = new Mongo.Collection('profile_details');
Address_details = new Mongo.Collection('address_details');
Payment_details = new Mongo.Collection('payment_details');
Bank_details = new Mongo.Collection('bank_details');
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
    Profile_details.insert({
    user_id: user_id,
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

  });
},
  'address_details.insert'(
    user_id,
    address_name_1,
    address_details_1,
    contact_no_1,
    address_name_2,
    address_details_2,
    contact_no_2
    ){
    Address_details.insert({
      user_id,
      address_name_1,
      address_details_1,
      contact_no_1,
      address_name_2,
      address_details_2,
      contact_no_2

  });
},

'payment_details.insert'(
  user_id,
  card_number,
  card_fullname,
  card_exp_month,
  card_exp_year,
  cvv_code
  ){
  Payment_details.insert({
    user_id,
    card_number,
    card_fullname,
    card_exp_month,
    card_exp_year,
    cvv_code
});
},

'bank_details.insert'(
  user_id,
  bank_fullname,
  bank_name,
  bank_account_no
  ){
  Bank_details.insert({
    user_id,
    bank_fullname,
    bank_name,
    bank_account_no

});
}
});
