import React from "react";
import {inject, observer} from "mobx-react";
import {WebView} from "react-native-webview";
import {View} from "react-native";

import QueryString from 'query-string';
import Backend from "../Backend";

@inject('ApplicationStore')
@inject('ServiceStore')
@observer
export default class RouterComponent extends React.Component {
	constructor() {
		super();
		this.shouldStartLoadWithRequestHandler = this.shouldStartLoadWithRequestHandler.bind(this);
	}

	async addService(uriParams) {
		this.props.ApplicationStore.setLoadingView();
		await this.props.ServiceStore.addService(this.props.ApplicationStore.currentOauthServiceName, uriParams);
		this.props.ApplicationStore.setHomeView();
	}

	shouldStartLoadWithRequestHandler ({url}) {
		if (url.startsWith(Backend.getRedirectionEndpoint())) {
			let uriParams = QueryString.parse(url.replace(Backend.getRedirectionEndpoint() + '/?', ''));

			// Handle hash params case (like Trello oauth redirect)
			if (url.includes('#token=')) {
				const hashParams = url.split('=');
				uriParams['token'] = hashParams[1];
			}

			// If there is redirection from OAUTH login
			if (Object.keys(uriParams).length > 0) {
				this.addService(uriParams);
				return false;
			}
		}

	   return true;
	}

	render() {
		return (
			<View style={{ flex: 1, width: "100%", height: "100%"}}>
				<WebView
					style={{width: "100%"}}
					scalesPageToFit={true}
					source={{uri: this.props.ApplicationStore.currentOauthLoginUrl}}
					onShouldStartLoadWithRequest={this.shouldStartLoadWithRequestHandler}
				/>
			</View>
		);
	}
}