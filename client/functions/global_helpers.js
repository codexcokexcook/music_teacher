Dishes = new Mongo.Collection('dishes');
Ingredients_temporary = new Mongo.Collection(null);
Ingredients = new Mongo.Collection('ingredients');
Menu = new Mongo.Collection('menu');
Messages = new Mongo.Collection('messages');
Shopping_cart = new Mongo.Collection('shopping_cart');
Transaction = new Mongo.Collection('transaction');
Profile_details = new Mongo.Collection('profile_details');
Kitchen_details = new Mongo.Collection('kitchen_details');

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

Collections = {
  'Dishes': Dishes,
  'Ingredients': Ingredients,
  'Menu': Menu,
  'Messages': Messages,
  'Images': Images,
  'Shopping_cart': Shopping_cart,
  'Transaction': Transaction,
  'Profile_details': Profile_details,
  'Kitchen_details': Kitchen_details
}

Template.registerHelper(
  'find', (collection) => {
    return Collections[collection].find();
  },
);


Template.registerHelper(
  'profile_images', (type) => {
    // check whether we display user own profile image or other profile images
    if (Session.get('user_id') || Session.get('user_id'==="")) {
      var user_id = Session.get('user_id');
    } else {
      var user_id = Meteor.userId();
    }
    var get_profile_images = profile_images.findOne({'userId': user_id,'meta':{"purpose": type}});
    var get_profile_images_id = get_profile_images && get_profile_images._id;
    var get_profile_images_ext = get_profile_images && get_profile_images.extensionWithDot;
    var get_profile_images_name = get_profile_images_id + get_profile_images_ext;
    return get_profile_images_name;
  }
);


Template.registerHelper(
  'get_profile_details', (userId) => {
    var get_profile_details = Profile_details.findOne({'userId': userId});
    return get_profile_details;
  }
);


Template.registerHelper(
  'get_kitchen_details', (userId) => {
    var get_kitchen_details = Kitchen_details.findOne({'userId': userId});
    return get_kitchen_details;
  }
);
