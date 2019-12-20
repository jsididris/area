/**
 * @api {get} /user/me Gets information about the user
 * @apiName UserInfo
 * @apiGroup User
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} id Id of the user in the database.
 * @apiSuccess {String} email Email of the user currently logged.
 * @apiSuccess {String} username Username of the user currently logged.
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
 * @api {put} /user/me Update user profile
 * @apiName UserInfoUpdate
 * @apiGroup User
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiParam {String} email New email. (optional, only one required)
 * @apiParam {String} username New username. (optional, only one required)
 * @apiParam {String} password New password. (optional, only one required)
 * 
 * @apiSuccess {String} email Email of the user currently logged.
 * @apiSuccess {String} username Username of the user currently logged.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
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
 * @api {post} /login Authenticate user to the back and obtain a token
 * @apiName LoginUser
 * @apiGroup User
 *
 * 
 * @apiParam {String} username The username of the user who wants to authenticate
 * @apiParam {String} password The password of the user who wants to authenticate
 * 
 * @apiSuccess {string} token Token of the user, used to authenticate the requests
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "token": erdf45678cdsd
 *     }
 * 
 * @apiError (400) InvalidParams The parameters were not correctly formated.
 * @apiError (401) InvalidCredentials Your username or password were incorrect.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */
 
  /**
 * @api {delete} /logout Logout a user already connected
 * @apiName LogoutUser
 * @apiGroup User
 * 
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 
 * @apiError (401) UserNotLoggedIn You are not connected please login first.
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
 * @api {post} /register Register a new user
 * @apiName RegisterUser
 * @apiGroup User
 *
 * 
 * @apiParam {String} username The username of the user
 * @apiParam {String} password The password of the user
 * @apiParam {String} email The email of the user
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 
 * @apiError (400) InvalidParams The parameters were not correctly formated.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */