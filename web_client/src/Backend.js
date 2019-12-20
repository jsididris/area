class Backend {
	auth = false;
	token = null;

	constructor() {
		const domain = document.domain;
		if (domain === "testarea.thedoux.fr") {
			this.endpoint = "https://testareaapi.thedoux.fr";
		} else if (domain === "area.thedoux.fr") {
			this.endpoint = "https://apiarea.thedoux.fr";
		} else {
			this.endpoint = "http://127.0.0.1:8080";
		}
	}

	setToken(token) {
		this.token = token;
	}

	async me() {
		const response = await fetch(this.endpoint + "/user/me", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const user = await response.json();
		if (user.errorDescription) throw new Error(error.errorDescription);

		return user;
	}

	async authenticate(username, password) {
		const response = await fetch(this.endpoint + "/login", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username, password})
		});

		const data = await response.json();
		if (data.errorDescription) throw new Error(data.errorDescription);

		this.auth = true;
		this.token = data.token;
		localStorage.setItem('token', this.token);
	}

	async register(username, email, password) {
		const response = await fetch(this.endpoint + "/register", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username, email, password})
		});

		const data = await response.json();
		if (data.errorDescription) throw new Error(data.errorDescription);
	}

	async getAvailableServices() {
		const response = await fetch(this.endpoint + "/available/services", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const services = await response.json();
		if (services.errorDescription) throw new Error(services.errorDescription);

		return services;
	}

	async getAvailableActions() {
		const response = await fetch(this.endpoint + "/available/actions", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const actions = await response.json();
		if (actions.errorDescription) throw new Error(actions.errorDescription);

		return actions;
	}

	async getAvailableReactions() {
		const response = await fetch(this.endpoint + "/available/reactions", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const reactions = await response.json();
		if (reactions.errorDescription) throw new Error(actions.errorDescription);

		return reactions;
	}

	async getServiceRedirect(name) {
		const response = await fetch(this.endpoint + "/service-redirect?serviceName=" + name, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const redirect = await response.json();
		if (redirect.errorDescription) throw new Error(redirect.errorDescription);

		return redirect;
	}

	async addService(serviceName, grantData) {
		const response = await fetch(this.endpoint + "/service", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`
			},
			body: JSON.stringify({name: serviceName, serviceName, grantData})
		});

		const service = await response.json();
		if (service.errorDescription) throw new Error(service.errorDescription);

		return service;
	}

	async getServices() {
		const response = await fetch(this.endpoint + "/services", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const services = await response.json();
		if (services.errorDescription) throw new Error(services.errorDescription);

		return services;
	}

	async deleteService(id) {
		const response = await fetch(this.endpoint + "/service/" + id, {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const service = await response.json();
		if (service.errorDescription) throw new Error(service.errorDescription);

		return service;
	}

	async addArea(name, fetchTime, actions) {
		const response = await fetch(this.endpoint + "/area", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`
			},
			body: JSON.stringify({name, fetch_time: fetchTime * 1000, actions})
		});

		const area = await response.json();
		if (area.errorDescription) throw new Error(area.errorDescription);

		return area;
	}

	async getAreas() {
		const response = await fetch(this.endpoint + "/areas", {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});

		const areas = await response.json();
		if (areas.errorDescription) throw new Error(areas.errorDescription);

		return areas;
	}

	async deleteArea(id) {
		await fetch(this.endpoint + "/area/" + id, {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
		});
	}

	async updateUser(oldPassword, newPassword, email) {
		const response = await fetch(this.endpoint + "/user/me", {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`
			},
			body: JSON.stringify({oldPassword, newPassword, email})
		});

		const user = await response.json();
		if (user.errorDescription) throw new Error(user.errorDescription);

		return user;
	}

	async validateUser(token) {
		const response = await fetch(this.endpoint + "/validate", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`
			},
			body: JSON.stringify({token})
		});

		const user = await response.json();
		if (user.errorDescription) throw new Error(user.errorDescription);

		return user;
	}


	async logout() {
		this.token = null;
		localStorage.removeItem('token');
	}
}

const backend = new Backend();
export default backend;