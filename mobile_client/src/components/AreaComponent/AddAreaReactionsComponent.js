import React from "react";
import {inject, observer} from "mobx-react";
import {ScrollView, Text, View} from "react-native";
import {Modal, List, Button, InputItem, Toast, Tag} from '@ant-design/react-native';

import Backend from "../../Backend";
import LoadComponent from "../LoadComponent";

@inject('ApplicationStore')
@inject('AreaStore')
@observer
export default class AddAreaReactionsComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			availableReactions: [],
			services: [],
			selectedReactions: [],
			selectedReactionNames: [],
			configurationModalVisible: false,
			configurationModalTargetReaction: null,
			configurationModalValues: null,
		};

		this.handlePickReaction = this.handlePickReaction.bind(this);
		this.handleAddReaction = this.handleAddReaction.bind(this);
		this.handleInputConfigChange = this.handleInputConfigChange.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	async componentDidMount() {
		const availableReactions = await Backend.getAvailableReactions();
		const services = await Backend.getServices();

		this.setState({
			availableReactions: availableReactions.reactions,
			services: services.services,
			loading: false
		});
	}

	handlePickReaction(reactionName) {
		if (this.state.selectedReactionNames.includes(reactionName)) {
			const selectedReactions = this.state.selectedReactions.filter(reaction => reaction.name !== reactionName);
			const selectedReactionNames = this.state.selectedReactionNames.filter(name => name !== reactionName);
			Toast.info("Removed " + reactionName + " reaction !");

			this.setState({selectedReactions, selectedReactionNames});
		} else {
			let targetReaction = null;

			for (const reaction of this.state.availableReactions) {
				if (reaction.name === reactionName) {
					targetReaction = reaction;
					break;
				}
			}

			if (!targetReaction)
				return;

			const configurationModalValues = [];
			for (const field of targetReaction.configFields) {
				configurationModalValues[field.variable] = "";
			}

			this.setState({
				configurationModalVisible: true,
				configurationModalTargetReaction: targetReaction,
				configurationModalValues
			});
		}
	}

	handleAddReaction() {
		const reaction = {
			class_name: this.state.configurationModalTargetReaction.name,
			config: this.state.configurationModalValues
		};

		const selectedReactions = this.state.selectedReactions;
		selectedReactions.push(reaction);

		const selectedReactionNames = this.state.selectedReactionNames;
		selectedReactionNames.push(this.state.configurationModalTargetReaction.name);
		this.setState({selectedReactions, selectedReactionNames, configurationModalVisible: false});

		Toast.info("Added " + this.state.configurationModalTargetReaction.litteralName + " reaction !");
	}

	handleInputConfigChange(variable, value) {
		const configurationModalValues = {...this.state.configurationModalValues};
		configurationModalValues[variable] = value;
		this.setState({configurationModalValues});
	}

	async handleNext() {
		if (this.state.selectedReactions.length === 0)
			return;

		if (this.props.AreaStore.setReactionsOfNewArea(this.state.selectedReactions)) {
			await this.props.AreaStore.addArea();
			this.props.ApplicationStore.setHomeView();

			Toast.info("Area successfully created !");
		}
	}

	handleBack() {
		this.props.AreaStore.creationBack();
	}

	render() {
		const AreaStore = this.props.AreaStore;
		const action = AreaStore.addActions[AreaStore.addReactionsForActionIndex];

		if (this.state.loading) {
			return <LoadComponent />
		}

		const services = [];
		for (const service of this.state.services) {
			const reactions = [];
			for (const availableReaction of this.state.availableReactions) {
				if (service.class_name !== availableReaction.serviceName)
					continue;


				if (this.state.selectedReactionNames.includes(availableReaction.name)) {
					reactions.push(<List.Item onPress={() => {this.handlePickReaction(availableReaction.name)}} key={availableReaction.name}  thumb={"https://cdn4.iconfinder.com/data/icons/icocentre-free-icons/114/f-cross_256-512.png"} extra={"Added"}>{availableReaction.litteralName}</List.Item>);
				} else {
					reactions.push(<List.Item onPress={() => {this.handlePickReaction(availableReaction.name)}} key={availableReaction.name} extra={availableReaction.description}>{availableReaction.litteralName}</List.Item>);
				}
			}

			if (reactions.length > 0) {
				services.push(
					<List key={service.name} renderHeader={service.name}>
						{reactions}
					</List>
				);
			}
		}

		return (
			<View>
				<Text style={{textAlign: "center", marginBottom: 10}}>Choose reactions for {action.litteral_name} action of {action.service_name}</Text>
				<ScrollView style={{borderWidth: 1, padding: 20, borderColor: "#e8e8e8", height: "65%"}}>
					{services}
				</ScrollView>
				<Button type="primary" onPress={this.handleNext} style={{margin: 5}}>Next</Button>
				<Button type="warning" onPress={this.handleBack} style={{margin: 5}}>Back</Button>
				{this.state.configurationModalVisible &&
				<Modal
					popup
					animationType="slide-up"
					title={"Configure " + this.state.configurationModalTargetReaction.litteralName + " reaction"}
					visible={this.state.configurationModalVisible}
					onClose={() => { this.setState({configurationModalVisible: false})}}
				>
					<View style={{paddingVertical: 20, paddingHorizontal: 20, height: "80%"}}>
						<Text style={{fontSize: 16, textAlign: "center", padding: 10}}>{"Configure " + this.state.configurationModalTargetReaction.litteralName + " action"}</Text>
						<View style={{marginBottom: 10}}>
						{ action.template_fields.map((field, i) =>
							<Tag small={true} key={i} styke={{margin: 5}}><Text>{field.name}: &#123;{field.variable}&#125;</Text></Tag>
						)}
						</View>
						<List>
							{this.state.configurationModalTargetReaction.configFields.map((field, i) =>
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
							<List.Item><Button type="primary" onPress={this.handleAddReaction}>Add</Button></List.Item>
							<List.Item><Button type="warning" onPress={() => this.setState({configurationModalVisible: false})}>Close</Button></List.Item>
						</List>
					</View>
				</Modal>
				}
			</View>
		)
	}
}