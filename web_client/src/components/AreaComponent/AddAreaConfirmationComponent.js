import React from "react";
import {Alert, Button, Card, Col, Icon, Input, Layout, Menu, Row, Slider, Steps} from "antd";
import {inject, observer} from "mobx-react";
import LoadComponent from "../LoadComponent";

import Backend from "../../Backend";

const {Header, Sider, Content} = Layout;

@inject('AreaStore')
@observer
export default class AddAreaConfirmationComponent extends React.Component {
	constructor() {
		super();
		this.handleFinish = this.handleFinish.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	async handleFinish() {
		await this.props.AreaStore.addArea();
	}

	handleBack() {
		this.props.AreaStore.creationBack();
	}

	render() {
		const AreaStore = this.props.AreaStore;
		return (
			<Col className="gutter-row" span={8} offset={8}>
				<div style={{borderStyle: "solid", borderWidth: 1, padding: 20, borderColor: "#e8e8e8"}}>
					<h1>Confirm the creation of {AreaStore.addName}</h1>
					<br /><br />

					<Button.Group size={"large"} style={{marginTop: 20}}>
						<Button type="primary" onClick={this.handleBack}>
							<Icon type="left" />Back
						</Button>
						<Button type="primary" onClick={this.handleFinish}>
							Finish<Icon type="right" />
						</Button>
					</Button.Group>
				</div>
			</Col>
		)
	}
}