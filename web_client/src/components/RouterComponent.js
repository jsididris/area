import React from 'react';
import { inject, observer } from 'mobx-react';
import ViewEnum from '../enums/ViewEnum';

import LoadComponent from "./LoadComponent";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import HomeComponent from "./HomeComponent";
import AddServiceComponent from "./ServiceComponent/AddServiceComponent";
import AddAreaComponent from "./AreaComponent/AddAreaComponent";
import AccountComponent from "./HomeComponent/AccountComponent"

@inject('ApplicationStore')
@observer
export default class RouterComponent extends React.Component {
	// *TODO* Remove this if tree with map of components & route
	render() {
		const ApplicationStore = this.props.ApplicationStore;
		let currentComponent = <LoadComponent />;

		if (ApplicationStore.currentView === ViewEnum.LOGIN) currentComponent = <LoginComponent />;
		else if (ApplicationStore.currentView === ViewEnum.REGISTER) currentComponent = <RegisterComponent />;
		else if (ApplicationStore.currentView === ViewEnum.HOME) currentComponent = <HomeComponent />;
		else if (ApplicationStore.currentView === ViewEnum.SERVICE_ADD) currentComponent = <AddServiceComponent />;
		else if (ApplicationStore.currentView === ViewEnum.AREA_ADD) currentComponent = <AddAreaComponent />;
		else if (ApplicationStore.currentView === ViewEnum.ACCOUNT) currentComponent = <AccountComponent />;
		return currentComponent;
	}
}