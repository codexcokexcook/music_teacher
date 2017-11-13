Template.dishes_collection.onRendered(function(){
  this.$('select').material_select();
});


Template.dishes_collection.helpers({
    'dishes':function(){
        return Dishes.find();
    }
});

Template.Ingredients_table.helpers({
    'ingredient':function(){
        var selected_dish_name = Session.get('selected_dish_name');
        return Ingredients.find({dish_name: selected_dish_name});
    }
});

Template.dishes_collection.events({
    'click .radio_button':function(){
        var selected_dish_name=this.dish_name;
        Session.set('selected_dish_name', selected_dish_name);
    }
});
