import React from "react";
import {Alert, Button, Card, Col, Icon, Input, Layout, Menu, Row, Steps} from "antd";
import {inject, observer} from "mobx-react";
import LoadComponent from "../LoadComponent";

import Backend from "../../Backend";
import AddAreaConfigureComponent from "./AddAreaConfigureComponent";
import AddAreaActionsComponent from "./AddAreaActionsComponent";
import AddAreaReactionsComponent from "./AddAreaReactionsComponent";
import AddAreaConfirmationComponent from "./AddAreaConfirmationComponent";

const {Header, Sider, Content} = Layout;

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

		let currentStepComponent = <AddAreaConfigureComponent />;
		if (AreaStore.addStep === 1) currentStepComponent = <AddAreaActionsComponent />;
		else if (AreaStore.addStep === 2) currentStepComponent = <AddAreaReactionsComponent />;
		else if (AreaStore.addStep === 3) currentStepComponent = <AddAreaConfirmationComponent />;

		return (
			<Layout style={{minHeight: '100vh'}}>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Row>
							<Col className="gutter-row" xs={2} sm={4} md={6} lg={8} xl={10} style={{display: "flex", justifyContent: "center"}}>
								<Button type="primary" icon="home" style={{marginTop: 15}} onClick={this.handleGoBack}>Back</Button>
							</Col>
							<Col className="gutter-row" xs={20} sm={16} md={12} lg={8} xl={4}>
								<h1 style={{fontWeight: 200, fontSize: 17}}>Welcome {ApplicationStore.currentUser.username}</h1>
							</Col>
							<Col className="gutter-row" xs={2} sm={4} md={6} lg={8} xl={10} style={{display: "flex", justifyContent: "center"}}>
								<Button type="danger" icon="logout" style={{marginTop: 15}} onClick={this.handleLogout}>Logout</Button>
							</Col>
						</Row>
					</Header>
					<Content style={{marginTop: 20}}>
						<Row>
							<Col span={20} offset={2} style={{backgroundColor: "white", minHeight: 600, padding: 20}}>
								<h1>Add an AREA:</h1>
								<Steps current={AreaStore.addStep}>
									<Steps.Step title="Configuration" description="Choose name & fetch interval." />
									<Steps.Step title="Action(s)" description="Pick actions." />
									<Steps.Step title="Reaction(s)" description="Pick reactions." />
									<Steps.Step title="Confirmation" description="Double check your future AREA." />
								</Steps>
								{ currentStepComponent }
							</Col>
						</Row>
					</Content>
				</Layout>
			</Layout>
		)
	}
}