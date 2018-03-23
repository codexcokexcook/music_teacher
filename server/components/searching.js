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
        let isToday = true
        let searched_results = []
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

        console.log('kitchen detail data', typeof(Kitchen_details.find().fetch()[0].createdAt))

        //- query on Dish
        //- time start is today
        //- search by date
        console.log('=>>>>>>>>>>>>>>>>> client date send: ', date);
        if(!_.isEmpty(date.trim()))
        {
            //- get current time and show
            let currDateTime = new Date().toLocaleString(); //- "09/08/2014, 2:35:56 AM"
            let currTime = currDateTime.split(' ')[1];
            let finalDate = new Date(date+' ' + currTime)
            console.log('current date time', currDateTime)
            console.log('current time', currTime);
            console.log('final date time', new Date(date+' ' + currTime));
            // searchingQuery.push({createdAt: date});
        }

        console.log('is date format: ', _.isDate(time));

        //- search by time
        if(_.isDate(time))
        {   
            let dateTimeBetween = getDateTimeBetweenTwoDateTimes(new Date(), time) //- minutes or hours + minutes
            //- convert to minutes
            let minutes = (dateTimeBetween.hours * 60) + dateTimeBetween.minutes;
            console.log('minute between', minutes);
            //- check if the time is in the future
            if(minutes > 0)
            {
                console.log(minutes - 15)
                console.log(minutes + 30)
                let up = minutes - 15;
                let down = minutes + 30;
                //- query here
                var dish_search = Dishes.find({
                    'cooking_time': {
                        // '$gte': up, //- sớm hơn 15 phút
                        '$lte': down  //- trễ hơn 30 phút
                    }
                }).fetch();

                console.log('time results: ' ,  dish_search);
                //======== 1 list
            }
            console.log('minutes range: ', minutes)
        }

        //- if date and time is not missing
        if(!_.isEmpty(date.trim()) && _.isDate(time))
        {
            let datetime = stringToDate(date, "yyyy-mm-dd", "-");
            let dateTimeBetween = getDateTimeBetweenTwoDateTimes(new Date(), datetime) //- minutes or hours + minutes
            // console.log(datetime);
            // console.log('date time between two days', dateTimeBetween)
            //- convert to minutes
            let minutes = (dateTimeBetween.hours * 60) + dateTimeBetween.minutes;
            console.log('minute between two days: ', minutes);
            if(minutes > 0)
            {
                let up = minutes - 15;
                let down = minutes + 30;
                //- query here
                var dish_search = Dishes.find({
                    'cooking_time': {
                        // '$gte': up, //- sớm hơn 15 phút
                        '$lte': down  //- trễ hơn 30 phút
                    }
                }).fetch();

                console.log('date + time results: ' ,  dish_search);
                //- push to result
                searched_results = _.union(searched_results, dish_search)
                console.log('searched_results', searched_results)
            }

            console.log(datetime)

        }

        //- matching with database and save kitchen result to a/an list/array
        //- distance & average rating
        //- search using or
        // var searched_kitchen = Kitchen_details.find({
        //     '$and': [
        //         { '$or': searchingQuery },
        //         // { average_rating: {'$range': [3.0, 5.0]} } 
        //     ]
        // }).fetch();

        searched_results = Kitchen_details.find({
            '$or': searchingQuery
        }, {
            sort:{average_rating: -1}
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
        console.log('search results: ', searched_results)
        

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

let getDateTimeBetweenTwoDateTimes = function (currentDate, futureDate)
{
    let returned_data = {};
    let milliBetween = futureDate - currentDate;
    console.log('millisecond between: ', milliBetween)
    
    let dayBetween = Math.floor(milliBetween / 86400000); // days
    let hourBetween = Math.floor((milliBetween % 86400000) / 3600000); // hours
    let minuteBetween = Math.round(((milliBetween % 86400000) % 3600000) / 60000)
    
    //- add to object to return
    returned_data.days = dayBetween
    returned_data.hours = hourBetween
    returned_data.minutes = minuteBetween

    return returned_data;
}

let currentDateAndTime = function () 
{
    let returned_data = {};
    let currDateTime = new Date().toLocaleString(); //- "09/08/2014, 2:35:56 AM"
    //- get date
    let currDate = currDateTime.split(' ')[0].slice(0, - 1)
    //- get time
    let currTime = currDateTime.split(' ')[1]; 

    //- add to object
    returned_data.date = currDate;
    returned_data.time = currTime;
    return returned_data;
}

let convertFromStringToDateTime = function (date, time)
{
    return new Date(date + ' ' + time)
}

let convertHourToMinutes = function (hour)
{
    return hour*60
}

let convertDayToMinutes = function (day)
{
    return day*24*60
}

let stringToDate = function (_date,_format,_delimiter)
{
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
}