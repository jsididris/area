import React from "react";
import {inject, observer} from "mobx-react";

import {List, InputItem, Icon, Button} from "@ant-design/react-native";
import {ScrollView} from "react-native";

@inject('ApplicationStore')
@inject('AreaStore')
@observer
export default class AddAreaConfigureComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			fetchInterval: ""
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleFetchIntervalChange = this.handleFetchIntervalChange.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {
		if (this.props.AreaStore.addName !== null) {
			this.setState({name: this.props.AreaStore.addName});
		}

		if (this.props.AreaStore.addFetchInterval !== null) {
			this.setState({fetchInterval: this.props.AreaStore.addFetchInterval});
		}
	}

	handleNameChange(name) {
		this.setState({name});
	}

	handleFetchIntervalChange(fetchInterval) {
		this.setState({fetchInterval});
	}

	handleNext() {
		if (this.state.name === "" || this.state.fetchInterval === "")
			return;

		this.props.AreaStore.configureNewArea(this.state.name, this.state.fetchInterval);
	}

	handleCancel() {
		this.props.ApplicationStore.setHomeView();
	}

	render() {
		return (
			<ScrollView
				style={{flex: 1, borderWidth: 1, padding: 20, borderColor: "#e8e8e8"}}
			>
				<List renderHeader={'Configure new AREA'}>
					<InputItem
						clear
						value={this.state.name}
						onChange={this.handleNameChange}
						placeholder="AREA Name"
					>
						<Icon name="underline" size="xs" color={"grey"} />
					</InputItem>
					<InputItem
						type={"number"}
						clear
						value={this.state.fetchInterval}
						onChange={this.handleFetchIntervalChange}
						placeholder="Fetch interval (seconds)"
					>
						<Icon name="clock-circle" size="xs" color={"grey"} />
					</InputItem>
					<List.Item><Button type="primary" onPress={this.handleNext}>Next</Button></List.Item>
					<List.Item><Button type="warning" onPress={this.handleCancel}>Cancel</Button></List.Item>
				</List>
			</ScrollView>
		)
	}
}