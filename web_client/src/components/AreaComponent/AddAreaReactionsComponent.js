import React from "react";
import {Alert, Button, Card, Col, Icon, Input, Layout, Menu, message, Modal, Row, Slider, Steps, Tag, Tree} from "antd";
import {inject, observer} from "mobx-react";
import LoadComponent from "../LoadComponent";

import Backend from "../../Backend";

const {Header, Sider, Content} = Layout;

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

	handleNext() {
		this.props.AreaStore.setReactionsOfNewArea(this.state.selectedReactions);
	}

	handleBack() {
		this.props.AreaStore.creationBack();
	}

	async handlePickReaction(checkedKeys) {
		checkedKeys = checkedKeys.checked;
		let targetReactionName = null;
		const action = (checkedKeys.length > this.state.selectedReactionNames.length) ? "ADD" : "REMOVE";

		if (action === "REMOVE") {
			for (const reactionName of this.state.selectedReactionNames) {
				if (!checkedKeys.includes(reactionName))
					targetReactionName = reactionName;
			}
		} else {
			for (const actionName of checkedKeys) {
				if (!this.state.selectedReactionNames.includes(actionName))
					targetReactionName = actionName;
			}
		}

		if (!targetReactionName)
			return;

		if (action === "REMOVE" && this.state.selectedReactionNames.includes(targetReactionName)) {
			const selectedReactions = this.state.selectedReactions.filter(reaction => reaction.name !== targetReactionName);
			const selectedReactionNames = this.state.selectedReactionNames.filter(actionName => actionName !== targetReactionName);
			this.setState({selectedReactions, selectedReactionNames, loading: true});

			// To force the tree to re-render
			setTimeout(() => {
				message.success('Reaction ' + this.state.configurationModalTargetReaction.name + ' successfully removed');
				this.setState({loading: false});
			}, 1);

			return;
		}

		let targetReaction = null;

		for (const reaction of this.state.availableReactions) {
			if (reaction.name === targetReactionName) {
				targetReaction = reaction;
				break;
			}
		}

		if (targetReaction) {
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
		this.setState({selectedReactions, selectedReactionNames, configurationModalVisible: false, loading: true});
		// To force the tree to re-render
		setTimeout(() => {
			message.success('Reaction ' + this.state.configurationModalTargetReaction.name + ' successfully added');
			this.setState({loading: false});
		}, 1);
	}

	handleInputConfigChange(event) {
		const variable = event.target.name;
		const value = event.target.value;

		const configurationModalValues = {...this.state.configurationModalValues};
		configurationModalValues[variable] = value;
		this.setState({configurationModalValues});
	}

	render() {
		const AreaStore = this.props.AreaStore;

		if (this.state.loading) {
			return <LoadComponent />
		}

		const services = [];
		for (const service of this.state.services) {
			const reactions = [];
			for (const availableReaction of this.state.availableReactions) {
				if (service.class_name !== availableReaction.serviceName)
					continue;

				reactions.push(<Tree.TreeNode icon={<Icon type="compass" />} title={availableReaction.litteralName} key={availableReaction.name} />);
			}

			services.push(
				<Tree.TreeNode disableCheckbox={true} icon={<img src={service.logo_url} style={{width: 15, height: 15}} />} title={service.name} key={service.class_name}>
					{reactions}
				</Tree.TreeNode>
			)
		}

		const action = AreaStore.addActions[AreaStore.addReactionsForActionIndex];
		return (
			<Col className="gutter-row" span={8} offset={8}>
				<div style={{borderStyle: "solid", borderWidth: 1, padding: 20, borderColor: "#e8e8e8"}}>
					<h2 style={{textAlign: "center"}}>Choose reactions for {action.litteral_name} action of {action.service_name}</h2>
					<Tree showIcon checkable checkStrictly switcherIcon={<Icon type="down" />} defaultExpandedKeys={this.state.selectedReactionNames} checkedKeys={this.state.selectedReactionNames} onCheck={this.handlePickReaction}>
						{services}
					</Tree>
					{this.state.configurationModalVisible &&
						<Modal
							title={"Configure " + this.state.configurationModalTargetReaction.litteralName + " reaction"}
							visible={this.state.configurationModalVisible}
							onOk={this.handleAddReaction}
							onCancel={() => { this.setState({configurationModalVisible: false})}}
						>
							<Tag>{ this.state.configurationModalTargetReaction.description }</Tag>
							<h3>Available template variables: </h3>
							{ action.template_fields.map((field, i) =>
								<div key={i} style={{marginTop: 5}}><Tag color={"blue"}>{field.name} ({field.description}): <b>&#123;{field.variable}&#125;</b></Tag></div>
							)}
							{ this.state.configurationModalTargetReaction.configFields.map((field, i) =>
								<li key={i} style={{marginTop: 15}}>
									{ field.name }: <Input name={field.variable} placeholder="String value" onChange={this.handleInputConfigChange} value={this.state.configurationModalValues[field.variable]} />
									<p style={{fontSize: 10}}>{field.description}</p>
								</li>)
							}
						 </Modal>
					}

					<Button.Group size={"large"} style={{marginTop: 20}}>
						<Button type="primary" onClick={this.handleBack}>
							<Icon type="left" />Back
						</Button>
						<Button type="primary" onClick={this.handleNext}>
							Next<Icon type="right" />
						</Button>
					</Button.Group>
				</div>
			</Col>
		)
	}
}