import React from "react";
import {inject, observer} from "mobx-react";
import {View, Text, ScrollView} from 'react-native';
import {Tabs, List, Button, Icon} from '@ant-design/react-native';

import LoadComponent from "../LoadComponent";
import ServiceComponent from "./ServiceComponent";
import AreaComponent from "./AreaComponent";
import AccountComponent from "./AccountComponent";

@inject('ApplicationStore')
@inject('ServiceStore')
@inject('AreaStore')
@observer
export default class LoginComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true
		};

		this.displayNewService = this.displayNewService.bind(this);
		this.displayNewArea = this.displayNewArea.bind(this);
	}

	async componentDidMount() {
		await this.props.ServiceStore.fetchServices();
		await this.props.AreaStore.fetchAreas();

		this.setState({loading: false});
	}

	displayNewService() {
		this.props.ApplicationStore.setServiceAddView();
	}

	displayNewArea() {
		this.props.ApplicationStore.setAreaAddView();
	}

	render() {
		const ApplicationStore = this.props.ApplicationStore;
		const ServiceStore = this.props.ServiceStore;
		const AreaStore = this.props.AreaStore;

		if (this.state.loading) {
			return <LoadComponent />
		}

		return (
			<View style={{flex: 1, marginTop: 20}}>
				<Tabs tabs={[{title: "Services"}, {title: "AREAS"}, {title: "Account"}]}>
					<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
						{ ServiceStore.services.length !== 0 ?

							<ScrollView
								style={{flex: 1, backgroundColor: 'white', width: "100%", marginTop: 20}}
								automaticallyAdjustContentInsets={false}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
							>
								<List renderHeader={'Your services'}>
									<List>{ ServiceStore.services.map((service, i) => { return (<ServiceComponent key={i} service={service} />) })}</List>
								</List>
							</ScrollView>
							:
							<View style={{justifyContent: 'center', alignItems: 'center'}}>
								<Icon name="fall" size="lg" color={"black"} />
								<Text style={{fontSize: 30, color: "black", alignSelf: "center"}}>No service added</Text>
							</View>
						}
						<Button type="primary" style={{width: '80%', marginBottom: 20}} onPress={this.displayNewService}>Add new service</Button>
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
						{ AreaStore.areas.length !== 0 ?
							<ScrollView
								style={{flex: 1, backgroundColor: 'white', width: "100%", marginTop: 20}}
								automaticallyAdjustContentInsets={false}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
							>
								<List renderHeader={'Your AREAS'}>
									<List>{ AreaStore.areas.map((area, i) => { return (<AreaComponent key={i} area={area} />) })}</List>
								</List>
							</ScrollView>
							:
							<View style={{justifyContent: 'center', alignItems: 'center'}}>
								<Icon name="fall" size="lg" color={"black"} />
								<Text style={{fontSize: 30, color: "black", alignSelf: "center"}}>No AREA added</Text>
							</View>
						}
						<Button type="primary" style={{width: '80%', marginBottom: 20}} onPress={this.displayNewArea}>Add new AREA</Button>
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
						<AccountComponent />
					</View>
				</Tabs>
			</View>
		)
	}
}