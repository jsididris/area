import {observable, action, computed, runInAction} from 'mobx';
import ViewEnum from '../enums/ViewEnum';
import Backend from '../Backend';
import {Alert} from "react-native";

export class ApplicationStore {
	@observable currentView = ViewEnum.LOAD;
	@observable currentUser = null;
	@observable lastError = null;
	@observable currentOauthServiceName = null;
	@observable currentOauthLoginUrl = null;

	@action async authenticateWithSavedToken(token) {
		this.currentView = ViewEnum.LOAD;
		try {
			Backend.setToken(token);
			const user = await Backend.me();
			runInAction(() => {
				this.currentView = ViewEnum.HOME;
				this.currentUser = user;
			});
		} catch (exception) {
			runInAction(() => {
				this.currentView = ViewEnum.LOGIN;
				Backend.setToken(null);
			});
		}
	}

	@action async authenticate(username, password) {
		this.currentView = ViewEnum.LOAD;
		try {
			await Backend.authenticate(username, password);
			const user = await Backend.me();
			runInAction(() => {
				this.currentView = ViewEnum.HOME;
				this.currentUser = user;
			});
		} catch (exception) {
			runInAction(() => {
				this.currentView = ViewEnum.LOGIN;
				Alert.alert('Login failed !', exception.message);
			});
		}
	}

	@action async register(username, email, password) {
		this.currentView = ViewEnum.LOAD;
		try {
			await Backend.register(username, email, password);
			runInAction(() => {
				this.currentView = ViewEnum.LOGIN;
				Alert.alert('Welcome !', 'Please confirm your e-mail address now.');
			});
		} catch (exception) {
			runInAction(() => {
				this.currentView = ViewEnum.REGISTER;
				Alert.alert('Registration failed !', exception.message);
			});
		}
	}

	@action async updateUser(oldPassword, newPassword, email) {
		this.currentView = ViewEnum.LOAD;
		try {
			const user = await Backend.updateUser(oldPassword, newPassword, email);
			runInAction(() => {
				this.currentView = ViewEnum.HOME;
				this.currentUser = user;
			});
		} catch (exception) {
			runInAction(() => {
				this.currentView = ViewEnum.HOME;
				Alert.alert('Update user failed !', exception.message);
			});
		}
	}

	@action async logout() {
		this.currentView = ViewEnum.LOGIN;
		this.currentUser = null;
		await Backend.logout();
	}

	@action setLoadingView() {
		this.currentView = ViewEnum.LOAD;
	}

	@action setDefaultView() {
		this.currentView = ViewEnum.LOGIN;
	}

	@action setLoginView() {
		this.currentView = ViewEnum.LOGIN;
	}

	@action setRegisterView() {
		this.currentView = ViewEnum.REGISTER;
	}

	@action setHomeView() {
		this.currentView = ViewEnum.HOME;
	}

	@action setServiceAddView() {
		this.currentView = ViewEnum.SERVICE_ADD;
	}

	@action setAreaAddView() {
		this.currentView = ViewEnum.AREA_ADD;
	}

	@action setOauthLoginView(name, url) {
		this.currentView = ViewEnum.OAUTH_LOGIN;
		this.currentOauthServiceName = name;
		this.currentOauthLoginUrl = url;
	}
}

const store = new ApplicationStore();
export default store;