# AREA
## Introduction
This is the main documentation of the AREA project. The goal of this project is to create a combination of **actions** that start **reactions** on **triggers** of external **services**.

There is a lot of documentation concerning this project in the `/docs` directory:

- an UML diagram of the different abstract classes (`uml.png`).
- a complete API doc listing all the routes provided by the **REST API** in the `apidoc/` folder.
- a documentation of each method provided by each service in the `tsdoc/` folder.

This project is separated into multiple parts:

- the server
- the web client
- the mobile client

We use **docker** to deploy each part and **docker-compose** to make the process easier.

To start using AREA, you just need to build all **docker services** using ```docker-compose build```, then you can start each built containers using ```docker-compose up```.

The web server will bind on port **8080** and offer a REST API to make it possible for clients to create **AREAS**.
The web client will bind on port **8081** and the mobile client will build its binary using **gradle** and will be available as the **client.apk** web client endpoint.

## Server

The server is made using **NodeJS** runtime with **TypeScript** language (and transpiled using **Babel**).

It uses **PostgreSQL** as its database in addition to **TypeORM** to make querying the database easier and more robust. Here is a diagram of the database with all the tables and relationships:

<img src="https://i.imgur.com/JPbswMe.png">

It also uses **Redis** as its cache storage manager(for session tokens or e-mail validation tokens), that way, token expiration management is way easier because of **Redis**'s native TTL feature.

### Architecture

The server follows the **event-driven** architecture. Here is a diagram explaining the main architecture:


<img src="https://i.imgur.com/rntqsCx.png">

### Runner
Following this architecture, the runner will poll each database-actions at a user-defined interval to check if there is **trigger**.
In case of a new **trigger**, the runner will emit an event for each **reaction** bound to the corresponding action. There is no interaction between **actions** and **reactions** except with the **Node EventEmitter**: this is the base of our abstraction principle.

The runner is simply like an event loop: it waits for an new event (an **action** trigerred) and it initiates the corresponding reactions.

The **REST API** can communicate with the runner using the **node event emitter** module for two cases:

- when a new AREA is created: the **REST API** asks for the **runner** to listen for the **triggers** of each actions of this AREA
- when an existing AREA is deleted: the **REST API** ask the runner to stop listening for the **triggers** of each actions of this AREA

The **runner** will make links between stored **actions/reactions** by users (into database) and concrete **actions/reactions** classes implementations.

### REST API
The **REST API** is the core of the AREA: it's the only way to communicate between the user and the AREA.
The goal of the **REST API** is to provide endpoints for the **web client** and the **mobile client** to offer all the features to the user.

The **REST API** follows the guidelines of the **restful** best practices (using appropriates verbs, name routes with associated resources ...).

That way, the **REST API** makes all **CRUD** actions possible for **actions**, **reactions** and **areas**. It also manages the registration and the authentication of the user using a **bearer token**.

Since the **REST API** is the critical part of the project, it is strongly tested using **unit tests** and **continuous integration** to avoid **regression**.

## Services

The main component of the AREA is a service. A service is an entity related to an external service (like Twitter, Instagram, Outlook ...) compliant with OAuth2 protocol and that provides a lot of methods to interact with it.

The AREA currently provides these services (16):

- ClockService
- CryptoService
- CustomProtocolService
- DiscordService
- EtherScanService
- ImgurService
- NexmoService
- Office365Service
- PingService 
- SlackService
- SpotifyService
- TelegramService
- TrelloService
- TwitchService
- TwitterService
- WebhookService

To make your service compliant with the AREA, you simply need to make a class that inherits from `AbstractService` and implement at least these methods:

- `getLoginUrl()`: it returns the login URL according to the OAuth2 protocol (login using return URL part)
- `getAuthToken(query: object)`: it returns an `authentication token` and a `refresh token` in exchange of a `grant code` according to the OAuth2 protocol (token negociation part)

You must define these protected fields:

- `_name`: the service name (you must export your service using this name)
- `_litteralName`: the service user-friendly name
- `_description`: the service description
- `_logoUrl`: the service logo URL

Then you have to export it into `server/src/services/index.ts` and that's it ! Your service will be automatically available.


## Actions
An action is an entity that can be **trigerred** (for example new e-mail received, new Tweet mentionning a specific account ...).

The AREA currently provide these actions (23):

- TelegramNewMessageReceivedAction
- TrelloNewNotificationAction
- TrelloNewBoardAction
- TrelloNewCardAction
- OutlookNewMailReceived
- OutlookNewEventAction
- PingDownAction
- SlackNewChannelAction
- SlackUserJoinedAction
- DiscordNewGuildAction
- TwitterNewTweetAction
- ClockAction
- IntraNewNotificationAction
- IntraGPAChangeAction
- IntraCreditChangeAction
- EtherscanNewMainnetTransaction
- EtherscanNewRopstenTransaction
- SpotifyNewFollowerAction
- InstagramNewPublications
- InstagramNewComment
- CustomProtocolNewPost
- CryptoCheckPriceAction
- TwitchNewStream


 To make an action, you simply have to make a class that inherits from `AbstractAction` and implement these two methods:

- `hasTrigerred(action: Action)`: it returns a boolean if the passed has a new trigger
- `runAction(eventEmitter: Node.EventEmitter, action: Action)`: it runs the action emitting procedure

Each of these methods take an `Action` model database-entry: it's the action stored database.

To check for a trigger, the `hasTrigerred()` method will fetch the associated resource (using the external service) associated to the action. It will use the `trigger_differentiator` field of the model of the action into the database to store a **temporary snapshot** of the last trigger. This field will be used to detect a **new** trigger. If there is a trigger, this function must add a new `trigger_history` entry into the database to avoid **trigger duplication** and to store the **trigger payload**.

The `runAction()` method will use the last `trigger_history` payload and use the `eventEmitter` passed as parameter by the **runner** to emit to all **reactions** the **trigger notification**: it allows each reaction to run-it.

You must also define these protected fields:

- `_service`: the service class associated to the action
- `_name`: the action name (you must export your action using this name)
- `_litteralName`: the action user-friendly name
- `_description`: the action description
- `_configFields`: the array of configuration fields of the action *(cf. config field section)*
- `_templateFields`: the array of template fields of the action *(cf. template field section)*

Then you have to export it into `server/src/actions/index.ts` and that's it ! Your action will be automatically added to his **service** and available for AREAs creation.

### Config fields:
Each action can be configured by user: it allow user customization (for example only fetch tweets of specific users). This can be done using **config fields**.

Each action must declare an array of his **config fields**, here is the corresponding interface signature:

```
export interface ConfigField {
	variable: string;
	name: string;
	type: string;
	description: string;
}
```

So a config field must have a `variable`, a `name`, a `type` and a `description`.

### Template fields:
When trigerred, each action can transmit **data** to **reactions**. This data is serialized as **template variables** that are available to use in **reactions**.

Each action must declare an array of his **template fields**, here is the corresponding interface signature:

```
export interface TemplateField {
	name: string;
	variable: string;
	description: string;
}
```


## Reactions

A reaction is an entity that does something in response of an **action triggerred** (for example send new e-mail, send SMS ...).

The AREA currently provides these reactions (14):

- TelegramSendMessageReaction
- OutlookSendMail
- SlackSendMessageReaction
- SlackCreateChannelReaction
- SlackJoinChannelReaction
- SlackSetPresenceReaction
- SlackAddReminderReaction
- NexmoSendSmsReaction
- TwitterLikeTweetReaction
- TwitterPostTweetReaction
- TwitterRetweetReaction
- WebHookGetReaction
- WebHookPostReaction
- SpotifyAddSongToPlaylistReaction

To make a reaction, you simply have to make class that inherits from `AbstractReaction` and implement this method:

- `runReaction(reaction: Reaction, data)`: it runs the reaction, taking a `Reaction` model database-entry (the reaction stored into the database) and a `data` variable that contains an array of **action template fields** ready to be appended to the reaction **config fields** in case of template usage

You must also define these protected fields:

- `_service`: the service class associated to the reaction
- `_name`: the reaction name (you must export your reaction using this name)
- `_litteralName`: the reaction user-friendly name
- `_description`: the reaction description
- `_configFields`: the array of configuration fields of the reaction *(cf. config field section)*

Then you have to export it into `server/src/reactions/index.ts` and that's it ! Your reaction will be automatically added to his **service** and available for AREAs creation.

### Config fields:
Each reaction can be configured by the user: it allows user customization (for example send e-mail to specific address). This can be done using **config fields**.

Each action must declare an array of its **config fields**, here is the corresponding interface signature:

```
export interface ConfigField {
	variable: string;
	name: string;
	type: string;
	description: string;
}
```

The config fields can do **template evaluation** in an easy way using the `evaluateTemplates()` method provided by the `AbstractReaction`

## Tests

<img src="https://i.imgur.com/5NS6R90.jpg">

The AREA is strongly tested with unit tests using **JEST**. All API endpoints are tested to avoid **software regression**. To run the tests, simply start `sudo docker-compose -f docker-compose.test.yml up --build --exit-code-from server --abort-on-container-exit`.

In addition to these unit tests, we use **Circle CI** to provide continuous integration. We have two environements:

- a test environement (also called preproduction) available as https://testarea.thedoux.fr
- a production environement available as https://area.thedoux.fr

We can deploy any **commit** to the **preprod** environement using our **Telegram BOT** ans the `/deploy {commit hash}` command.

The production environement will always be synchronized with **master** branch.
