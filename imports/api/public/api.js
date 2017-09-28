import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';

Picker.middleware(bodyParser,json());

Picker.route('/api/webhooks/:provider', ({provider}, request, response) => {
    response.statusCode = 200;
    response.send(JSON,stringify({"displayText": "hello baby"}))
    response.end(result);
  });
