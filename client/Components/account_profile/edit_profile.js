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
  },

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
  'click #edit_foodie_button': function(event, template){
    event.preventDefault();




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

            $('#edit_homecook_button').click();




/**    //divert to the profile page
    Blaze.render(Template.foodie_profile_card, document.getElementById('profile'));
    Blaze.remove(Template.instance().view);
**/
      }
    /**  else{

      return false;
    } **/
  }
  });

  Template.edit_homecook_profile.helpers ({
    'get_homecook_profile': function(){
      return Kitchen_details.findOne({'user_id': Meteor.userId()});
    },
    bank_list: [
      { name: '003 - Standard Chartered Bank (Hong Kong)', option: '1'},
      { name: '004 - Hongkong and Shanghai Banking Corporation', option: '2'},
      { name: '009 - China Construction Bank (Asia)', option: '3'},
      { name: '012 - Bank of China (Hong Kong)', option: '4'},
      { name: '015 - Bank of East Asia', option: '5'},
      { name: '018 - China CITIC Bank International', option: '6'},
      { name: '020 - Wing Lung Bank', option: '7'},
      { name: '022 - OCBC Wing Hang Bank', option: '8'},
      { name: '024 - Hang Seng Bank', option: '9'},
      { name: '025 - Shanghai Commercial Bank', option: '10'},
      { name: '027 - Bank of Communications', option: '11'},
      { name: '028 - Public Bank (Hong Kong)', option: '12'},
      { name: '038 - Tai Yau Bank', option: '13'},
      { name: '039 - Chiyu Banking Corporation', option: '14'},
      { name: '040 - Dah Sing Bank', option: '15'},
      { name: '041 - Chong Hing Bank', option: '16'},
      { name: '043 - Nanyang Commercial Bank', option: '17'},
      { name: '061 - Tai Sang Bank', option: '18'},
      { name: '072 - Industrial and Commercial Bank of China (Asia)', option: '19'},
      { name: '128 - Fubon Bank (Hong Kong)', option: '20'},
      { name: '250 - CitiBank (Hong Kong)', option: '21'},
    ]
  })

  Template.edit_homecook_profile.onRendered(function(){

    var get_homecook_profile = Kitchen_details.findOne({'user_id': Meteor.userId()});

    //activate dropdown
    this.$('select').material_select();

    //activate characterCounter
    this.$('input#input_text, textarea#about_myself').characterCounter();

    //activate the selection tabs
    this.$(document).ready(function(){
      $('ul.tabs').tabs();
    });
});


  //Kitchen Database
    Template.edit_homecook_profile.events({
      'click #edit_homecook_button': function(event, template){
        event.preventDefault();

        const foodie_profile_id = Profile_details.findOne({'user_id': Meteor.userId()})._id;
        const foodie_name = $('#foodie_name').val();
        const first_name = $('#first_name').val();
        const last_name = $('#last_name').val();
        const mobile = $('#mobile').val();
        const profile_keywords = $('#profile_keywords').val();
        const date_of_birth = $('#date_of_birth').val();
        const gender =  $("input[name='gender']:checked"). val();
        const about_myself = $('#about_myself').val();
        const home_address = $('#home_address').val();
        const office_address = $('#office_address').val();
        const allergy_tags = Session.get('allergy_tags');
        const dietary_tags = Session.get('dietary_tags');
        const card_number = $('#card_number').val();
        const card_fullname = $('#card_fullname').val();
        const card_exp_month = $('#card_exp_month').val();
        const card_exp_year = $('#card_exp_year').val();
        const cvv_code = $('#cvv_code').val();

        const kitchen_profile_id = Kitchen_details.findOne({'user_id': Meteor.userId()})._id
        const kitchen_name = $('#kitchen_name').val();
        const chef_name = $('#chef_name').val();
        const homecook_profile_keywords = $('#homecook_profile_keywords').val();
        const kitchen_address = $('#kitchen_address').val();
        const about_homecook_myself = $('#about_homecook_myself').val();
        const bank_fullname = $('#bank_fullname').val();
        const bank_name = $('#bank_name').val();
        const bank_account_no = $('#bank_account_no').val();
        const user_id = Meteor.userId()

console.log(kitchen_profile_id)

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
                foodie_profile_id,
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
                );

                Meteor.call('kitchen_details.update',
                kitchen_profile_id,
                kitchen_name,
                chef_name,
                homecook_profile_keywords,
                kitchen_address,
                about_homecook_myself,
                bank_fullname,
                bank_name,
                bank_account_no
                );

Materialize.toast('Profile updated!', 4000)

        //divert to the profile page
/**        Blaze.render(Template.profile_card, document.getElementById('profile'));
        Blaze.remove(Template.instance().view);
**/
          }
        /**  else{

          return false;
        } **/


      }
      });

      var trimInput = function(value){
        return value.replace(/^\s*|\s*$/g,"");
      }
