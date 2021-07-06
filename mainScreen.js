import React from 'react';
import Detecter from './detecter';
import * as Device from 'expo-device';
import { TouchableOpacity, Text } from 'react-native';
import { isMobile, isIPad13, isChrome } from 'react-device-detect';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import QRCodeGenerator from './qr-generator';
import ScanScreen from './scanner';
import styles from './style';
import { View } from 'react-native';
import { Audio } from 'expo-av';
var AppNavigator = createSwitchNavigator({ S: ScanScreen, G: QRCodeGenerator });
const AppContainer = createAppContainer(AppNavigator);
export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { marginTop: 50 }]}>QR Code App</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              Device.osName !== 'Windows' &&
              Device.osName !== 'Linux' &&
              Device.osName.toLowerCase() !== 'mac'
            ) {
              this.props.navigation.navigate('G');
            } else {
              Audio.Sound.createAsync(
                { uri: 'http://soundbible.com/grab.php?id=1540&type=mp3' },
                { shouldPlay: true }
              );
              alert(
                'Oops, QR Code scanner is not compatible with this device, please use mobile iPad etc'
              );
            }
          }}>
          <Text style={styles.buttonText}>Generate QRCode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              Device.osName !== 'Windows' &&
              Device.osName !== 'Linux' &&
              Device.osName.toLowerCase() !== 'mac'
            ) {
              this.props.navigation.navigate('S');
            } else {
              Audio.Sound.createAsync(
                { uri: 'http://soundbible.com/grab.php?id=1540&type=mp3' },
                { shouldPlay: true }
              );
              alert(
                'Oops, QR Code scanner is not compatible with this device, please use mobile iPad etc'
              );
            }
          }}>
          <Text style={styles.buttonText}>Scan QRCode</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
