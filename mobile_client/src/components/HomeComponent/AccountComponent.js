import React from "react";
import {inject, observer} from "mobx-react";
import {Button, Icon, List} from "@ant-design/react-native";
import {ScrollView, View} from "react-native";
import {InputItem} from "@ant-design/react-native";

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

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
		this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		this.setState({
			email: this.props.ApplicationStore.currentUser.email
		});
	}

	handleEmailChange(email) {
		this.setState({email});
	}

	handleOldPasswordChange(oldPassword) {
		this.setState({oldPassword});
	}

	handleNewPasswordChange(newPassword) {
		this.setState({newPassword});
	}

	async handleUpdate() {
		await this.props.ApplicationStore.updateUser(this.state.oldPassword, this.state.newPassword, this.state.email);
	}

	async handleLogout() {
		await this.props.ApplicationStore.logout();
	}

	render() {
		return (
			<ScrollView
				style={{flex: 1, backgroundColor: 'white', width: "100%", marginTop: 20}}
			>
				<List renderHeader={'Edit your account'}>
					<InputItem
						clear
						value={this.state.oldPassword}
						onChange={this.handleOldPasswordChange}
						placeholder="Your current password"
					>
						<Icon name="unlock" size="xs" color={"grey"} />
					</InputItem>
					<InputItem
						clear
						value={this.state.email}
						onChange={this.handleEmailChange}
						placeholder="New e-mail"
					>
						<Icon name="mail" size="xs" color={"grey"} />
					</InputItem>
					<InputItem
						clear
						value={this.state.newPassword}
						onChange={this.handleNewPasswordChange}
						placeholder="New password"
					>
						<Icon name="lock" size="xs" color={"grey"} />
					</InputItem>
					<List.Item><Button type="primary" onPress={this.handleUpdate}>Update account</Button></List.Item>
					<List.Item><Button type="warning" onPress={this.handleLogout}>Logout</Button></List.Item>
				</List>
			</ScrollView>
		)
	}
}