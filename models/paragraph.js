/**
 * Created by Prateek Sharma on 02/01/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid/v4');
var DAO = require('../dao/DAO')
var Async = require('async');

var paragraphSchema = new Schema({
    text: {type: String},
    eid: {type: String, unique: true},
    postEid: {type: String},
    created: {type: Number},
    comments : {type: [String]},
    isDeleted: {type: Boolean, default: false}
});

var paragraph = mongoose.model('paragraph', paragraphSchema);
module.exports = {
    createNewParagraph: function (textArray, postEid, callbackMain) {
        var paraData = [];
        textArray.forEach(function (paraString) {
            var current = new Date();
            var para = {
                text: paraString,
                eid: uuid(),
                postEid: postEid,
                created: current.getTime()
            };
            paraData.push(para);
        });
        DAO.bulkSave(paragraph, paraData, callbackMain);
    },
    findByIdForCollection: function (paragraphEidsArray, callbackMain) {
        Async.waterfall([
            function (callback) {
                DAO.getData(paragraph, {eid: {$in: paragraphEidsArray}, isDeleted: false}, {}, {lean: true, limit: paragraphEidsArray.length}, callback)
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
    addCommentEid: function (commentEid, paraEid, callbackMain) {
        Async.waterfall([
            function (callback) {
                DAO.updateData(paragraph, {eid: paraEid}, {$push: {comments: commentEid}}, callbackMain);
            }
        ], function (err, success) {
            if (err) {
                callbackMain(err)
            }
            else {
                callbackMain(null, success);
            }
        })
    }
}