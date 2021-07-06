import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import QRCodeGenerator from './qr-generator'
import ScanScreen from './scanner';
import MainScreen from './mainScreen'

var AppNavigator = createSwitchNavigator({ M:MainScreen,S: ScanScreen, G: QRCodeGenerator });
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return (
     <AppContainer/>
    );
  }
}
