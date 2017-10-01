import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';


Picker.middleware(bodyParser.json());

Picker.route('/api/webhooks/apiai', function( params, request, response, next ) {
  var getDocument = 'intruding your website!!';
console.log(request);

  if ( getDocument ) {
    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 200;
    response.end( JSON.stringify({ "speech": getDocument, "displayText": getDocument }) );
  } else {
    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 404;
    response.end( JSON.stringify( { error: 404, message: "Document not found." } ) );
  }
});
