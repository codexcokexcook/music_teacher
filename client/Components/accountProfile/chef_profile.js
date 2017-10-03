import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';


import './chef_profile.html';

Template.chef_profile_form.onRendered(function(){

  this.$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  Template.chef_profile_form.onRendered(function(){
      this.$('select').material_select();
  });


});

Template.chef_profile_form.helpers ({
  allergy_list: [
    { name: 'Milk', file_name: 'milk'},
    { name: 'Tree-nuts', file_name: 'tree_nuts'},
    { name: 'Fish', file_name: 'fish'},
    { name: 'Egg', file_name: 'egg'},
    { name: 'Wheat', file_name: 'wheat'},
    { name: 'Shellfish', file_name: 'shellfish'},
    { name: 'Peanuts', file_name: 'peanuts'},
    { name: 'Soy', file_name: 'soy'},
  ],
});

Template.chef_profile_form.events({
  'change .filled-in': function(event, template) {
    var get_allergy = template.findAll("input[type=checkbox]:checked");
      var selected_allergy = get_allergy.map(function(item){
        return item.value;
    });
    Session.set('allergy_tags',selected_allergy);
    }
});

Template.chef_profile_form.helpers ({
  dietary_list: [
    { name: 'Diabetic', file_name: 'diabetic'},
    { name: 'Low Sodium', file_name: 'low_sodium'},
    { name: 'Pescetartrian', file_name: 'pescetartrian'},
    { name: 'Gluten free', file_name: 'gluten_free'},
    { name: 'Low carbs', file_name: 'low_carb'},
    { name: 'Vegan', file_name: 'vegan'},
    { name: 'High Protein', file_name: 'high_protein'},
    { name: 'Nuts Free', file_name: 'nuts_free'},
    { name: 'Vegetarian', file_name: 'vegetarian'},
    { name: 'Lactose Free', file_name: 'lactose_free'},
    { name: 'Paleo', file_name: 'paleo'},
  ],
});

Template.chef_profile_form.events({
  'change .filled-in': function(event, template) {
    var get_dietary = template.findAll("input[type=checkbox]:checked");
      var selected_dietary = get_dietary.map(function(item){
        return item.value;
    });
    Session.set('dietary_tags',selected_dietary);
    }
});


Template.chef_profile_form.helpers ({
  dietary_list: [
    { name: 'Diabetic', file_name: 'diabetic'},
    { name: 'Low Sodium', file_name: 'low_sodium'},
    { name: 'Pescetartrian', file_name: 'pescetartrian'},
    { name: 'Gluten free', file_name: 'gluten_free'},
    { name: 'Low carbs', file_name: 'low_carb'},
    { name: 'Vegan', file_name: 'vegan'},
    { name: 'High Protein', file_name: 'high_protein'},
    { name: 'Nuts Free', file_name: 'nuts_free'},
    { name: 'Vegetarian', file_name: 'vegetarian'},
    { name: 'Lactose Free', file_name: 'lactose_free'},
    { name: 'Paleo', file_name: 'paleo'},
  ],
});

Template.chef_profile_form.events({
  'change .filled-in': function(event, template) {
    var get_dietary = template.findAll("input[type=checkbox]:checked");
      var selected_dietary = get_dietary.map(function(item){
        return item.value;
    });
    Session.set('dietary_tags',selected_dietary);
    }
});
