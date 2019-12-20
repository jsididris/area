import React from "react";
import {inject, observer} from "mobx-react";
import {ScrollView, Text, View} from "react-native";
import {Modal, List, Button, InputItem, Toast} from '@ant-design/react-native';

import Backend from "../../Backend";
import LoadComponent from "../LoadComponent";

@inject('AreaStore')
@observer
export default class AddAreaActionsComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			availableActions: [],
			services: [],
			selectedActions: [],
			selectedActionNames: [],
			configurationModalVisible: false,
			configurationModalTargetAction: null,
			configurationModalValues: null,
		};

		this.handlePickAction = this.handlePickAction.bind(this);
		this.handleAddAction = this.handleAddAction.bind(this);
		this.handleInputConfigChange = this.handleInputConfigChange.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

   async componentDidMount() {
		const availableActions = await Backend.getAvailableActions();
		const services = await Backend.getServices();

		this.setState({
			availableActions: availableActions.actions,
			services: services.services,
			loading: false
		});
   }

	handlePickAction(actionName) {
		if (this.state.selectedActionNames.includes(actionName)) {
			const selectedActions = this.state.selectedActions.filter(action => action.name !== actionName);
			const selectedActionNames = this.state.selectedActionNames.filter(name => name !== actionName);
			Toast.info("Removed " + actionName + " action !");

			this.setState({selectedActions, selectedActionNames});
		} else {
			let targetAction = null;

			for (const action of this.state.availableActions) {
				if (action.name === actionName) {
					targetAction = action;
					break;
				}
			}

			if (!targetAction)
				return;

			const configurationModalValues = [];
			for (const field of targetAction.configFields) {
				configurationModalValues[field.variable] = "";
			}

			this.setState({
				configurationModalVisible: true,
				configurationModalTargetAction: targetAction,
				configurationModalValues
			});
		}
	}

	handleAddAction() {
		const action = {
			litteral_name: this.state.configurationModalTargetAction.litteralName,
			service_name: this.state.configurationModalTargetAction.serviceName,
			template_fields: this.state.configurationModalTargetAction.templateFields,
			class_name: this.state.configurationModalTargetAction.name,
			config: this.state.configurationModalValues,
			reactions: {}
		};

		const selectedActions = this.state.selectedActions;
		selectedActions.push(action);

		const selectedActionNames = this.state.selectedActionNames;
		selectedActionNames.push(this.state.configurationModalTargetAction.name);
		this.setState({selectedActions, selectedActionNames, configurationModalVisible: false});

		Toast.info("Added " + this.state.configurationModalTargetAction.litteralName + " action !");
	}

	handleInputConfigChange(variable, value) {
		const configurationModalValues = {...this.state.configurationModalValues};
		configurationModalValues[variable] = value;
		this.setState({configurationModalValues});
	}

	handleNext() {
		if (this.state.selectedActions.length === 0)
			return;

		this.props.AreaStore.setActionsOfNewArea(this.state.selectedActions);
	}

	handleBack() {
		this.props.AreaStore.creationBack();
	}

	render() {
		const AreaStore = this.props.AreaStore;

		if (this.state.loading) {
			return <LoadComponent />
		}

		const services = [];
		for (const service of this.state.services) {
			const actions = [];
			for (const availableAction of this.state.availableActions) {
				if (service.class_name !== availableAction.serviceName)
					continue;


				if (this.state.selectedActionNames.includes(availableAction.name)) {
					actions.push(<List.Item onPress={() => {this.handlePickAction(availableAction.name)}} key={availableAction.name}  thumb={"https://cdn4.iconfinder.com/data/icons/icocentre-free-icons/114/f-cross_256-512.png"} extra={"Added"}>{availableAction.litteralName}</List.Item>);
				} else {
					actions.push(<List.Item onPress={() => {this.handlePickAction(availableAction.name)}} key={availableAction.name} extra={availableAction.description}>{availableAction.litteralName}</List.Item>);
				}
			}

			if (actions.length > 0) {
				services.push(
					<List key={service.name} renderHeader={service.name}>
						{actions}
					</List>
				);
			}
		}

		return (
			<View>
				<ScrollView style={{borderWidth: 1, padding: 20, borderColor: "#e8e8e8", height: "70%"}}>
					{services}
				</ScrollView>
				<Button type="primary" onPress={this.handleNext} style={{margin: 5}}>Next</Button>
				<Button type="warning" onPress={this.handleBack} style={{margin: 5}}>Back</Button>
				{this.state.configurationModalVisible &&
				<Modal
					popup
					animationType="slide-up"
					title={"Configure " + this.state.configurationModalTargetAction.litteralName + " action"}
					visible={this.state.configurationModalVisible}
					onClose={() => { this.setState({configurationModalVisible: false})}}
				>
					<View style={{paddingVertical: 20, paddingHorizontal: 20, height: "80%"}}>
						<Text style={{fontSize: 16, textAlign: "center", padding: 10}}>{"Configure " + this.state.configurationModalTargetAction.litteralName + " action"}</Text>
						<List>
						{this.state.configurationModalTargetAction.configFields.map((field, i) =>
							<View>
								<InputItem
									type={"text"}
									clear
									value={this.state.configurationModalValues[field.variable]}
									onChange={(val) => this.handleInputConfigChange(field.variable, val)}
									placeholder={field.description}
								>
									<Text style={{fontSize: 10, paddingRight: 10}}>{field.name}</Text>
								</InputItem>
							</View>
						)}
							<List.Item><Button type="primary" onPress={this.handleAddAction}>Add</Button></List.Item>
							<List.Item><Button type="warning" onPress={() => this.setState({configurationModalVisible: false})}>Close</Button></List.Item>
						</List>
					</View>
				</Modal>
				}
			</View>
		)
	}
}