import React from "react";
import {inject, observer} from "mobx-react";
import {View, Text} from "react-native";
import {Button, Steps} from "@ant-design/react-native";

import AddAreaConfigureComponent from "./AddAreaConfigureComponent";
import AddAreaActionsComponent from "./AddAreaActionsComponent";
import AddAreaReactionsComponent from "./AddAreaReactionsComponent";

@inject('ApplicationStore')
@inject('AreaStore')
@observer
export default class AddAreaComponent extends React.Component {
	constructor() {
		super();
		this.handleGoBack = this.handleGoBack.bind(this);
	}

	handleGoBack() {
		this.props.ApplicationStore.setHomeView();
	}

	render() {
		const ApplicationStore = this.props.ApplicationStore;
		const AreaStore = this.props.AreaStore;

		let currentStepComponent = <AddAreaConfigureComponent/>;
		if (AreaStore.addStep === 1) currentStepComponent = <AddAreaActionsComponent/>;
		else if (AreaStore.addStep === 2) currentStepComponent = <AddAreaReactionsComponent/>;

		return (
			<View style={{flex: 1, width: "100%", marginTop: 20}}>
				<View style={{backgroundColor: "white", padding: 10 , position: "relative", left: "10%"}}>
					<Steps current={AreaStore.addStep} direction={"horizontal"} size={"small"}>
						<Steps.Step title={<Text style={{marginTop: 10}}>Config</Text>}/>
						<Steps.Step title={<Text style={{marginLeft: -30}}>Actions</Text>} />
						<Steps.Step title={<Text style={{marginLeft: -30}}>Reactions</Text>} />
					</Steps>
				</View>
				{currentStepComponent}
			</View>
		)
	}
}