import { Meteor } from 'meteor/meteor';

Dishes = new Mongo.Collection('dishes');
Ingredients = new Mongo.Collection('ingredients');
Images = new FilesCollection({
  storagePath: () => {
      return process.env.PWD + '/public/dishes_upload/';
  },
  collectionName: 'Images',
  allowClientCode: false, 
  onBeforeUpload(file) {

    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

Meteor.startup(() => {

});

Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});