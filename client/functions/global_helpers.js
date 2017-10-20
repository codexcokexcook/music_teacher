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
  });
