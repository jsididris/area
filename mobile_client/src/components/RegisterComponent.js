import React from "react";
import {Button, InputItem, Icon} from '@ant-design/react-native';
import {inject, observer} from "mobx-react";
import {Text, View} from "react-native";

@inject('ApplicationStore')
@observer
export default class RegisterComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: ""
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(username) {
		this.setState({username: username.toLowerCase()});
	}

	handleEmailChange(email) {
		this.setState({email: email.toLowerCase()});
	}

	handlePasswordChange(password) {
		this.setState({password});
	}

	async handleSubmit() {
		const ApplicationStore = this.props.ApplicationStore;
		await ApplicationStore.register(this.state.username, this.state.email, this.state.password);
	}

	render() {
		const ApplicationStore = this.props.ApplicationStore;
		return (
			<View>
				<Text style={{fontSize: 30}}><Icon name="dashboard" size="md" color={"black"} /> Inscription AREA</Text>
				<InputItem
					name={"username"}
					size={"large"}
					placeholder="Nom d'utilisateur"
					value={this.state.username}
					style={{marginTop: 20}}
					onChange={this.handleUsernameChange}
				/>

				<InputItem
					name={"email"}
					size={"large"}
					placeholder="Adresse e-mail"
					value={this.state.email}
					style={{marginTop: 20}}
					onChange={this.handleEmailChange}
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
					Créer mon compte
				</Button>
				<Button
					type="primary"
					block={true}
					style={{marginTop: 20}}
					onPress={() => ApplicationStore.setLoginView()}>
					J'ai déjà un compte
				</Button>
			</View>
		)
	}
}