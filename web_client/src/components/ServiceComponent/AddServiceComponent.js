import React from "react";
import {Alert, Button, Card, Col, Icon, Input, Layout, Menu, Row} from "antd";
import {inject, observer} from "mobx-react";
import LoadComponent from "../LoadComponent";

import Backend from "../../Backend";

const {Header, Sider, Content} = Layout;

@inject('ApplicationStore')
@observer
export default class AddServiceComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			services: [],
			loading: true
		};

		this.handleGoBack = this.handleGoBack.bind(this);
		this.handleAddService = this.handleAddService.bind(this);
	}

	async componentDidMount() {
		const services = await Backend.getAvailableServices();
		this.setState({services: services.services, loading: false});
	}

	handleGoBack() {
		this.props.ApplicationStore.setHomeView();
	}

	async handleAddService(name) {
		this.setState({loading: true});
		const redirect = await Backend.getServiceRedirect(name);

		sessionStorage.setItem("service_add", name);
		if (redirect.link !== null)
			document.location = redirect.link;
		else
			document.location = location.href + "?noauth=1";
	}

	render() {
		const ApplicationStore = this.props.ApplicationStore;
		if (this.state.loading) {
			return <LoadComponent />
		}

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
								<h1>Choose service to add:</h1>
								<Row gutter={16}>
								{ this.state.services.map((service, i) => {
									return (
										<Col span={6} key={i}>
											<Card
												onClick={() => this.handleAddService(service.name)}
												hoverable={true}
												style={{ width: 300, marginBottom: 20 }}
												cover={
													<div style={{textAlign: "center", marginTop: 10, borderBottom: "solid", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#e8e8e8"}}>
														<img src={service.logoUrl} style={{width: 60, height: 60}} />
													</div>}
											>
												<Card.Meta
													title={service.litteralName}
													description={service.description}
												/>
											</Card>
										</Col>
									)
								})}
								</Row>
							</Col>
						</Row>
					</Content>
				</Layout>
			</Layout>
		)
	}
}