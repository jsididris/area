import React from "react";
import {Col, Icon, Card} from "antd";
import {inject, observer} from "mobx-react";

@inject('AreaStore')
@observer
export default class AreaComponent extends React.Component {
	constructor() {
		super();
		this.handleRemoveArea = this.handleRemoveArea.bind(this);
	}

	async handleRemoveArea(id) {
		const AreaStore = this.props.AreaStore;
		await AreaStore.deleteArea(id, name);
	}

	render() {
		const area = this.props.area;
		return (
			<Col span={6}>
				<Card
					style={{ width: 300, marginBottom: 20 }}
					cover={
						<div style={{textAlign: "center", marginTop: 10, borderBottom: "solid", borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: "#e8e8e8"}}>
							<Icon type="robot" style={{fontSize: 40}} />
						</div>}
					actions={[<Icon type="delete" onClick={() => this.handleRemoveArea(area.id)} />]}
				>
					<Card.Meta
						title={area.name}
						description={area.fetch_time / 1000 + " seconds interval"}
					/>
				</Card>
			</Col>
		)
	}
}