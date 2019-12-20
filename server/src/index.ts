import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as compose from 'koa-compose';
import * as koaBody from 'koa-body';
import * as koaCors from '@koa/cors';
import * as koaBearerToken from 'koa-bearer-token';

import Runner from "./runner";
import * as controllers from "./controllers";
import * as middlewares from "./middlewares";

createConnection().then(async connection => {
	const runner = new Runner();
	const app = new Koa();
	const router = new Router();
	const authMiddlewares = compose([koaBody(), koaBearerToken(), middlewares.AuthenticationMiddleware.authenticated]);

	router.get('/', (ctx, next) => { ctx.body = 'Hello World!'; });
	router.post('/login', koaBody(), controllers.AuthenticationController.login);
	router.delete('/logout', authMiddlewares, controllers.AuthenticationController.logout);
	router.post('/register', koaBody(), controllers.AuthenticationController.register);
	router.post('/validate', koaBody(), controllers.AuthenticationController.validate);
	router.get('/user/me', authMiddlewares, controllers.AuthenticationController.me);
	router.put('/user/me', authMiddlewares, controllers.AuthenticationController.update);

	router.get('/available/actions', authMiddlewares, controllers.AvailableController.actions);
	router.get('/available/reactions', authMiddlewares, controllers.AvailableController.reactions);
	router.get('/available/services', authMiddlewares, controllers.AvailableController.services);

	router.get('/service-redirect', authMiddlewares, controllers.ServiceController.redirect);
	router.delete('/service/:id', authMiddlewares, controllers.ServiceController.delete);
	router.get('/service/:id', authMiddlewares, controllers.ServiceController.get);
	router.post('/service', authMiddlewares, controllers.ServiceController.add);
	router.get('/services', authMiddlewares, controllers.ServiceController.getAll);

	router.get('/areas', authMiddlewares, controllers.AreaController.getAll);
	router.post('/area', authMiddlewares, controllers.AreaController.add);
	router.delete('/area/:id', authMiddlewares, controllers.AreaController.delete);

	router.get('/about.json', koaBody(), controllers.AboutController.services)

	app.use(koaCors({origin: process.env.ORIGIN}));
	app.use(router.routes());
	app.listen(8080);
	console.log('AREA webserver successfully listening on port 8080.');

	await runner.start();
	console.log('AREA runner successfully started.');
}).catch(console.log);
