import React from "react";
import {Col, Icon, Card} from "antd";
import {inject, observer} from "mobx-react";

@inject('ServiceStore')
@observer
export default class ServiceComponent extends React.Component {
	constructor() {
		super();
		this.handleRemoveService = this.handleRemoveService.bind(this);
	}

	async handleRemoveService(id, name) {
		const ServiceStore = this.props.ServiceStore;
		await ServiceStore.deleteService(id, name);
	}

	render() {
		const service = this.props.service;
		return (
			<Col span={6}>
				<Card
					style={{ width: 300, marginBottom: 20 }}
					cover={
						<div style={{textAlign: "center", marginTop: 10, borderBottom: "solid", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#e8e8e8"}}>
							<img src={service.logo_url} style={{width: 60, height: 60}} />
						</div>}
					actions={[<Icon type="delete" onClick={() => this.handleRemoveService(service.id, service.name)} />]}
				>
					<Card.Meta
						title={service.name}
						description={(service.token.username ? "Logged as " + service.token.username : "Without auth")}
					/>
				</Card>
			</Col>
		)
	}
}