# blog
backend APIS for simple blogging platform

 1) Install node.js(6.9.2) and mongoDB on your system.
 2) Run "npm install" for installing all the dependencies
 3) Enter mongoDB urls and ports in config.json
 4) Run server.js file using node
 5) Enjoy Blogging


 **API Details:**

 `"/admin/submitPost"`: This POST API adds new post to the blog. You need to separate all the paragraphs and send them in
                        array. Following are the parameters to be sent:
                        "title": Title of the blog,
                        "textArray": "Stringified array of all the paragraphs in the blog".

 `"/user/addcomment"`: This POST API add new comment to the particular paragraph of a particular post. Following are the
                        parameters to be sent:
                        "text": "The text of comment",
                        "postEid": "The eid of the post with which it is associated",
                        "paraEid": "The eid of the paragrapth with which it is associated".

 `"/user/fetchPost"`: This GET API displays all the posts with mendatory 'skip' and 'limit' query params. It returns the next and
                      prev url. You can fetch posts from the 'posts' key. Each post entity has a 'paragraphs' key associated
                      with it and you can find the details of the paragaraphs from paragraphs key.

 `"/user/fetchPostDetails"`: This GET API displays all the details of a post by accepting a mandatory 'postEid' query param.

 `"/user/getAllPostCount"`: This GET API returns the total number of posts in the blog.