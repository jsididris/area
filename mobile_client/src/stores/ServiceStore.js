import {observable, action, computed, runInAction} from 'mobx';
import Backend from '../Backend';

export class ServiceStore {
	@observable services = [];
	@observable error = null;

	@action async fetchServices() {
		try {
			const services = await Backend.getServices();
			runInAction(() => {
				this.services = services.services;
				this.error = null;
			});
		} catch (exception) {
			runInAction(() => {
				this.services = [];
				this.error = exception.message;
			});
		}
	}

	@action async addService(name, params) {
		try {
			await Backend.addService(name, params);
			runInAction(() => {
			});
		} catch (exception) {
			runInAction(() => {
				this.error = exception.message;
			});
		}
	}

	@action async deleteService(id, name) {
		try {
			await Backend.deleteService(id);
			const services = await Backend.getServices();
			runInAction(() => {
				this.services = services.services;
				this.error = null;
			});
		} catch (exception) {
			runInAction(() => {
				this.services = [];
				this.error = exception.message;
			});
		}
	}
}

const store = new ServiceStore();
export default store;