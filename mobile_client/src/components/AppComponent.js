import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import MainComponent from './MainComponent';
import * as stores from '../stores';

class AppComponent extends Component {
	render() {
		return (
			<Provider {...stores}>
				<MainComponent />
			</Provider>
		);
	}
}

export default AppComponent;
