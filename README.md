# For start server<br>
    -npm install<br>
    -npm start

Endpoints
#####

# •Authentication module:<br>
    –POST - /api/auth/register- registration of a new user, required parameters are[login, password, fullName, email, avatar]<br>
    –POST - /api/auth/login - log in user, required parameters are [login, password]. Only users with a confirmed email can sign in<br>
    –POST - /api/auth/logout - log out authorized user–POST - /api/auth/password-reset- send a reset link to user email, requiredparameter is [email]<br>
    -GET - /api/auth/regresh - refresh token<br>
# •User module:<br>
    –GET - /api/users- get all users<br>
    –GET - /api/users/<user_id>- get specified user data<br>
    –POST - /api/users- create a new user, required parameters are [login, password, email, role]. This feature must be accessible only for admins<br>
    –PATCH - /api/users/avatar- upload user avatar<br>
    –PATCH - /api/users/<user_id>- update user data<br>
    –DELETE - /api/users/<user_id>- delete user<br>
# •Post module:<br>
    –GET - /api/posts- get all posts.This endpoint doesn't require any role, it ispublic. If there are too many posts, you must implement pagination. Page size isup to you
    –GET - /api/posts/<post_id>- get specified post data.Endpoint is public
    –GET - /api/posts/<post_id>/comments- get all comments for the specified post.Endpoint is public
    –POST - /api/posts/<post_id>/comments- create a new comment, required parameteris [content]
    –GET - /api/posts/<post_id>/categories- get all categories associated with thespecified post
    –GET - /api/posts/<post_id>/like- get all likes under the specified post–POST - /api/posts/- create a new post, required parameters are [title, content,categories]
    –POST - /api/posts/<post_id>/like- create a new like under a post
    –PATCH - /api/posts/<post_id>- update the specified post (its title, body orcategory). It's accessible only for the creator of the post
    –DELETE - /api/posts/<post_id>- delete a post
    –DELETE - /api/posts/<post_id>/like- delete a like under a post
# •Categories module:
    –GET - /api/categories- get all categories
    -GET - /api/categories/<category_id>- get specified category data
    –GET - /api/categories/<category_id>/posts- get all posts associated with thespecified category
    –POST - /api/categories- create a new category, required parameter is [title]
    –PATCH - /api/categories/<category_id>- update specified category data
    –DELETE - /api/categories/<category_id>- delete a category
# •Comments module:
    –GET - /api/comments/<comment_id>- get specified comment data
    –GET - /api/comments/<comment_id>/like- get all likes under the specifiedcomment
    –POST - /api/comments/<comment_id>/like- create a new like under a comment
    –PATCH - /api/comments/<comment_id>- update specified comment data
    –DELETE - /api/comments/<comment_id>- delete a comment
    –DELETE - /api/comments/<comment_id>/like- delete a like under a comment
