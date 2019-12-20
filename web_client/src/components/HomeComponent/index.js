import React from "react";
import {Alert, Button, Col, Icon, Input, Layout, Menu, Row} from "antd";
import {inject, observer} from "mobx-react";
import Backend from "../../Backend";
import LoadComponent from "../LoadComponent";
import {Card} from "antd/lib/card";
import ServiceComponent from "./ServiceComponent";
import {AreaStore} from "../../stores/AreaStore";
import AreaComponent from "./AreaComponent";
import AccountComponent from "./AccountComponent"

const {Header, Sider, Content} = Layout;

@inject('ApplicationStore')
@inject('ServiceStore')
@inject('AreaStore')
@observer
export default class LoginComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true
		};

		this.displayNewService = this.displayNewService.bind(this);
		this.displayNewArea = this.displayNewArea.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleOpenSettings = this.handleOpenSettings.bind(this);
	}

	async componentDidMount() {
		await this.props.ServiceStore.fetchServices();
		await this.props.AreaStore.fetchAreas();

		this.setState({loading: false});
	}

	displayNewService() {
		this.props.ApplicationStore.setServiceAddView();
	}

	displayNewArea() {
		this.props.ApplicationStore.setAreaAddView();
	}

	async handleLogout() {
		await this.props.ApplicationStore.logout();
	}

	handleOpenSettings() {
		this.props.ApplicationStore.setAccountView();
	}

	render() {
		const ApplicationStore = this.props.ApplicationStore;
		const ServiceStore = this.props.ServiceStore;
		const AreaStore = this.props.AreaStore;

		if (this.state.loading) {
			return <LoadComponent />
		}

		return (
			<Layout style={{minHeight: '100vh'}}>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Row>
							<Col className="gutter-row" xs={2} sm={4} md={6} lg={8} xl={10} style={{display: "flex", justifyContent: "center"}}>
								<Button type="primary" icon="setting" style={{marginTop: 15}} onClick={this.handleOpenSettings}>Settings</Button>
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
								<h1>Your services <Button type="dashed" size={"small"} onClick={this.displayNewService}>new</Button></h1>
								<Row gutter={16} style={{marginBottom: 20}}>
									{ ServiceStore.services.map((service, i) => { return (<ServiceComponent key={i} service={service} />) })}
								</Row>

								<h1>Your AREAs <Button type="dashed" size={"small"} onClick={this.displayNewArea}>new</Button></h1>
								<Row gutter={16} style={{marginBottom: 20}}>
									{ AreaStore.areas.map((area, i) => { return (<AreaComponent key={i} area={area} />) })}
								</Row>

							</Col>
						</Row>
					</Content>
				</Layout>
			</Layout>
		)
	}
}