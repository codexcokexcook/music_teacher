
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { FilesCollection } from 'meteor/ostrio:files';

import './create_dishes_form.html';


Meteor.subscribe('files.images.all');

Session.keys = {}

/** function from ostrio **/

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },

  checkUpload() {
     return Session.get('image_id');
  },

  imageFile() {
      var image_id = Session.get('image_id');
      var image_location = Images.findOne({"_id": image_id});
      var image_extension = image_location && image_location.extensionWithDot;
      /** guarding technique was used about as it returns unknown property of image_location.type and image_type.replace **/
      /** check this: http://seanmonstar.com/post/707078771/guard-and-default-operators **/
      var ul_location = image_id + image_extension;

      return ul_location;
  }
});

Template.uploadForm.events({
  'change #file_input'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        Meteor._reload.onMigrate(function () {
          return [false];
        });
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, Images) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
            Meteor.setTimeout(get_image_id,4000);
            /** Setup a delay of 100msec to ensure image is in place
            before session getting the image id and return to html
            to ensure the image is ready to display when image_id is returned.
            by doind this, I can stop meteor from reload the entire page to
            retrieve the image file **/
            /** There is a different time delay required for different browsers:
            For Chrome, we were able to display image with 100ms delay,
            for safari, it only worked with 2000ms delay. **/
            function get_image_id() {
              return Session.set('image_id', Images._id);
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

/** fucntion from Ostrio -- end here -- **/

Template.serving_option.onRendered(function(){
    this.$('select').material_select();
});

Template.ingredient_unit_selector.helpers({

  units: [
    { name: 'g', shortform: 'g' },
    { name: 'kg', shortform: 'kg' },
    { name: 'litre', shortform: 'l' },
    { name: 'ml', shortform: 'ml' },
    { name: 'm', shortform: 'm' },
    { name: 'cm', shortform: 'cm' },
    { name: 'teaspoon', shortform: 'tsp' },
    { name: 'tablespoon', shortform: 'tbs' },
    { name: 'cup', shortform: 'c' },
    { name: 'pound', shortform: 'lb' },
    { name: 'ounce', shortform: 'oz' },
    { name: 'inch', shortform: 'in' },
    { name: 'portion(s)', shortform: 'portions' },
    { name: 'piece(s)', shortform: 'pieces' },
  ]
});

Template.ingredient_unit_selector.onRendered(function(){
    this.$('select').material_select();
});

Template.ingredient_input.helpers({
  'ingredient_list': function () {
      return Ingredients_temporary.find();
  }
});

Template.ingredient_input.events({
    'click .ingredient_input': function(event) {
        event.preventDefault();
        var dish_name = $('#dish_name').val();
        var ingredient_name= $('#ingredient_name').val();
        var ingredient_quantity = $('#ingredient_quantity').val();
        var ingredient_unit = $('#ingredient_unit').val();
        // var user_id = Meteor.userId(); this should be implemented after user account is available **/

         Ingredients_temporary.insert({
            dish_name: dish_name,
          //  user_id: user_id, this should be implemented after user account is available **/
            ingredient_name: ingredient_name,
            ingredient_quantity: ingredient_quantity,
            ingredient_unit: ingredient_unit,
         });

       /* this is how it is done if 'Ingredients' is an array of objective, not
       a database -- Ingredients.push({"ingredient_name":ingredient_name,
       "ingredient_quantity":ingredient_quantity,"ingredinet_unit":ingredient_unit});
        console.log(Ingredients); */

        $('#ingredient_name').val("");
        $('#ingredient_quantity').val("");
        $('#ingredient_unit').val("");

        console.log(Ingredients_temporary.find());

        return false;

    }
});

Template.price.helpers ({
  'profit': function () {
    return Session.get('dish_profit');
  }
});

Template.price.events({
  'change .validate': function() {
    var cost = $('#dish_cost').val();
    var selling_price = $('#dish_selling_price').val();
    var profit_calculation = selling_price - cost;
    Session.set('dish_profit',profit_calculation);
  }
});

Template.food_allergies.helpers ({
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

Template.food_allergies.events({
  'change .filled-in': function(event, template) {
    var get_allergy = template.findAll("input[type=checkbox]:checked");
      var selected_allergy = get_allergy.map(function(selection){
        return selection.value;
    });
    Session.set('allergy_tags',selected_allergy);
    }
});

Template.dietary_preferences.helpers ({
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

Template.dietary_preferences.events({
  'change .filled-in': function(event, template) {
    var get_dietary = template.findAll("input[type=checkbox]:checked");
      var selected_dietary = get_dietary.map(function(item){
        return item.value;
    });
    Session.set('dietary_tags',selected_dietary);
    }
});

Template.food_tags.onRendered(function(){
    this.$('.collapsible').collapsible('open', 0);
    this.$('.collapsible').collapsible('close', 1);
    this.$('.collapsible').collapsible('close', 2);
    this.$('.collapsible').collapsible('close', 3);
    this.$('.collapsible').collapsible('close', 4);
    this.$('.collapsible').collapsible('close', 5);
    this.$('.collapsible').collapsible('close', 6);
    this.$('.collapsible').collapsible('close', 7);
    this.$('.collapsible').collapsible('close', 8);
    this.$('.collapsible').collapsible({
      accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});

Template.food_tags.helpers({

  title_list: [
    { name: 'Cuisine', id:'Cuisine'},
    { name: 'Protein', id:'Protein' },
    { name: 'Categories', id:'Categories' },
    { name: 'Cooking method', id:'Cooking_method' },
    { name: 'Taste', id:'Taste' },
    { name: 'Texture', id:'Texture' },
    { name: 'Vegetables', id:'Vegetables' },
    { name: 'Condiements', id:'Condiements' },
    { name: 'Serving temperature', id:'Serving_temperature' },
  ],
});

Template.cuisines_list.helpers({
  cuisines_list: [
    { name: 'African', id:'African' },
    { name: 'American', id:'American' },
    { name: 'Australian', id:'Australian' },
    { name: 'Chinese', id:'Chinese' },
    { name: 'French', id:'French' },
    { name: 'Fusion', id:'Fusion' },
    { name: 'Indian', id:'Indian' },
    { name: 'International', id:'International' },
    { name: 'Italian', id:'Italian' },
    { name: 'Japanese', id:'Japanese' },
    { name: 'Korean', id:'Korean' },
    { name: 'Mexican', id:'Mexican' },
    { name: 'Nordic', id:'Nordic' },
    { name: 'Portuguese', id:'Portuguese' },
    { name: 'South American', id:'South_American' },
    { name: 'Southeast Asian', id:'Southeast_Asian' },
    { name: 'Spanish', id:'Spanish' },
    { name: 'Taiwanese', id:'Taiwanese' },
  ],
});

Template.cuisines_list.events({
  'change .filled-in': function(event, template) {
    var get_cuisines = template.findAll("input[type=checkbox]:checked");
      var selected_cuisines = get_cuisines.map(function(item){
        return item.value;
    });
    Session.set('cuisines_tags',selected_cuisines);
    }
});

Template.proteins_list.helpers({
  proteins_list: [
    {name: 'Beef', id:'Beef' },
    {name: 'Chicken', id:'Chicken' },
    {name: 'Egg', id:'Egg' },
    {name: 'Fish', id:'Fish' },
    {name: 'Lamb', id:'Lamb' },
    {name: 'Pork', id:'Pork' },
    {name: 'Seafood', id:'Seafood' },
  ],
})

Template.proteins_list.events({
  'change .filled-in': function(event, template) {
    var get_proteins = template.findAll("input[type=checkbox]:checked");
      var selected_proteins = get_proteins.map(function(item){
        return item.value;
    });
    Session.set('proteins_tags',selected_proteins);
    }
});

Template.categories_list.helpers({
  categories_list: [
    {name: 'Bread', id:'Bread' },
    {name: 'Burger', id:'Burger' },
    {name: 'Cake', id:'Cake' },
    {name: 'Curry', id:'Curry' },
    {name: 'Dessert', id:'Dessert' },
    {name: 'Drinks', id:'Drinks' },
    {name: 'Noodles', id:'Noodles' },
    {name: 'Pasta', id:'Pasta' },
    {name: 'Pastry', id:'Pastry' },
    {name: 'Porridge', id:'Porridge' },
    {name: 'Rice', id:'Rice' },
    {name: 'Salad', id:'Salad' },
    {name: 'Sandwich', id:'Sandwich' },
    {name: 'Soup', id:'Soup' },
    {name: 'Vegan', id:'Vegan' },
    {name: 'Vegetarian', id:'Vegetarian' },
  ]
});

Template.categories_list.events({
  'change .filled-in': function(event, template) {
    var get_categories = template.findAll("input[type=checkbox]:checked");
      var selected_categories = get_categories.map(function(item){
        return item.value;
    });
    Session.set('categories_tags',selected_categories);
    }
});

Template.cooking_methods_list.helpers({
  cooking_methods_list: [
    {name: 'BBQ', id:'BBQ'},
    {name: 'Braised', id:'Braised'},
    {name: 'Deep-fried', id:'Deep_fried'},
    {name: 'Poached', id:'Poached'},
    {name: 'Roast', id:'Roast'},
    {name: 'Smoked', id:'Smoked'},
    {name: 'Sous-vide', id:'Sous_vide'},
    {name: 'Steamed', id:'Steamed'},
    {name: 'Stewed', id:'Stewed'},
    {name: 'Stir-fried', id:'Stir_fried'},
  ],
});

Template.cooking_methods_list.events({
  'change .filled-in': function(event, template) {
    var get_cooking_methods = template.findAll("input[type=checkbox]:checked");
      var selected_cooking_methods = get_cooking_methods.map(function(item){
        return item.value;
    });
    Session.set('cooking_methods_tags',selected_cooking_methods);
    }
});

Template.tastes_list.helpers({
  tastes_list: [
    {name: 'Bitter', id:'Bitter'},
    {name: 'Cheesy', id:'Cheesy'},
    {name: 'Floral', id:'Floral'},
    {name: 'Heavy', id:'Heavy'},
    {name: 'Hot', id:'Hot'},
    {name: 'Salty', id:'Salty'},
    {name: 'Savory', id:'Savory'},
    {name: 'Smoky', id:'Smoky'},
    {name: 'Sour', id:'Sour'},
    {name: 'Spicy', id:'Spicy'},
    {name: 'Sweet', id:'Sweet'},
    {name: 'Tart', id:'Tart'},
    {name: 'Umami', id:'Umami'},
  ],
});

Template.tastes_list.events({
  'change .filled-in': function(event, template) {
    var get_tastes = template.findAll("input[type=checkbox]:checked");
      var selected_tastes = get_tastes.map(function(item){
        return item.value;
    });
    Session.set('tastes_tags',selected_tastes);
    }
});

Template.textures_list.helpers({
  textures_list: [
     {name: 'Dry', id:'Dry'},
     {name: 'Mushy', id:'Mushy'},
     {name: 'Moist', id:'Moist'},
     {name: 'Gooey', id:'Gooey'},
     {name: 'Greasy', id:'Greasy'},
     {name: 'Oily', id:'Oily'},
     {name: 'Crumbly', id:'Crumbly'},
     {name: 'Creamy', id:'Creamy'},
  ],
});

Template.textures_list.events({
  'change .filled-in': function(event, template) {
    var get_textures = template.findAll("input[type=checkbox]:checked");
      var selected_textures = get_textures.map(function(item){
        return item.value;
    });
    Session.set('textures_tags',selected_textures);
    }
});

Template.vegetables_list.helpers({
  vegetables_list: [
     {name: 'Beans', id:'Beans'},
     {name: 'Flowers & flower buds', id:'Flowers_buds'},
     {name: 'Fruits', id:'Fruits'},
     {name: 'Grains', id:'Grains'},
     {name: 'Herbs', id:'Herbs'},
     {name: 'Melons', id:'Melons'},
     {name: 'Root vegetables', id:'Roots'},
     {name: 'Salad leaf vegetables', id:'Salad_leaves'},
     {name: 'Squashes', id:'Squashes'},
  ],
});

Template.vegetables_list.events({
  'change .filled-in': function(event, template) {
    var get_vegetables = template.findAll("input[type=checkbox]:checked");
      var selected_vegetables = get_vegetables.map(function(item){
        return item.value;
    });
    Session.set('vegetables_tags',selected_vegetables);
    }
});

Template.condiments_list.helpers({
  condiments_list: [
     {name: 'Butter', id:'Butter'},
     {name: 'Cheese', id:'Cheese'},
     {name: 'Cream', id:'Cream'},
     {name: 'Dried food', id:'Dried_food'},
     {name: 'Dried fruits', id:'Dried_fruits'},
     {name: 'Dried seafood', id:'Dried_seafood'},
     {name: 'Dried vegetables', id:'Dried_vegetables'},
     {name: 'Dry herbs', id:'Dry_herbs'},
     {name: 'Flour', id:'Flour'},
     {name: 'Jam', id:'Jam'},
     {name: 'Oil', id:'Oil'},
     {name: 'Powder', id:'Powder'},
     {name: 'Salt', id:'Salt'},
     {name: 'Sauce', id:'Sauce'},
     {name: 'Sugar', id:'Sugar'},
     {name: 'Yoghurt', id:'Yoghurt'},
  ],
});

Template.condiments_list.events({
  'change .filled-in': function(event, template) {
    var get_condiments = template.findAll("input[type=checkbox]:checked");
      var selected_condiments = get_condiments.map(function(item){
        return item.value;
    });
    Session.set('condiments_tags',selected_condiments);
    }
});

Template.serving_temperature_list.helpers({
  serving_temperature_list: [
     {name: 'Chill', id:'Chill'},
     {name: 'Cold', id:'Cold'},
     {name: 'Frozen', id:'Frozen'},
     {name: 'Hot', id:'Hot'},
     {name: 'Warm', id:'Warm'},
  ],
});

Template.serving_temperature_list.events({
  'change .filled-in': function(event, template) {
    var get_serving_temperature = template.findAll("input[type=checkbox]:checked");
      var selected_serving_temperature = get_serving_temperature.map(function(item){
        return item.value;
    });
    Session.set('serving_temperature_tags',selected_serving_temperature);
    }
});

Template.create_dishes_form.events({
    'submit form': function(event) {
         event.preventDefault();
         var user_id = Meteor.userId();
         var dish_name = event.target.dish_name.value;
         var dish_description = event.target.dish_description.value;
         var serving_option = event.target.serving_option.value;
         var cooking_time = event.target.cooking_time.value;

         var dish_cost = event.target.dish_cost.value;
         var dish_selling_price = event.target.dish_selling_price.value;
         var dish_profit = dish_selling_price - dish_cost;

         Dishes.insert({
            /** user_id: user_id, this should be implemented after user account is available **/
            image_id: Session.get('image_id'),
            user_id: user_id,
            dish_name: dish_name,
            dish_description: dish_description,

            serving_option: serving_option,
            cooking_time: cooking_time,

            dish_cost: dish_cost,
            dish_selling_price: dish_selling_price,
            dish_profit: Session.get('dish_profit'),

            allergy_tags: Session.get('allergy_tags'),
            dietary_tags: Session.get('dietary_tags'),

            cuisines_tags: Session.get('cuisines_tags'),
            proteins_tags: Session.get('proteins_tags'),
            categories_tags: Session.get('categories_tags'),
            cooking_methods_tags: Session.get('cooking_methods_tags'),
            tastes_tags: Session.get('tastes_tags'),
            textures_tags: Session.get('textures_tags'),
            vegetables_tags: Session.get('vegetables_tags'),
            condiments_tags: Session.get('condiments_tags'),
            serving_temperature_tags: Session.get('serving_temperature_tags'),

            random: Math.random(), //insert a random number for sampling random dish on surpise me / blueplate special

            createdAt: new Date()
         });

        Ingredients_temporary.find({}).forEach(
            function(doc){
              Ingredients.insert(doc);
            }
          );
         Materialize.toast('Nice! You have created a dish!', 2000);

         Ingredients_temporary.remove({});

         event.target.dish_name.value ="";
         event.target.dish_description.value ="";
         event.target.serving_option.value="";
         event.target.cooking_time.value="";
         event.target.dish_cost.value="";
         event.target.dish_selling_price.value="";

         var checkboxes = document.getElementsByClassName("filled-in");
         for (var i = 0; i < checkboxes.length; i++) {
             checkboxes[i].checked = false;
         };

         Session.keys = {}; /** clear Session.get for image upload to reset back to original **/

         console.log(Session.get('image_id'));
         console.log(Dishes.find());
         console.log(Ingredients_temporary.find());
         console.log(Ingredients.find());
         Materialize.updateTextFields();
         return false;
    }
});
