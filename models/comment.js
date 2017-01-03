/**
 * Created by Prateek Sharma on 02/01/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Async = require("async");
var uuid = require('uuid/v4');
var DAO = require("../dao/DAO");
var Para = require("./paragraph");

var commentSchema = new Schema({
    text: {type: String},
    eid: {type: String, unique: true},
    paragraphEid: {type: String},
    postEid: {type: String},
    created: {type: Number},
    isDeleted: {type: Boolean, default: false}
});

var comment = mongoose.model('comment', commentSchema);

module.exports = {
    addComment : function (text, postEid, paraEid, callbackMain) {
        var response = null;
        Async.waterfall([
            function (callback) {
                var current = new Date();
                var data = {
                    text: text,
                    eid: uuid(),
                    paragraphEid: paraEid,
                    postEid: postEid,
                    created: current.getTime()
                };
                DAO.insertData(comment, data, callback);
            },
            function (funcData, callback) {
                delete  funcData.__v;
                delete  funcData._id;
                delete  funcData.isDeleted;
                response = funcData;
                var commentEid = response["eid"];
                Para.addCommentEid(commentEid, paraEid, callback);
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
    findByIdForCollection: function (commentEids, callbackMain) {
        Async.waterfall([
            function (callback) {
                DAO.getData(comment, {eid: {$in: commentEids}, isDeleted: false}, {}, {lean: true, limit: commentEids.length}, callback);
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