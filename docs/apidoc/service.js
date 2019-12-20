/**
 * @api {get} /service/:id Get information about a Service
 * @apiParam {Uint} id Service id to get information from
 * @apiName ServiceInfo
 * @apiGroup Service
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} id Id of the service
 * @apiSuccess {String} name Name of the service
 * @apiSuccess {String} displayName Name to display of the service
 * @apiSuccess {String} description Description of the service
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "id": 42,
 *          "name": "twitter",
 *          "class_name": "TwitterService",
 *          "token": {...}
 *     }
 * 
 * @apiError (400) InvalidId Id not found or does not exist.
 * @apiError (400) InvalidService You haven't subscribed to this service yet.
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
 * @api {post} /service Subscribe to a new service
 * @apiName ServiceSubscribe
 * @apiGroup Service
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiParam {String} name Name of the service
 * @apiParam {String} displayName Name to display of the service
 * @apiParam {String} description Description of the service
 * @apiParam {String} token Token of the service you just connected to
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 
 * @apiError (400) InvalidParams Parameters send to the POST are invalid.
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
 * @api {delete} /service/:id Delete a Service
 * @apiParam {Uint} id Service id to get information from
 * @apiName ServiceDelete
 * @apiGroup Service
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  
 * @apiError (400) InvalidId Id not found or does not exist.
 * @apiError (400) InvalidService You haven't subscribed to this service yet.
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
 * @api {get} /services Get all services
 * @apiName ServicesInfo
 * @apiGroup Service
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} totalCount Number of total services the user is subscribed to
 * @apiSuccess {Array} services An array of service, formatted the same way as GET /service/:id
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "totalCount": 2,
 *          "services": [
 *              Service {
 * 					"id": 1,
 *                  "name": "Twitter",
 *                  "class_name": "TwitterService",
 *                  "token": {...}
 *              },
 *              ...
 *          ]
 *     }
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
 * @api {get} /redirect?serviceName Request an URL to launch OAUTH2.0
 * @apiParam {String} serviceName Name of the service you want to connect to
 * @apiName RedirectRequest
 * @apiGroup Service
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {String} redirectLink Link to redirect the user to to authenticate
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "link": "https://twitter.com/authorize/oauth"
 *     }
 * 
 * @apiError (400) InvalidName Service not known.
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