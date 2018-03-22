import {
    Meteor
} from 'meteor/meteor';

import {
    HTTP
} from 'meteor/http'

Meteor.methods({
    'searching' (lat, lng, service, date, time) {

        console.log(lat)
        console.log(lng)
        console.log(service);
        console.log(date);
        console.log(time);

        var searchingQuery = [];
        let nation = 'vietnam';
        let region = 'VN';
        let radius = 1 / 6378.1
        //- check existance
        if(lat && lng)
        {
            searchingQuery.push({kitchen_address_conversion: {"$geoWithin": {"$centerSphere": [[lng, lat], radius]}}});
        }
        console.log('serving_option', service.length);
        console.log(service)
        if(!_.isEmpty(service))
        {
            searchingQuery.push({serving_option: service});
        }else{
            searchingQuery.push({serving_option: null});
        }

        console.log('search result', searchingQuery)

        //- spliting the the createdAt
        if(!_.isEmpty(date.trim()))
        {
            searchingQuery.push({createdAt: date});
        }

        if(!_.isEmpty(time.trim()))
        {
            searchingQuery.push({});
        }

        //- matching with database and save kitchen result to a/an list/array
        //- distance & average rating
        //- search using or
        var searched_kitchen = Kitchen_details.find({
            '$and': [
                { '$or': searchingQuery },
                // { average_rating: {'$range': [3.0, 5.0]} } 
            ]
        }).fetch();

        var searched_kitchen = Kitchen_details.find({
            '$or': searchingQuery
        }).fetch();


        //- search using and
        // var searched_kitchen = Kitchen_details.find({
        //     '$and':[
        //         searchingQuery.push({kitchen_address_conversion: {"$geoWithin": {"$centerSphere": [[106.704823, 10.483296], radius]}}}),
        //         { '$or' : searchingQuery }
        //     ]
        // }).fetch();

        
        // var searched_kitchen = Kitchen_details.find({
        //         kitchen_address_conversion: {"$geoWithin": {"$centerSphere": [[106.704823, 10.783296], radius]}}
        // }).fetch();

        // var searched_kitchen = Kitchen_details.find({
        //     kitchen_address_conversion: {"$geoWithin": {"$centerSphere": [[106.704823, 10.783296], 1/6371]}}
        //   }).fetch();
        console.log('search results: ', searched_kitchen)
        

        // Menu.find({
        //     '$or' : [ 
        //     { 'field1':{'$regex':searchString} },
        //     { 'field2':{'$regex':searchString} },
        //     { 'field3':{'$regex':searchString} }, ]
        // });

        // Kitchen_details.find({
        //     '$or': searchingQuery
        // });

        // db.inventory.find( {
        //     $and : [
        //         { $or : [ { price : 0.99 }, { price : 1.99 } ] },
        //         { $or : [ { sale : true }, { qty : { $lt : 20 } } ] }
        //     ]
        // } )

        //- searching
        console.log('location', typeof(location));
        console.log('service', typeof(service));
        console.log('date', typeof(date));
        console.log('time', typeof(time));
        return 'ok';

    }
});