import React from "react";
import {inject, observer} from "mobx-react";
import {ScrollView} from "react-native";
import {Button, List} from "@ant-design/react-native";

import LoadComponent from "../LoadComponent";
import Backend from "../../Backend";

@inject('ApplicationStore')
@inject('ServiceStore')
@observer
export default class AddServiceComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			services: [],
			loading: true
		};

		this.handleGoBack = this.handleGoBack.bind(this);
		this.handleAddService = this.handleAddService.bind(this);
	}

	async componentDidMount() {
		const services = await Backend.getAvailableServices();
		this.setState({services: services.services, loading: false});
	}

	handleGoBack() {
		this.props.ApplicationStore.setHomeView();
	}

	async handleAddService(name) {
		const ApplicationStore = this.props.ApplicationStore;
		const ServiceStore = this.props.ServiceStore;

		ApplicationStore.setLoadingView();
		const redirect = await Backend.getServiceRedirect(name);
		if (redirect.link !== null) {
			ApplicationStore.setOauthLoginView(name, redirect.link);
		} else {
			await ServiceStore.addService(name, {});
			ApplicationStore.setHomeView();
		}
	}

	render() {
		if (this.state.loading) {
			return <LoadComponent/>
		}

		return (
			<ScrollView
				style={{flex: 1, backgroundColor: '#f5f5f9', width: "100%", marginTop: 20}}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List renderHeader={'Choose service to add'}>
					{ this.state.services.map((service, i) => {
						return (<List.Item onPress={() => this.handleAddService(service.name)} key={i} thumb={service.logoUrl}>{service.litteralName}</List.Item>)
					})}
					<List.Item><Button type="warning" onPress={this.handleGoBack}>Cancel</Button></List.Item>
				</List>
			</ScrollView>
		)
	}
}