import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { FilesCollection } from 'meteor/ostrio:files';

Dishes = new Mongo.Collection('dishes');
Ingredients_temporary = new Mongo.Collection(null);
Ingredients = new Mongo.Collection('ingredients');

Images = new FilesCollection({
  collectionName: 'Images',
  storagePath: () => {
      return process.env.PWD + '/public/dishes_upload/';
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

Meteor.subscribe('files.images.all');

Session.keys = {}

$(document).ready(function() {
     $('select').material_select();
     $('.collapsible').collapsible('open',0);
     $('.collapsible').collapsible('open',1);
     $('.collapsible').collapsible('open',2);
     $('.collapsible').collapsible('open',3);
     $('.collapsible').collapsible('open',4);
     $('.collapsible').collapsible('open',5);
     $('.collapsible').collapsible('open',6);
     $('.collapsible').collapsible('open',7);
     $('.collapsible').collapsible('open',8);
});


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
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, Images) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
            Meteor.setTimeout(get_image_id,1500);
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

Template.ingredient_input.helpers({

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
  ],

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
        /** var user_id = Meteor.userId(); this should be implemented after user account is available **/

         Ingredients_temporary.insert({
            dish_name: dish_name,
          /**  user_id: user_id, this should be implemented after user account is available **/
            ingredient_name: ingredient_name,
            ingredient_quantity: ingredient_quantity,
            ingredient_unit: ingredient_unit,
         });

       /**this is how it is done if 'Ingredients' is an array of objective, not a database -- Ingredients.push({"ingredient_name":ingredient_name, "ingredient_quantity":ingredient_quantity,"ingredinet_unit":ingredient_unit});
        console.log(Ingredients); **/

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

Template.body.events({
    'submit form': function(event) {
         event.preventDefault();
         /** var user_id = Meteor.userId(); this should be implemented after user account is available **/
         var dish_name = event.target.dish_name.value;
         var dish_description = event.target.dish_description.value;
         var serving_option = event.target.serving_option.value;
         var cooking_time = event.target.cooking_time.value;

         var dish_cost = event.target.dish_cost.value;
         var dish_selling_price = event.target.dish_selling_price.value;
         var dish_profit = dish_selling_price - dish_cost;

         var milk_allergy = event.target.milk_allergy.checked;
         var tree_nuts_allergy = event.target.tree_nuts_allergy.checked;
         var fish_allergy = event.target.fish_allergy.checked;
         var egg_allergy = event.target.egg_allergy.checked;
         var wheat_allergy = event.target.wheat_allergy.checked;
         var shellfish_allergy = event.target.shellfish_allergy.checked;
         var peanuts_allergy = event.target.peanuts_allergy.checked;
         var soy_allergy = event.target.soy_allergy.checked;

         var diabetic_preference = event.target.diabetic.checked;
         var low_sodium_preference = event.target.low_sodium.checked;
         var pescetartrian_preference = event.target.pescetartrian.checked;
         var gluten_free_preference = event.target.gluten_free.checked;
         var low_carb_preference = event.target.low_carb.checked;
         var vegan_preference = event.target.vegan.checked;
         var high_protein_preference = event.target.high_protein.checked;
         var nuts_free_preference = event.target.nuts_free.checked;
         var vegetarian_preference = event.target.vegetarian.checked;
         var lactose_free_preference = event.target.lactose_free.checked;
         var paleo_preference = event.target.paleo.checked;

         var African_cuisine = event.target.African.checked;
         var American_cuisine = event.target.American.checked;
         var Australian_cuisine = event.target.Australian.checked;
         var Chinese_cuisine = event.target.Chinese.checked;
         var French_cuisine = event.target.French.checked;
         var Fusion_cuisine = event.target.Fusion.checked;
         var Indian_cuisine = event.target.Indian.checked;
         var International_cuisine = event.target.International.checked;
         var Italian_cuisine = event.target.Italian.checked;
         var Japanese_cuisine = event.target.Japanese.checked;
         var Korean_cuisine = event.target.Korean.checked;
         var Mexican_cuisine = event.target.Mexican.checked;
         var Nordic_cuisine = event.target.Nordic.checked;
         var Portuguese_cuisine = event.target.Portuguese.checked;
         var South_American_cuisine = event.target.South_American.checked;
         var Southeast_Asian_cuisine = event.target.Southeast_Asian.checked;
         var Spanish_cuisine = event.target.Spanish.checked;
         var Taiwanese_cuisine = event.target.Taiwanese.checked;

         var Beef_protein = event.target.Beef.checked;
         var Chicken_protein = event.target.Chicken.checked;
         var Egg_protein = event.target.Egg.checked;
         var Fish_protein = event.target.Fish.checked;
         var Lamb_protein = event.target.Lamb.checked;
         var Pork_protein = event.target.Pork.checked;
         var Seafood_protein = event.target.Seafood.checked;

         var Bread_category=event.target.Bread.checked;
         var Burger_category=event.target.Burger.checked;
         var Cake_category=event.target.Cake.checked;
         var Curry_category=event.target.Curry.checked;
         var Dessert_category=event.target.Dessert.checked;
         var Noodles_category=event.target.Noodles.checked;
         var Pasta_category=event.target.Pasta.checked;
         var Pastry_category=event.target.Pastry.checked;
         var Porridge_category=event.target.Porridge.checked;
         var Rice_category=event.target.Rice.checked;
         var Salad_category=event.target.Salad.checked;
         var Sandwich_category=event.target.Sandwich.checked;
         var Soup_category=event.target.Soup.checked;
         var Vegan_category=event.target.Vegan.checked;
         var Vegetarian_category=event.target.Vegetarian.checked;

         var BBQ_method=event.target.BBQ.checked;
         var Braised_method=event.target.Braised.checked;
         var Deep_fried_method=event.target.Deep_fried.checked;
         var Poached_method=event.target.Poached.checked;
         var Roast_method=event.target.Roast.checked;
         var Smoked_method=event.target.Smoked.checked;
         var Sous_vide_method=event.target.Sous_vide.checked;
         var Steamed_method=event.target.Steamed.checked;
         var Stewed_method=event.target.Stewed.checked;
         var Stir_fried_method=event.target.Stir_fried.checked;

         var Bitter_taste = event.target.Bitter.checked;
         var Cheesy_taste = event.target.Cheesy.checked;
         var Floral_taste = event.target.Floral.checked;
         var Heavy_taste = event.target.Heavy.checked;
         var Hot_taste = event.target.Hot.checked;
         var Salty_taste = event.target.Salty.checked;
         var Savory_taste = event.target.Savory.checked;
         var Smoky_taste = event.target.Smoky.checked;
         var Sour_taste = event.target.Sour.checked;
         var Spicy_taste = event.target.Spicy.checked;
         var Sweet_taste = event.target.Sweet.checked;
         var Tart_taste = event.target.Tart.checked;
         var Umami_taste = event.target.Umami.checked;

         var Dry_texture = event.target.Dry.checked;
         var Mushy_texture = event.target.Mushy.checked;
         var Moist_texture = event.target.Moist.checked;
         var Gooey_texture = event.target.Gooey.checked;
         var Greasy_texture = event.target.Greasy.checked;
         var Oily_texture = event.target.Oily.checked;
         var Crumbly_texture = event.target.Crumbly.checked;
         var Creamy_texture = event.target.Creamy.checked;

         var Beans_vegetable = event.target.Beans.checked;
         var Flowers_buds_vegetable = event.target.Flowers_buds.checked;
         var Fruits_vegetable = event.target.Fruits.checked;
         var Grains_vegetable = event.target.Grains.checked;
         var Herbs_vegetable = event.target.Herbs.checked;
         var Melons_vegetable = event.target.Melons.checked;
         var Root_vegetable = event.target.Roots.checked;
         var Salad_leaf_vegetable = event.target.Salad_leaves.checked;
         var Squashes_vegetable = event.target.Squashes.checked;

         var Butter_condiements = event.target.Butter.checked;
         var Cheese_condiements = event.target.Cheese.checked;
         var Cream_condiements = event.target.Cream.checked;
         var Dried_food_condiements = event.target.Dried_food.checked;
         var Dried_fruits_condiements = event.target.Dried_fruits.checked;
         var Dried_seafood_condiements = event.target.Dried_seafood.checked;
         var Dried_vegetables_condiements = event.target.Dried_vegetables.checked;
         var Dry_herbs_condiements = event.target.Dry_herbs.checked;
         var Flour_condiements = event.target.Flour.checked;
         var Jam_condiements = event.target.Jam.checked;
         var Oil_condiements = event.target.Oil.checked;
         var Powder_condiements = event.target.Powder.checked;
         var Salt_condiements = event.target.Salt.checked;
         var Sauce_condiements = event.target.Sauce.checked;
         var Sugar_condiements = event.target.Sugar.checked;
         var Yoghurt_condiements = event.target.Yoghurt.checked;

         var Chill_temperature = event.target.Chill.checked;
         var Cold_temperature = event.target.Cold.checked;
         var Frozen_temperature = event.target.Frozen.checked;
         var Hot_temperature = event.target.Hot.checked;
         var Warm_temperature = event.target.Warm.checked;

         Dishes.insert({
            /** user_id: user_id, this should be implemented after user account is available **/
            image_id: Session.get('image_id'),
            dish_name: dish_name,
            dish_description: dish_description,

            serving_option: serving_option,
            cooking_time: cooking_time,

            dish_cost: dish_cost,
            dish_selling_price: dish_selling_price,
            dish_profit: Session.get('dish_profit'),

            milk_allergy: milk_allergy,
            tree_nuts_allergy: tree_nuts_allergy,
            fish_allergy: fish_allergy,
            egg_allergy: egg_allergy,
            wheat_allergy: wheat_allergy,
            shellfish_allergy: shellfish_allergy,
            peanuts_allergy: peanuts_allergy,
            soy_allergy: soy_allergy,

            diabetic_preference: diabetic_preference,
            low_sodium_preference: low_sodium_preference,
            pescetartrian_preference: pescetartrian_preference,
            gluten_free_preference: gluten_free_preference,
            low_carb_preference: low_carb_preference,
            vegan_preference: vegan_preference,
            high_protein_preference: high_protein_preference,
            nuts_free_preference: nuts_free_preference,
            vegetarian_preference: vegetarian_preference,
            lactose_free_preference: lactose_free_preference,
            paleo_preference: paleo_preference,

            African_cuisine: African_cuisine,
            American_cuisine: American_cuisine,
            Australian_cuisine: Australian_cuisine,
            Chinese_cuisine: Chinese_cuisine,
            French_cuisine: French_cuisine,
            Fusion_cuisine: Fusion_cuisine,
            Indian_cuisine: Indian_cuisine,
            International_cuisine: International_cuisine,
            Italian_cuisine: Italian_cuisine,
            Japanese_cuisine: Japanese_cuisine,
            Korean_cuisine: Korean_cuisine,
            Mexican_cuisine: Mexican_cuisine,
            Nordic_cuisine: Nordic_cuisine,
            Portuguese_cuisine: Portuguese_cuisine,
            Southeast_Asian_cuisine: Southeast_Asian_cuisine,
            Spanish_cuisine: Spanish_cuisine,
            Taiwanese_cuisine: Taiwanese_cuisine,

            Beef_protein: Beef_protein,
            Chicken_protein: Chicken_protein,
            Egg_protein: Egg_protein,
            Fish_protein: Fish_protein,
            Lamb_protein: Lamb_protein,
            Pork_protein: Pork_protein,
            Seafood_protein: Seafood_protein,

            Bread_category: Bread_category,
            Burger_category: Burger_category,
            Cake_category: Cake_category,
            Curry_category: Curry_category,
            Dessert_category: Dessert_category,
            Noodles_category: Noodles_category,
            Pasta_category: Pasta_category,
            Pastry_category :Pastry_category,
            Porridge_category:Porridge_category,
            Rice_category :Rice_category,
            Salad_category: Salad_category,
            Sandwich_category: Sandwich_category,
            Soup_category: Soup_category,
            Vegan_category :Vegan_category,
            Vegetarian_category :Vegetarian_category,

            BBQ_method: BBQ_method,
            Braised_method: Braised_method,
            Deep_fried_method: Deep_fried_method,
            Poached_method: Poached_method,
            Roast_method: Roast_method,
            Smoked_method: Smoked_method,
            Sous_vide_method: Sous_vide_method,
            Steamed_method: Steamed_method,
            Stewed_method: Stewed_method,
            Stir_fried_method: Stir_fried_method,

            Bitter_taste: Bitter_taste,
            Cheesy_taste: Cheesy_taste,
            Floral_taste: Floral_taste,
            Heavy_taste: Heavy_taste,
            Hot_taste: Hot_taste,
            Salty_taste :Salty_taste,
            Savory_taste :Savory_taste,
            Smoky_taste :Smoky_taste,
            Sour_taste :Sour_taste,
            Spicy_taste :Spicy_taste,
            Sweet_taste: Sweet_taste,
            Tart_taste: Tart_taste,
            Umami_taste :Umami_taste,

            Dry_texture:Dry_texture,
            Mushy_texture:Mushy_texture,
            Moist_texture:Moist_texture,
            Gooey_texture:Gooey_texture,
            Greasy_texture:Greasy_texture,
            Oily_texture:Oily_texture,
            Crumbly_texture:Crumbly_texture,
            Creamy_texture:Creamy_texture,

            Beans_vegetable: Beans_vegetable,
            Flowers_buds_vegetable: Flowers_buds_vegetable,
            Fruits_vegetable: Fruits_vegetable,
            Grains_vegetable: Grains_vegetable,
            Herbs_vegetable: Herbs_vegetable,
            Melons_vegetable: Melons_vegetable,
            Root_vegetable: Root_vegetable,
            Salad_leaf_vegetable: Salad_leaf_vegetable,
            Squashes_vegetable: Squashes_vegetable,

            Butter_condiements: Butter_condiements,
            Cheese_condiements: Cheese_condiements,
            Cream_condiements: Cream_condiements,
            Dried_food_condiements: Dried_food_condiements,
            Dried_fruits_condiements: Dried_fruits_condiements,
            Dried_seafood_condiements: Dried_seafood_condiements,
            Dried_vegetables_condiements: Dried_vegetables_condiements,
            Dry_herbs_condiements: Dry_herbs_condiements,
            Flour_condiements: Flour_condiements,
            Jam_condiements: Jam_condiements,
            Oil_condiements: Oil_condiements,
            Powder_condiements: Powder_condiements,
            Salt_condiements: Salt_condiements,
            Sauce_condiements: Sauce_condiements,
            Sugar_condiements: Sugar_condiements,
            Yoghurt_condiements: Yoghurt_condiements,

            Chill_temperature: Chill_temperature,
            Cold_temperature: Cold_temperature,
            Frozen_temperature: Frozen_temperature,
            Hot_temperature: Hot_temperature,
            Warm_temperature: Warm_temperature,

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
         this.form.reset();
         Materialize.updateTextFields();
         return false;
    }
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

  proteins_list: [
    {name: 'Beef', id:'Beef' },
    {name: 'Chicken', id:'Chicken' },
    {name: 'Egg', id:'Egg' },
    {name: 'Fish', id:'Fish' },
    {name: 'Lamb', id:'Lamb' },
    {name: 'Pork', id:'Pork' },
    {name: 'Seafood', id:'Seafood' },
  ],

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
  ],

  cooking_method_list: [
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

 serving_temperature_list: [
    {name: 'Chill', id:'Chill'},
    {name: 'Cold', id:'Cold'},
    {name: 'Frozen', id:'Frozen'},
    {name: 'Hot', id:'Hot'},
    {name: 'Warm', id:'Warm'},
 ]

 });
