import React from "react";
import {Alert, Button, Card, Col, Icon, Input, Layout, Menu, Row, Slider, Steps} from "antd";
import {inject, observer} from "mobx-react";
import LoadComponent from "../LoadComponent";

import Backend from "../../Backend";

const {Header, Sider, Content} = Layout;

@inject('AreaStore')
@observer
export default class AddAreaConfigureComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			fetchInterval: 30
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleFetchIntervalChange = this.handleFetchIntervalChange.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		if (this.props.AreaStore.addName !== null) {
			this.setState({name: this.props.AreaStore.addName});
		}

		if (this.props.AreaStore.addFetchInterval !== null) {
			this.setState({fetchInterval: this.props.AreaStore.addFetchInterval});
		}
	}

	handleNameChange(event) {
		this.setState({name: event.target.value});
	}

	handleFetchIntervalChange(fetchInterval) {
		this.setState({fetchInterval});
	}

	handleNext() {
		this.props.AreaStore.configureNewArea(this.state.name, this.state.fetchInterval);
	}

	render() {
		const AreaStore = this.props.AreaStore;
		return (
			<Col className="gutter-row" span={8} offset={8}>
				<div style={{borderStyle: "solid", borderWidth: 1, padding: 20, borderColor: "#e8e8e8"}}>
					<p>Choose a name for your AREA:</p>
					<Input value={this.state.name} prefix={<Icon type="underline" />} type="text" placeholder="Name" onChange={this.handleNameChange} /><br /><br />

					<p>Choose the fetch interval (in seconds):</p>
					<Slider value={this.state.fetchInterval} tooltipVisible={true} onChange={this.handleFetchIntervalChange} />
					<p style={{fontSize: 10}}>All actions of this AREA will be fetched every { this.state.fetchInterval } seconds.</p>
					<br /><br />

					<Button.Group size={"large"}>
						<Button type="primary" onClick={this.handleNext}>
							Next<Icon type="right" />
						</Button>
					</Button.Group>
				</div>
			</Col>
		)
	}
}