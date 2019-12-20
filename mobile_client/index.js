import '@babel/polyfill'
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppComponent from "./src/components/AppComponent";

AppRegistry.registerComponent(appName, () => AppComponent);
