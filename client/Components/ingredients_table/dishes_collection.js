Template.dishes_collection.onRendered(function(){
  this.$('select').material_select();
});


Template.dishes_collection.helpers({
'helper1':function(){
return Dishes.find();
}
});
