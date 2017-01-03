/**
 * Created by Prateek Sharma on 02/01/17.
 */
var Async = require("async");
var Conf = require("../config");
var Post = require("../models/post");
var Comment = require("../models/comment");
var Paragraph = require("../models/paragraph");
var Constants = require("../utilities/constants")

exports.addNewPost = function (data, callbackRoute) {
    Async.waterfall([
        function (callback) {
            Post.createNewPost(data.title, JSON.parse(data.textArray), callback);
        },
        function (funcData, callback) {
            var success = {
                details: Constants.responses.POST_ADDED,
                data: funcData
            };
            callback(null, success);
        }
    ], function (err, success) {
        if (err) {
            callbackRoute(err);
        }
        else {
            callbackRoute(null, success);
        }
    })
};

exports.addComment = function (data, callbackRoute) {
    Async.waterfall([
        function (callback) {
            Comment.addComment(data.text, data.blogEid, data.paraEid, callback);
        },
        function (funcData, callback) {
            var success = {
                details: Constants.responses.COMMENT_ADDED,
                data: funcData
            };
            callback(null, success);
        }
    ], function (err, success) {
        if (err) {
            callbackRoute(err);
        }
        else {
            callbackRoute(null, success)
        }
    })
}

exports.postDetails = function (data, callbackRoute) {
    var response = {
        posts: {},
        paragraphs: {}
    };
    var skip = Number(data.skip);
    var limit = Number(data.limit);
    var sendNext = true;
    Async.waterfall([
        function (callback) {
            Post.getPosts(skip, limit, {isDeleted: false}, callback);
        },
        function (funcData, callback) {
            if (funcData == null || typeof funcData == 'undefined' || funcData.length == 0) {
                var err = {
                    details: Constants.responses.NO_MORE_POSTS,
                    data: {}
                };
                callback(err);
            }
            else {
                var paragraphEids = [];
                funcData.forEach(function(post){
                    delete post.__v;
                    delete post._id;
                    delete post.isDeleted;
                    var paragraphs = post["paragraphs"]
                    paragraphEids = paragraphEids.concat(paragraphs);
                    response.posts[post["eid"]] = post;
                });
                if (funcData.length < Number(data.limit)) {
                    sendNext = false;
                }
                Paragraph.findByIdForCollection(paragraphEids, callback)
            }
        },
        function (funcData, callback) {
            var commentEids = [];
            funcData.forEach(function (para) {
                delete para.__v;
                delete para.isDeleted;
                delete para._id;
                response.paragraphs[para["eid"]] = para;
                var paraComments = para["comments"];
                if (paraComments != null && typeof paraComments != 'undefined') {
                    commentEids = commentEids.concat(paraComments)
                }
            });
            if (sendNext) {
                var skip_ = skip + limit;
                response.next = data.url + "?skip=" + skip_ + "&limit=" + limit;
            }
            if (skip >= limit) {
                var skip__ = skip - limit;
                response.prev =  data.url + "?skip=" + skip__ + "&limit=" + limit;
            }
            var success = {
                details: Constants.responses.DATA_UPDATED,
                data: response
            };
            callback(null, success);
        }
    ], function (err, success) {
        if (err) {
            callbackRoute(err);
        }
        else {
            callbackRoute(null, success)
        }
    })
}


exports.allPostDetails = function (data, callbackRoute) {
    var response = {
        paragraphs: {},
        comments: {}
    };
    Async.waterfall([
        function (callback) {
            Post.findPostById(data.postEid, callback);
        },
        function (funcData, callback) {
            if (funcData == null || typeof funcData == 'undefined' || funcData.length == 0) {
                var err = {
                    details: Constants.responses.NO_DATA,
                    data: {}
                };
                callback(err);
            }
            else {
                var post = funcData[0];
                delete post.__v;
                delete post._id;
                delete post.isDeleted;
                var paragraphs = post.paragraphs;
                if (paragraphs == null || typeof paragraphs == 'undefined' || paragraphs.length == 0) {
                    var err_2 = {
                        details: Constants.responses.NO_DATA,
                        data: {}
                    };
                    callback(err_2);
                }
                else {
                    Paragraph.findByIdForCollection(paragraphs, callback)
                }
            }
        },
        function (funcData, callback) {
            var commentEids = [];
            funcData.forEach(function (para) {
                delete para.__v;
                delete para.isDeleted;
                delete para._id;
                response.paragraphs[para["eid"]] = para;
                var paraComments = para["comments"];
                if (paraComments != null && typeof paraComments != 'undefined') {
                    commentEids = commentEids.concat(paraComments)
                }
            });
            Comment.findByIdForCollection(commentEids, callback);
        },
        function (funcData, callback) {
            funcData.forEach(function (comment) {
                delete comment.__v;
                delete comment._id;
                delete comment.isDeleted;
                response.comments[comment["eid"]] = comment;
            });
            var success = {
                details: Constants.responses.DATA_UPDATED,
                data: response
            };
            callback(null, success);
        }
    ], function (err, success) {
        if (err) {
            callbackRoute(err);
        }
        else {
            callbackRoute(null, success)
        }
    })
};

exports.getAllPostsCount = function (callbackRoute) {
    Async.waterfall([
        function (callback) {
            Post.getAllPostCount(callback);
        },
        function (count, callback) {
            var success = {
                details: Constants.responses.DATA_UPDATED,
                data: {
                    count: count
                }
            };
            callback(null, success);
        }
    ], function (err, success) {
        if (err) {
            callbackRoute(err);
        }
        else {
            callbackRoute(null, success)
        }
    })
}
