/**
 * Created by Prateek Sharma on 02/01/17.
 */
var constants  = require('../utilities/constants');
exports.insertData = function(model, data, callback){
    new model(data).save(function(err, resultData){
        if(err){
            var response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else{
            var result = resultData.toObject();
            callback(null, result);
        }
    })
};

exports.bulkSave = function (model, data, callback) {
    model.insertMany(data, function(err, resultData){
        if(err) {
            var response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else {
            var result = resultData;
            callback(null, result);
        }
    })
}

exports.getData = function(model, query, projection, options, callback){
    model.find(query, projection, options, function(err, data){
        if(err){
            var response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else{
            callback(null, data);
        }
    })
};

exports.updateData = function(model, condition, data, options, callback){
    var response;
    model.update(condition, data, options, function(err, data){
        if(err){
            response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else if (!data||data.n==0|| data.nModified == 0){
            response = {
                details: constants.responses.NO_DATA,
                errorDetails: err,
                data: {}
            };
            callback(response);

        }
        else{
            callback(null, data);
        }
    })
};

exports.deleteData = function (model, conditions, callback) {
    model.remove(conditions, function (err, removed) {
        var errResponse,response;
        if (err) {
            response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else if (!removed) {
            response = {
                details: constants.responses.NO_DATA,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else {
            callback(null);
        }
    });
};

exports.aggregateData = function (model, group, callback) {
    model.aggregate(group, function (err, data) {

        if (err) {
            var response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else {
            callback(null, data);
        }
    });
};

exports.getDataWithReferenceFixed = function (model, query, projection, options, collectionOptions, callback) {
    model.find(query, projection, options).populate(collectionOptions).exec(function (err, data) {

        if (err) {
            console.log(err);
            var response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else {

            callback(null, data);
        }
    });
};

exports.updateDataTrandional = function(model, condition, data, options, callback){
    var response;
    model.update(condition, data, options, function(err, data){
        if(err){
            response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                errorDetails: err,
                data: {}
            };
            callback(response);
        }
        else{
            callback(null, data);
        }
    })
};

exports.getCount = function (model, condition, callback) {
    model.count(condition, function (error, count) {
        if (error) {
            console.log("Error Get Count: ", error);
            var response = {
                details: constants.responses.ERROR_IN_EXECUTION,
                data: {},
                errorDetails: error
            };

            return callback(response);
        }
        return callback(null, count);
    })
};

function PlaneObject(mongooseObject) {
    for (var key in mongooseObject) {
        if (mongooseObject.hasOwnProperty(key)) {
            this[key] = mongooseObject[key];
        }
    }
}
