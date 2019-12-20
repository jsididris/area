import React from "react";
import {inject, observer} from "mobx-react";
import {List} from "@ant-design/react-native";
import {Alert} from "react-native";

@inject('AreaStore')
@observer
export default class AreaComponent extends React.Component {
	constructor() {
		super();
		this.handleAskRemoveArea = this.handleAskRemoveArea.bind(this);
		this.handleRemoveArea = this.handleRemoveArea.bind(this);
	}

	async handleAskRemoveArea(id, name) {
		Alert.alert(name, 'Do you really want to remove this AREA ?', [
			{text: 'No', style: 'cancel'},
			{ text: 'Yes', onPress: () => this.handleRemoveArea(id, name) }
		]);
	}

	async handleRemoveArea(id, name) {
		const AreaStore = this.props.AreaStore;
		await AreaStore.deleteArea(id, name);
	}

	render() {
		const area = this.props.area;
		return (
			<List.Item
				extra={area.fetch_time / 1000 + " seconds interval"}
				onPress={() => this.handleAskRemoveArea(area.id, area.name)}
			>
				{area.name}
			</List.Item>
		)
	}
}