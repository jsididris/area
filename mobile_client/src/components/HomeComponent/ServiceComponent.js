import React from "react";
import {inject, observer} from "mobx-react";
import {Alert} from "react-native";
import {List, Modal} from "@ant-design/react-native";

@inject('ServiceStore')
@observer
export default class ServiceComponent extends React.Component {
	constructor() {
		super();
		this.handleAskRemoveService = this.handleAskRemoveService.bind(this);
		this.handleRemoveService = this.handleRemoveService.bind(this);
	}

	async handleAskRemoveService(id, name) {
		Alert.alert(name, 'Do you really want to remove this service ?', [
			{text: 'No', style: 'cancel'},
			{ text: 'Yes', onPress: () => this.handleRemoveService(id, name) }
		]);
	}

	async handleRemoveService(id, name) {
		const ServiceStore = this.props.ServiceStore;
		await ServiceStore.deleteService(id, name);
	}

	render() {
		const service = this.props.service;
		return (
			<List.Item
				extra={(service.token.username ? "Logged as " + service.token.username : "Without auth")}
				thumb={service.logo_url}
				onPress={() => this.handleAskRemoveService(service.id, service.name)}
			>
				{service.name}
			</List.Item>
		)
	}
}