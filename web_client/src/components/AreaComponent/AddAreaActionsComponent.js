import React from "react";
import {Alert, Button, Card, Col, Icon, Input, Layout, Menu, message, Modal, Row, Slider, Steps, Tag, Tree} from "antd";
import {inject, observer} from "mobx-react";
import LoadComponent from "../LoadComponent";

import Backend from "../../Backend";

const {Header, Sider, Content} = Layout;

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

	handleNext() {
		this.props.AreaStore.setActionsOfNewArea(this.state.selectedActions);
	}

	handleBack() {
		this.props.AreaStore.creationBack();
	}

	async handlePickAction(checkedKeys) {
		checkedKeys = checkedKeys.checked;
		let targetActionName = null;
		const action = (checkedKeys.length > this.state.selectedActionNames.length) ? "ADD" : "REMOVE";

		if (action === "REMOVE") {
			for (const actionName of this.state.selectedActionNames) {
				if (!checkedKeys.includes(actionName))
					targetActionName = actionName;
			}
		} else {
			for (const actionName of checkedKeys) {
				if (!this.state.selectedActionNames.includes(actionName))
					targetActionName = actionName;
			}
		}

		if (!targetActionName)
			return;

		if (action === "REMOVE" && this.state.selectedActionNames.includes(targetActionName)) {
			const selectedActions = this.state.selectedActions.filter(action => action.name !== targetActionName);
			const selectedActionNames = this.state.selectedActionNames.filter(actionName => actionName !== targetActionName);
			this.setState({selectedActions, selectedActionNames, loading: true});

			// To force the tree to re-render
			setTimeout(() => {
				message.success('Action ' + this.state.configurationModalTargetAction.name + ' successfully removed');
				this.setState({loading: false});
			}, 1);

			return;
		}

		let targetAction = null;

		for (const action of this.state.availableActions) {
			if (action.name === targetActionName) {
				targetAction = action;
				break;
			}
		}

		if (targetAction) {
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
		this.setState({selectedActions, selectedActionNames, configurationModalVisible: false, loading: true});
		// To force the tree to re-render
		setTimeout(() => {
			message.success('Action ' + this.state.configurationModalTargetAction.name + ' successfully added');
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
			const actions = [];
			for (const availableAction of this.state.availableActions) {
				if (service.class_name !== availableAction.serviceName)
					continue;

				actions.push(<Tree.TreeNode icon={<Icon type="compass" />} title={availableAction.litteralName} key={availableAction.name} />);
			}

			services.push(
				<Tree.TreeNode disableCheckbox={true} icon={<img src={service.logo_url} style={{width: 15, height: 15}} />} title={service.name} key={service.class_name}>
					{actions}
				</Tree.TreeNode>
			)
		}

		return (
			<Col className="gutter-row" span={8} offset={8}>
				<div style={{borderStyle: "solid", borderWidth: 1, padding: 20, borderColor: "#e8e8e8"}}>
					<Tree showIcon checkable checkStrictly switcherIcon={<Icon type="down" />} defaultExpandedKeys={this.state.selectedActionNames} checkedKeys={this.state.selectedActionNames} onCheck={this.handlePickAction}>
						{services}
					</Tree>
					{this.state.configurationModalVisible &&
						<Modal
							title={"Configure " + this.state.configurationModalTargetAction.litteralName + " action"}
							visible={this.state.configurationModalVisible}
							onOk={this.handleAddAction}
							onCancel={() => { this.setState({configurationModalVisible: false})}}
						>
							<Tag>{ this.state.configurationModalTargetAction.description }</Tag>
							{ this.state.configurationModalTargetAction.configFields.map((field, i) =>
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