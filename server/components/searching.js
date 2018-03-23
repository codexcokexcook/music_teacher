import {
    Meteor
} from 'meteor/meteor';

import {
    HTTP
} from 'meteor/http'

Meteor.methods({
    'searching' (location, service, date, time) {
        HTTP.call( 'GET', 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyBxRWAwnS9h8pP1mF6sAa4ZnkqGYUPBGac', function( error, response ) {
            // Handle the error or response here.
            if (error) {
                console.log(error);
            } else {
                console.log(response);
            }
        });
    }
});