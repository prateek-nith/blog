/**
 * Created by Prateek Sharma on 02/01/17.
 */
var controller = require('../controllers/controllers');
var Joi = require('joi');
var Constants = require('../utilities/constants')

var submitPost = {
    method: "POST",
    path: "/admin/submitPost",
    config: {
        description: "Submit post",
        tags: ["api"],
        handler: function (request, reply) {
            var data = request.payload;
            controller.addNewPost(data, function (err, success) {
                if (err) {
                    reply(err).code(err.details.code);
                }
                else {
                    reply(success).code(success.details.code);
                }
            })
        },
        validate: {
            payload: {
                title: Joi.string().required(),
                textArray: Joi.string().required()
            }
        }
    }
};


var fetchDetails = {
    method: "GET",
    path: "/user/fetchPost",
    config: {
        description: "Fetch details",
        tags: ["api"],
        handler: function (request, reply) {
            var data = request.query;
            data.url = request.info.host + request.path;
            controller.postDetails(data,  function (err, success) {
                if (err) {
                    reply(err).code(err.details.code);
                }
                else {
                    reply(success).code(success.details.code);
                }
            })
        },
        validate: {
            query: {
                skip: Joi.string().required(),
                limit: Joi.string().required()
            }
        }
    }
}

var fetchPostDetails = {
    method: "GET",
    path: "/user/fetchPostDetails",
    config: {
        description: "Fetch details",
        tags: ["api"],
        handler: function (request, reply) {
            var queryParams = request.query;
            controller.allPostDetails(queryParams,  function (err, success) {
                if (err) {
                    reply(err).code(err.details.code);
                }
                else {
                    reply(success).code(success.details.code);
                }
            })
        },
        validate: {
            query: {
                postEid: Joi.string().required()
            }
        }
    }
}

var addCommentToPost = {
    method: "POST",
    path: "/user/addcomment",
    config: {
        description: "Add Comment To Post",
        tags: ["api"],
        handler: function (request, reply) {
            var data = request.payload;
            controller.addComment(data, function (err, success) {
                if (err) {
                    reply(err).code(err.details.code);
                }
                else {
                    reply(success).code(success.details.code);
                }
            })
        },
        validate: {
            payload: {
                text: Joi.string().required(),
                postEid: Joi.string().required(),
                paraEid: Joi.string().required()
            }
        }
    }
};

var getAllPostsCount = {
    method: "GET",
    path: "/user/getAllPostCount",
    config: {
        description: "Fetch details",
        tags: ["api"],
        handler: function (request, reply) {
            controller.getAllPostsCount( function (err, success) {
                if (err) {
                    reply(err).code(err.details.code);
                }
                else {
                    reply(success).code(success.details.code);
                }
            })
        }
    }
}

module.exports = [submitPost, fetchDetails, fetchPostDetails, addCommentToPost, getAllPostsCount];