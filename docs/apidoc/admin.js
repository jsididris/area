/**
 * @api {get} /admin/user/:id Gets information about the user
 * @apiParam {Uint} id Id of the user in the database.
 * @apiName UserInfo
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} id Id of the user in the database.
 * @apiSuccess {String} email Email of the user.
 * @apiSuccess {String} username Username of the user.
 * @apiSuccess {String} password Password of the user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 4242,
 *        "email": "dems@epitech.eu",
 *        "username": "dems"
 *     }
 * 
 * @apiError (401) UserNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

 /**
 * @api {put} admin/user/:id Update user profile
 * @apiParam {Uint} id Id of the user in the database.
 * @apiName UserInfoUpdate
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiParam {Uint} id Id of the user in the database.
 * @apiParam {String} email New email or the old one if you don't want to update it.
 * @apiParam {String} username New username or the old one if you don't want to update it.
 * @apiParam {String} password Password of the user.
 * 
 * @apiSuccess {Uint} id Id of the user in the database.
 * @apiSuccess {String} email Email of the user.
 * @apiSuccess {String} username Username of the user.
 * @apiSuccess {String} password Password of the user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 4242,
 *        "email": "dems@epitech.eu",
 *        "username": "dems"
 *     }
 * 
 * @apiError (400) InvalidParamsOrId The parameters were not correctly formated or the Id is unknown.
 * @apiError (401) UserNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

  /**
 * @api {post} admin/user/ Update user profile
 * @apiName UserCreate
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiParam {Uint} id Id of the user in the database. (optional)
 * @apiParam {String} email New email or the old one if you don't want to update it.
 * @apiParam {String} username New username or the old one if you don't want to update it.
 * @apiParam {String} password Password of the user.
 * 
 * @apiSuccess {Uint} id Id of the user in the database.
 * @apiSuccess {String} email Email of the user.
 * @apiSuccess {String} username Username of the user.
 * @apiSuccess {String} password Password of the user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 4242,
 *        "email": "dems@epitech.eu",
 *        "username": "dems"
 *     }
 * 
 * @apiError (400) InvalidParams The parameters were not correctly formated.
 * @apiError (401) UserNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

 /**
 * @api {delete} /admin/user/:id Gets information about the user
 * @apiParam {Uint} id Id of the user in the database.
 * @apiName UserInfo
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 
 * @apiError (400) InvalidId The User id is unknown.
 * @apiError (401) UserNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */



//////////
// ADMIN
//////////


 /**
 * @api {get} /admin/admin/:id Gets information about the admin
 * @apiParam {Uint} id Id of the admin in the database.
 * @apiName AdminInfo
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the admin.
 * 
 * @apiSuccess {Uint} id Id of the admin in the database.
 * @apiSuccess {String} email Email of the admin.
 * @apiSuccess {String} username Username of the admin.
 * @apiSuccess {String} password Password of the admin.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 4242,
 *        "email": "dems@epitech.eu",
 *        "username": "dems"
 *     }
 * 
 * @apiError (401) AdminNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "adminError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

 /**
 * @api {put} admin/admin/:id Update admin profile
 * @apiParam {Uint} id Id of the admin in the database.
 * @apiName AdminInfoUpdate
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the admin logged in.
 * 
 * @apiParam {Uint} id Id of the admin in the database.
 * @apiParam {String} email New email or the old one if you don't want to update it.
 * @apiParam {String} username New username or the old one if you don't want to update it.
 * @apiParam {String} password Password of the admin.
 * 
 * @apiSuccess {Uint} id Id of the admin in the database.
 * @apiSuccess {String} email Email of the admin.
 * @apiSuccess {String} username Username of the admin.
 * @apiSuccess {String} password Password of the admin.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 4242,
 *        "email": "dems@epitech.eu",
 *        "username": "dems"
 *     }
 * 
 * @apiError (400) InvalidParamsOrId The parameters were not correctly formated or the Id is unknown.
 * @apiError (401) AdminNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "adminError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

  /**
 * @api {post} admin/admin/ Update admin profile
 * @apiName AdminCreate
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the admin logged in.
 * 
 * @apiParam {Uint} id Id of the admin in the database. (optional)
 * @apiParam {String} email New email or the old one if you don't want to update it.
 * @apiParam {String} username New username or the old one if you don't want to update it.
 * @apiParam {String} password Password of the admin.
 * 
 * @apiSuccess {Uint} id Id of the admin in the database.
 * @apiSuccess {String} email Email of the admin.
 * @apiSuccess {String} username Username of the admin.
 * @apiSuccess {String} password Password of the admin.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 4242,
 *        "email": "dems@epitech.eu",
 *        "username": "dems"
 *     }
 * 
 * @apiError (400) InvalidParams The parameters were not correctly formated.
 * @apiError (401) AdminNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "adminError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

 /**
 * @api {delete} /admin/admin/:id Gets information about the admin
 * @apiParam {Uint} id Id of the admin in the database.
 * @apiName AdminInfo
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the admin logged in.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 
 * @apiError (400) InvalidId The admin id is unknown.
 * @apiError (401) AdminNotLoggedIn You are not connected please loggin first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "AdminError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

  /**
 * @api {get} /admin/users Get all users
 * @apiName AllUsers
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} totalCount Number of total users
 * @apiSuccess {Array} users An array of user, formatted the same way as GET /user/:id
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "totalCount": 2,
 *          "users": [
 *              {
 *                  "id": 4242,
 *                  "email": "dems@epitech.eu",
 *                  "username": "dems"
 *              },
 *              ...
 *          ]
 *     }
 * 
 * @apiError (400) NoService You have not any service.
 * @apiError (401) AdminNotLoggedIn You are not connected please login first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

   /**
 * @api {get} /admin/admins Get all admins
 * @apiName AllAdmins
 * @apiGroup Admin
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} totalCount Number of total admins
 * @apiSuccess {Array} admins An array of user, formatted the same way as GET /user/:id
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "totalCount": 2,
 *          "admins": [
 *              {
 *                  "id": 4242,
 *                  "email": "dems@epitech.eu",
 *                  "username": "dems"
 *              },
 *              ...
 *          ]
 *     }
 * 
 * @apiError (400) NoService You have not any service.
 * @apiError (401) AdminNotLoggedIn You are not connected please login first.
 * @apiError (403) InvalidToken A token was provided but it is invalid.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */