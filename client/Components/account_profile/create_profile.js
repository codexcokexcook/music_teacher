import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';
import './create_profile.html';
import './profile_card.html';

Profile_details = new Mongo.Collection('profile_details');
Address_details = new Mongo.Collection('address_details');
Payment_details = new Mongo.Collection('payment_details');
Bank_details = new Mongo.Collection('bank_details');


profile_images = new FilesCollection({
  collectionName: 'profile_images',
  storagePath: () => {
      return process.env.PWD + '/public/profile_upload/';
  },
  allowClientCode: false,
  onBeforeUpload(file) {

        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
          return true;
        } else {
          return 'Please upload image, with size equal or less than 10MB';
        }
  }
});
Meteor.subscribe('files.profile_images.all');

Session.keys = {}



/** function from ostrio **/

Template.profile_banner.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.profile_banner.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },

  checkUpload() {
     return Session.get('profile_image_id');
  },

  imageFile() {
      var profile_image_id = Session.get('profile_image_id');
      var profile_image_location = profile_images.findOne({"_id": profile_image_id});
      var profile_image_extension = profile_image_location && profile_image_location.extensionWithDot;
      /** guarding technique was used about as it returns unknown property of image_location.type and image_type.replace **/
      /** check this: http://seanmonstar.com/post/707078771/guard-and-default-operators **/
      var profile_ul_location = profile_image_id + profile_image_extension;

      return profile_ul_location;
  }
});

Template.profile_banner.events({
  'change #file_input'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = profile_images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic',
        meta:{
          purpose: "profile_picture"
        }
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, Images) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
            Meteor.setTimeout(get_profile_image_id,3000);
            /** Setup a delay of 100msec to ensure image is in place
            before session getting the image id and return to html
            to ensure the image is ready to display when image_id is returned.
            by doind this, I can stop meteor from reload the entire page to
            retrieve the image file **/
            /** There is a different time delay required for different browsers:
            For Chrome, we were able to display image with 100ms delay,
            for safari, it only worked with 2000ms delay. **/
            function get_profile_image_id() {
              return Session.set('profile_image_id', profile_images._id);
            }
        /** above is the line that prevents meteor from reloading **/
        }
        Meteor._reload.onMigrate(function () {
          return [false];
        });
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});





Template.create_profile.events({

  'submit form': function(event, template){
    event.preventDefault();
    const kitchen_name = trimInput(event.target.kitchen_name.value);
    const profile_keywords = trimInput(event.target.profile_keywords.value);
    const last_name = trimInput(event.target.last_name.value);
    const first_name = trimInput(event.target.first_name.value);
    const date_of_birth = trimInput(event.target.date_of_birth.value);
    const gender = event.target.gender.value
    const about_myself = trimInput(event.target.about_myself.value);
    const address_name_1 = trimInput(event.target.address_name_1.value);
    const address_details_1 = trimInput(event.target.address_details_1.value);
    const mobile_no_1 = trimInput(event.target.mobile_no_1.value);
    const address_name_2 = trimInput(event.target.address_name_2.value);
    const address_details_2 = trimInput(event.target.address_details_2.value);
    const mobile_no_2 = trimInput(event.target.mobile_no_2.value);
    const allergy_tags = Session.get('allergy_tags');
    const dietary_tags = Session.get('dietary_tags');
    const card_number = trimInput(event.target.card_number.value);
    const card_fullname = trimInput(event.target.card_fullname.value);
    const card_exp_month = trimInput(event.target.card_exp_month.value);
    const card_exp_year = trimInput(event.target.card_exp_year.value);
    const cvv_code = trimInput(event.target.cvv_code.value);
    const bank_fullname = trimInput(event.target.bank_fullname.value);
    const bank_name = trimInput(event.target.mobile_no_2.value);
    const bank_account_no = trimInput(event.target.bank_account_no.value);


    const user_id = Meteor.userId()



      if( isNotEmpty(kitchen_name)           &&
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
          isNotEmpty(bank_account_no)           )

          {
            Meteor.call('profile_details.insert',
            user_id,
            first_name,
            last_name,
            kitchen_name,
            profile_keywords,
            date_of_birth,
            gender,
            about_myself,
            allergy_tags,
            dietary_tags);

            Meteor.call('address_details.insert',
            user_id,
            address_name_1,
            address_details_1,
            mobile_no_1,
            address_name_2,
            address_details_2,
            mobile_no_2);

            Meteor.call('payment_details.insert',
            user_id,
            card_number,
            card_fullname,
            card_exp_month,
            card_exp_year,
            cvv_code);

            Meteor.call('bank_details.insert',
            user_id,
            bank_fullname,
            bank_name,
            bank_account_no);


    //divert to the profile page
    Blaze.render(Template.profile_card, document.getElementById('profile'));
    Blaze.remove(Template.instance().view);

      }
      else{
      return false;
    }
  }
  });

  //Validation rules

  //Trim Helper
  var trimInput = function(value){
    return value.replace(/^\s*|\s*$/g,"");
  }

  var isNotEmpty = function(value){
    if (value && value !== ''){
      return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right");
    return false;
  }
  //Email Validation
  isEmail = function(value){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(value)){
      return true;
    }
    Bert.alert("Please use a valid email address","danger","growl-top-right")
    return false;
  }

  //Check Password fields
  isValidPassword=function(password){

  if(password.length <8){
  Bert.alert("Password must be a least 8 charaters", "danger","growl-top-right");
    return false;
  }
    return true;
  };

  //Match Password
  areValidPassword = function(password, cpassword){

    if(!isValidPassword(password)){

  return false;

    }
    if(password !== cpassword){
      Bert.alert("Password do not match","danger","growl-top-right");
      return false;
    }
      return true;
  }




Template.create_profile.onRendered(function(){
/**
  //activate datepicker
    this.$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 100, // Creates a dropdown of 15 years to control year,
    today: 'TODAY',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
**/
  //activate modal
  this.$('.modal').modal();

  //activate dropdown
  this.$('select').material_select();

  //activate characterCounter
  this.$('input#input_text, textarea#about_myself').characterCounter();



});

Template.profile_bank_details.helpers ({
  bank_list: [
    { name: '   003 - Standard Chartered Bank(Hong Kong)', option: '1'},
    { name: '   004 - Hongkong and Shanghai Banking Corporation', option: '2'},
    { name: '   009 - China Construction Bank (Asia)', option: '3'},
    { name: '   012 - Bank of China (Hong Kong)', option: '4'},
    { name: '   015 - Bank of East Asia', option: '5'},
    { name: '   018 - China CITIC Bank International', option: '6'},
    { name: '   020 - Wing Lung Bank', option: '7'},
    { name: '   022 - OCBC Wing Hang Bank', option: '8'},
    { name: '   024 - Hang Seng Bank', option: '9'},
    { name: '   025 - Shanghai Commercial Bank', option: '10'},
    { name: '   027 - Bank of Communications', option: '11'},
    { name: '   028 - Public Bank (Hong Kong)', option: '12'},
    { name: '   038 - Tai Yau Bank', option: '13'},
    { name: '   039 - Chiyu Banking Corporation', option: '14'},
    { name: '   040 - Dah Sing Bank', option: '15'},
    { name: '   041 - Chong Hing Bank', option: '16'},
    { name: '   043 - Nanyang Commercial Bank', option: '17'},
    { name: '   061 - Tai Sang Bank', option: '18'},
    { name: '   072 - Industrial and Commercial Bank of China (Asia)', option: '19'},
    { name: '   128 - Fubon Bank (Hong Kong)', option: '20'},
    { name: '   250 - CitiBank (Hong Kong)', option: '21'},
  ],
});


Template.profile_payment_details.helpers ({
  month_list:[
    { month: '01', option:'1'},
    { month: '02', option:'2'},
    { month: '03', option:'3'},
    { month: '04', option:'4'},
    { month: '05', option:'5'},
    { month: '06', option:'6'},
    { month: '07', option:'7'},
    { month: '08', option:'8'},
    { month: '09', option:'9'},
    { month: '10', option:'10'},
    { month: '11', option:'11'},
    { month: '12', option:'12'},
  ],

  year_list:[
    { year: '2017', option:'1'},
    { year: '2018', option:'2'},
    { year: '2019', option:'3'},
    { year: '2020', option:'4'},
    { year: '2021', option:'5'},
    { year: '2022', option:'6'},
    { year: '2023', option:'7'},
    { year: '2024', option:'8'},
    { year: '2025', option:'9'},
    { year: '2026', option:'10'},
    { year: '2027', option:'11'},
    { year: '2028', option:'12'},

  ],
});
