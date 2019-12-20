import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import MainComponent from './components/MainComponent';
import * as stores from './stores';

class App extends Component {
  render() {
	return (
	  <Provider {...stores}>
		<MainComponent />
	  </Provider>
	);
  }
}

export default App;
