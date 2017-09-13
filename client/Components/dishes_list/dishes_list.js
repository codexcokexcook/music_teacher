import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Template.dishes_list.helpers ({
  'dishes_item': function () {
      return Dishes.find();
  }
});

Template.dishes_card.helpers ({
  'get_image_extension': function () {
    var extract_dish = Dishes.findOne({"image_id":this.image_id});
    var extract_image_id = extract_dish.image_id;
    var refer_image_id = Images.findOne({"_id":extract_image_id});
    var get_image_extension = refer_image_id && refer_image_id.extensionWithDot;
    return get_image_extension;
  }
});

Template.ingredients_loop.helpers ({
  'get_ingredients': function () {
    var extract_dish = Dishes.findOne({"dish_name":this.dish_name});
    var extract_dish_name = extract_dish.dish_name;
    return Ingredients.find({"dish_name":extract_dish_name});
  }
});

/*Template.allergy_tags.helpers ({
  'extract_allergy_tags': function() {
    var extract_dish = Dishes.find({"dish_name":this.dish_name});
    var extract_allergy_tags = extract_dish.allergy_tags
    /* .map(function(item){
      return item.value;
    });
  }
});

Template.allergy_tags.onRendered(function(){
  $('.chips-initial').material_chip({
    data:[{tag: this.extract_allergy_tags}]
  });
}); */
