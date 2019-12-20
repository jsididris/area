import React from "react";
import {inject, observer} from "mobx-react";
import {Alert, Button, Col, Icon, Input, Row, Layout} from "antd";

import ApplicationStore from "../../stores/ApplicationStore"

const {Header, Sider, Content} = Layout;

@inject('ApplicationStore')
@observer
export default class AccountComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			email: null,
			oldPassword: null,
			newPassword: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		this.setState({
			email: this.props.ApplicationStore.currentUser.email
		});
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	async handleUpdate() {
		await this.props.ApplicationStore.updateUser(this.state.oldPassword, this.state.newPassword, this.state.email);
	}

	async handleLogout() {
		await this.props.ApplicationStore.logout();
	}

	render() {
		return (
		<Layout style={{minHeight: '100vh'}}>
			<Layout>
			<Header style={{ background: '#fff', padding: 0 }}>
						<Row>
							<Col className="gutter-row" xs={2} sm={4} md={6} lg={8} xl={10} style={{display: "flex", justifyContent: "center"}}>
								<Button type="primary" icon="setting" style={{marginTop: 15}} onClick={() => ApplicationStore.setHomeView()}>Back</Button>
							</Col>
							<Col className="gutter-row" xs={20} sm={16} md={12} lg={8} xl={4}>
								<h1 style={{fontWeight: 200, fontSize: 17}}>Welcome {ApplicationStore.currentUser.username}</h1>
							</Col>
							<Col className="gutter-row" xs={2} sm={4} md={6} lg={8} xl={10} style={{display: "flex", justifyContent: "center"}}>
								<Button type="danger" icon="logout" style={{marginTop: 15}} onClick={this.handleLogout}>Logout</Button>
							</Col>
						</Row>
					</Header>
				<Row type="flex" align="middle">
				<Col span={8} offset={8} style={{marginTop: "10%"}}>
					<h1><Icon type="dashboard" /> <span style={{fontWeight: 300}}>Account Management</span> AREA</h1>
					{ApplicationStore.lastError !== null &&
					<div>
						<Alert
							message="Update failed"
							description={ApplicationStore.lastError}
							type="error"
							showIcon={true}
						/>
					</div>
					}
					<Input
						name={"oldPassword"}
						size={"large"}
						placeholder="Old password"
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						value={this.state.oldPassword}
						style={{marginTop: 20}}
						onChange={this.handleChange}
						type={"password"}
					/>

					<Input
						name={"email"}
						size={"large"}
						placeholder="E-mail address"
						prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
						value={this.state.email}
						style={{marginTop: 20}}
						onChange={this.handleChange}
					/>

					<Input
						name={"newPassword"}
						size={"large"}
						placeholder=" New password"
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						value={this.state.newPassword}
						style={{marginTop: 20}}
						onChange={this.handleChange}
						type={"password"}
					/><br />

					<Button
						type="primary"
						block={true}
						style={{marginTop: 20}}
						onClick={this.handleUpdate}>
						Update account
					</Button>
				</Col>
			</Row>
			</Layout>
		</Layout>
		)
	}
}