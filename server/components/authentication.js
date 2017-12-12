// check the user with email address is already in db or not
Meteor.methods({
    'checkIfUserExists': function (email) {
        return (Meteor.users.findOne({'emails.0.address': email})) ? true : false;
    }
});

// remove existed user when check it already existed in db
Meteor.methods({
    'removeExistedUser': function (id) {
        return (Meteor.users.remove({_id: id})) ? true : false;
    }
})
