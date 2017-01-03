/**
 * Created by Prateek Sharma on 02/01/17.
 */
var responses = {
    'BAD_REQUEST': {
        message: 'Bad request',
        code: 400
    },
    'INTERNAL_SERVER_ERROR': {
        message: 'Internal server error',
        code: 500
    },
    'ERROR_IN_EXECUTION':{
        message: 'Error in execution',
        code: 400
    },
    'POST_NOT_FOUND':{
        message: 'This post does not exit',
        code: 404
    },
    "NO_MORE_POSTS": {
        message: "No more posts available",
        code: 404
    },
    'NO_DATA': {
        message: "No data found",
        code: 404
    },
    'DATA_UPDATED': {
        message: 'Data updated',
        code: 200
    },
    'DATA_FOUND': {
        message: 'Data Found',
        code: 200
    },
    'POST_ADDED': {
        message: "Post added",
        code: 200
    },
    'COMMENT_ADDED': {
        message: "Comment added",
        code: 200
    }
}

module.exports.responses = responses;