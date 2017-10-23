Dishes = new Mongo.Collection('dishes');
Ingredients_temporary = new Mongo.Collection(null);
Ingredients = new Mongo.Collection('ingredients');
Menu = new Mongo.Collection('menu');
Messages = new Mongo.Collection('messages');

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
  'Images': Images
}

Template.registerHelper(
  'find', (collection) => {
    return Collections[collection].find()
  }
)

Template.registerHelper(
  'profile_images', () => {
    var get_profile_images = Profile_images.findOne({'userId': Meteor.userId(),'meta':{"purpose": "profile_picture"}});

    var get_profile_images_id = get_profile_images && get_profile_images._id;

    var get_profile_images_ext = get_profile_images && get_profile_images.extensionWithDot;

    var get_profile_images_name = get_profile_images_id + get_profile_images_ext;

    return get_profile_images_name;
  }

);
