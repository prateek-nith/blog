/**
 * Created by Prateek Sharma on 02/01/17.
 */
var config = require('./config');
var pack = require('./package'),
    HapiMongoose = require('hapi-mongoose-db-connector');

var mongoURL;
if (process.env.NODE_ENV == 'dev') {
    mongoURL = config.dev.mongoDBURL
} else {
    mongoURL = config.prod.mongoDBURL;
}

console.log(mongoURL)
var pluginsArray = [
    {
        register: HapiMongoose,
        options: {
            mongodbUrl: mongoURL
        }
    }
];
exports.pluginsArray = pluginsArray;