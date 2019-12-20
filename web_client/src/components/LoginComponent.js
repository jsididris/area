import React from "react";
import {Alert, Button, Col, Icon, Input, Row} from "antd";
import {inject, observer} from "mobx-react";

@inject('ApplicationStore')
@observer
export default class LoginComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	async handleSubmit() {
		const ApplicationStore = this.props.ApplicationStore;
		await ApplicationStore.authenticate(this.state.username, this.state.password);
	}

	render() {
		const ApplicationStore = this.props.ApplicationStore;
		return (
			<Row type="flex" align="middle">
				<Col span={8} offset={8} style={{marginTop: "10%"}}>
					<h1><Icon type="dashboard" /> <span style={{fontWeight: 300}}>Connection</span> AREA</h1>
					{ApplicationStore.lastError !== null &&
					<div>
						<Alert
							message="Connection failed"
							description={ApplicationStore.lastError}
							type="error"
							showIcon={true}
						/>
					</div>
					}
					{ApplicationStore.lastInfo !== null &&
					<div>
						<Alert
							message="Great"
							description={ApplicationStore.lastInfo}
							type="info"
							showIcon={true}
						/>
					</div>
					}
					<Input
						name={"username"}
						size={"large"}
						placeholder="Username"
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						value={this.state.username}
						style={{marginTop: 20}}
						onChange={this.handleChange}
					/>

					<Input
						name={"password"}
						size={"large"}
						placeholder="Password"
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						value={this.state.password}
						style={{marginTop: 20}}
						onChange={this.handleChange}
						type={"password"}
					/><br />

					<Button
						type="primary"
						block={true}
						style={{marginTop: 20}}
						onClick={this.handleSubmit}>
						Log in
					</Button>
					<Button
						type="dashed"
						block={true}
						style={{marginTop: 20}}
						onClick={() => ApplicationStore.setRegisterView()}>
						I don't have an account
					</Button>
				</Col>
			</Row>
		)
	}
}