import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {inject, observer} from "mobx-react";
import RouterComponent from "./RouterComponent";
import {Provider} from "@ant-design/react-native";

@inject('ApplicationStore')
@inject('ServiceStore')
@observer
export default class MainComponent extends Component {
	async componentDidMount() {
		const ApplicationStore = this.props.ApplicationStore;

		const savedToken = await AsyncStorage.getItem('@Area:token');
		if (savedToken) {
			await ApplicationStore.authenticateWithSavedToken(savedToken);
		} else {
			ApplicationStore.setDefaultView();
		}
	}

	render() {
		return (
			<Provider>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
					<RouterComponent />
				</View>
			</Provider>
		)
	}
}