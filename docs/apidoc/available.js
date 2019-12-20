/**
 * @api {get} /available/services Get all the service a user can subscribe
 * @apiName AvailableServices
 * @apiGroup Available
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} TotalCount Total number of services a user can subscribe
 * @apiSuccess {Array} Services All the services it found
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "totalCount": 26,
 *          "services": [
 *              {
 *                  "name": "twitter",
 *                  "displayName": "Twitter",
 *                  "description": "To use Twitter API"
 *              },
 *              ...
 *          ]
 *     }
 * 
 * @apiError (401) UserNotLoggedIn You are not connected please login first.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

 /**
 * @api {get} /available/actions Get all the actions a user can use
 * @apiName AvailableActions
 * @apiGroup Available
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} TotalCount Total number of actions a user can subscribe
 * @apiSuccess {Array} Actions All the actions it found
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "totalCount": 42,
 *          "actions": [
 *              {
 *                  "name": "twitterReadNewTweet",
 *                  "displayName": "Read New Tweet",
 *                  "description": "Read new tweet for a specific account"
 *              },
 *              ...
 *          ]
 *     }
 * 
 * @apiError (401) UserNotLoggedIn You are not connected please login first.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */

 /**
 * @api {get} /available/reactions Get all the reactions a user can use
 * @apiName AvailableRactions
 * @apiGroup Available
 *
 * @apiHeader {String} Authorization="Bearer (token)" Token of the user logged in.
 * 
 * @apiSuccess {Uint} TotalCount Total number of reactions a user can subscribe
 * @apiSuccess {Array} Reactions All the actions it found
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "totalCount": 42,
 *          "reactions": [
 *              {
 *                  "name": "telegramPostMessage",
 *                  "displayName": "Send A Telegram Message",
 *                  "description": "Send a telegram message to a specific person"
 *              },
 *              ...
 *          ]
 *     }
 * 
 * @apiError (401) UserNotLoggedIn You are not connected please login first.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 4XX ErrorName
 *  {
 *      "errorName": "UserError"
 *      "errorDescription": "Simple example of what is returned when an error occurred"
 *  }
 */