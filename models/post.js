/**
 * Created by Prateek Sharma on 02/01/17.
 */
var mongoose = require('mongoose');
var uuid = require('uuid/v4');
var Schema = mongoose.Schema;
var Async = require('async');
var DAO = require('../dao/DAO')
var Para = require("./paragraph")

var postSchema = new Schema({
    title: {type: String},
    eid: {type: String, unique: true},
    paragraphs: {type: [String]},
    created: {type: Number},
    update: {type: Number},
    isDeleted: {type: Boolean, default: false}
});

var post = mongoose.model('post', postSchema);

module.exports = {
    createNewPost : function (title, textArray, callbackMain) {
        var postEid = uuid();
        var data = {};
        var paraDet = {};
        Async.waterfall([
            function(callback) {
                if (textArray == null || textArray.length < 1) {
                    callback(null, {});
                }
                else {
                    Para.createNewParagraph(textArray, postEid, callback);
                }
            },
            function (funcData, callback) {
                var current = new Date();
                var paraEids = [];
                funcData.forEach(function (para) {
                    var paraEid = para.eid;
                    paraEids.push(paraEid);
                    paraDet[paraEid] = para;
                });
                data = {
                    title : title,
                    eid: postEid,
                    created: current.getTime(),
                    paragraphs: paraEids,
                    det: paraDet
                };
                DAO.insertData(post, data, callback);
            },
            function (funcData, callback) {
                data["det"] = paraDet;
                callback(null, data);
            }
        ], function (err, success) {
            if (err) {
                callbackMain(err)
            }
            else {
                callbackMain(null, success);
            }
        })
    },

    findPostById: function (postEid, callbackMain) {
        Async.waterfall([
            function (callback) {
                DAO.getData(post, {eid: postEid, isDeleted: false}, {}, {lean: true, limit: 1}, callback);
            }
        ], function (err, success) {
            if (err) {
                callbackMain(err);
            }
            else {
                callbackMain(null, success);
            }
        })
    },

    getPosts: function (skip, limit, query, callbackMain) {
        Async.waterfall([
            function (callback) {
                DAO.getData(post, query, {}, {skip: skip, limit:limit, lean: true}, callback);
            }
        ], function (err, success) {
            if (err) {
                callbackMain(err);
            }
            else {
                callbackMain(null, success);
            }
        })
    },

    getAllPostCount: function (callbackMain) {
        Async.waterfall([
            function (callback) {
                DAO.getCount(post, {isDeleted: false}, callback)
            }
        ], function (err, success) {
            if (err) {
                callbackMain(err);
            }
            else {
                callbackMain(null, success);
            }
        })
    }
}