// check the user with email address is already in db or not
Meteor.methods({
    'checkIfUserExists': function (email) {
        return (Meteor.users.findOne({'emails.0.address': email})) ? true : false;
    }
});

Meteor.methods({
    'getUserProfileByID': function() {
        return (Kitchen_details.findOne({'user_id': Meteor.userId()}));
    }
})
