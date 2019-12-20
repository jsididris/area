import {observable, action, computed, runInAction} from 'mobx';
import { message } from 'antd';
import Backend from '../Backend';

export class AreaStore {
	@observable areas = [];
	@observable addStep = 0;
	@observable addName = null;
	@observable addFetchInterval = null;
	@observable addActions = null;
	@observable addReactionsForActionIndex = 0;

	@action async fetchAreas() {
		try {
			const areas = await Backend.getAreas();
			runInAction(() => {
				this.areas = areas.areas;
				this.error = null;
			});
		} catch (exception) {
			runInAction(() => {
				this.areas = [];
				this.error = exception.message;
			});
		}
	}

	@action async deleteArea(id, name) {
		try {
			await Backend.deleteArea(id);
			const areas = await Backend.getAreas();
			runInAction(() => {
				message.success('Area ' + name + ' successfully deleted');
				this.areas = areas.areas;
				this.error = null;
			});
		} catch (exception) {
			runInAction(() => {
				this.areas = [];
				this.error = exception.message;
			});
		}
	}

	@action configureNewArea(name, fetchInterval) {
		this.addName = name;
		this.addFetchInterval = fetchInterval;
		this.addStep = 1;
		this.addReactionsForActionIndex = 0;
	}

	@action setActionsOfNewArea(actions) {
		this.addActions = actions;
		this.addReactionsForActionIndex = 0;
		this.addStep = 2;
	}

	@action setReactionsOfNewArea(reactions) {
		this.addActions[this.addReactionsForActionIndex].reactions = reactions;
		if ((this.addReactionsForActionIndex + 1) >= this.addActions.length) {
			this.addStep = 3;
		} else {
			this.addReactionsForActionIndex++;
		}
	}

	@action creationBack() {
		this.addStep = this.addStep - 1;
		this.addReactionsForActionIndex = 0;
	}

	@action async addArea() {
		try {
			await Backend.addArea(this.addName, this.addFetchInterval, this.addActions);
			runInAction(() => {
				message.success('Area ' + this.addName + ' successfully added');
				this.addReactionsForActionIndex = 0;
				this.addStep = 0;
				this.addName = null;
				this.addFetchInterval = null;
				this.addActions = null;
				this.addReactionsForActionIndex = 0;
			});
		} catch (exception) {
			runInAction(() => {
				this.error = exception.message;
			});
		}
	}

}

const store = new AreaStore();
export default store;