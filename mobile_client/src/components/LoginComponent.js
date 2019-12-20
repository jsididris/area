import React from "react";
import {inject, observer} from "mobx-react";
import {Button, InputItem, Icon} from '@ant-design/react-native';
import { Text, View } from 'react-native';

@inject('ApplicationStore')
@observer
export default class LoginComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(username) {
		this.setState({username: username.toLowerCase()});
	}

	handlePasswordChange(password) {
		this.setState({password});
	}

	async handleSubmit() {
		const ApplicationStore = this.props.ApplicationStore;
		await ApplicationStore.authenticate(this.state.username, this.state.password);
	}

	render() {
		const ApplicationStore = this.props.ApplicationStore;
		return (
			<View>
				<Text style={{fontSize: 30}}><Icon name="dashboard" size="md" color={"black"} /> Connexion AREA</Text>

				<InputItem
					name={"username"}
					size={"large"}
					placeholder="Nom d'utilisateur"
					value={this.state.username}
					onChange={this.handleUsernameChange}
					style={{marginTop: 20}}
				/>

				<InputItem
					name={"password"}
					size={"large"}
					placeholder="Mot de passe"
					value={this.state.password}
					style={{marginTop: 20}}
					onChange={this.handlePasswordChange}
					type={"password"}
				/>

				<Button
					type="primary"
					block={true}
					style={{marginTop: 20}}
					onPress={this.handleSubmit}>
					Connexion
				</Button>
				<Button
					type="primary"
					block={true}
					style={{marginTop: 20}}
					onPress={() => ApplicationStore.setRegisterView()}>
					Je n'ai pas encore de compte
				</Button>
			</View>
		)
	}
}