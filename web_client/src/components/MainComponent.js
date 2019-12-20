import React from 'react';
import QueryString from 'query-string';
import RouterComponent from "./RouterComponent";
import {inject, observer} from "mobx-react";

@inject('ApplicationStore')
@inject('ServiceStore')
@observer
export default class MainComponent extends React.Component {
	async componentDidMount() {
		const ApplicationStore = this.props.ApplicationStore;
		const ServiceStore = this.props.ServiceStore;

		const savedToken = localStorage.getItem('token');
		if (savedToken) {
			await ApplicationStore.authenticateWithSavedToken(savedToken);
		} else {
			ApplicationStore.setDefaultView();
		}

		const serviceAdd = sessionStorage.getItem('service_add');
		let uriParams = QueryString.parse(location.search);

		// Account validation case
		if (uriParams['confirmationToken']) {
			await ApplicationStore.validateAccount(uriParams['confirmationToken']);
			window.history.replaceState(null, null, window.location.pathname);
			return;
		}

		// Handle hash params case (like Trello oauth redirect)
		if (window.location.hash.includes('#token=') && Object.keys(uriParams).length === 0) {
			const hashParams = window.location.hash.split('=');
			uriParams['token'] = hashParams[1];
		}

		// If there is redirection from OAUTH login
		if (serviceAdd && Object.keys(uriParams).length > 0) {
			ApplicationStore.setLoadingView();
			await ServiceStore.addService(serviceAdd, uriParams);
			ApplicationStore.setHomeView();

			sessionStorage.removeItem('service_add');
			window.history.replaceState(null, null, window.location.pathname);
		}
	}

	render() {
		return (
			<RouterComponent />
		)
	}
}