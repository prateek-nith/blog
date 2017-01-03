/**
 * Created by Prateek Sharma on 02/01/17.
 */
var Hapi = require("hapi");
var routes = require("./routes/routes")
var config = require("./config.json")
var plugins = require('./plugins');

var server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                origin: ['*'],
                headers: ['X-Requested-With', 'Content-Type']
            }
        }
    }
});

server.connection({
    port: process.env.PORT ||  config.dev.appPort
});

server.register(plugins.pluginsArray, function (err) {
    if (err) {
        console.log(err);
        throw err;
    }
    routes.forEach(function (route) {
        server.route(route);
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply("hello")
        }
    });
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});



/*server.on('response', function (request) {
    console.log('Request payload:', request.payload);
    console.log('Response payload:', request.response.source);
});*/
