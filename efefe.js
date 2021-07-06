import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CameraRoll, ToastAndroid } from 'react-native';
var RNFS = require('react-native').NativeModules.RNFS;
import * as WebBrowser from 'expo-web-browser';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';
import saveQrToDisk from './qrsaver';
var history = [];
var value1;
var text = 'please enter some text';
export default class QRCodeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      usersvalue: 'please enter some text',
      userscodestyle: 'black',
      userssize: 100,
      usersbackgroundcolor: 'white',
    };
  }
  promptText = () => {
    text = window.prompt('your value for qr code');
    if (text !== null) {
      if (text !== ''&&text !== 'your value for qr code') {
        this.setState({ usersvalue: text });
      }
    }
  };
  getData = (val) => {
    console.log(val.target);

    if (this.state.usersvalue !== '') {
      this.setState({ usersvalue: val.target.value });
    } else {
      this.setState({ usersvalue: 'please enter some text' });
    }
  };

  render() {
    const saveQrToDisk = () => {
      this.qr.toDataURL((data) => {
        RNFS.writeFile(
          RNFS.CachesDirectoryPath + '/some-name.png',
          data,
          'base64'
        )
          .then((success) => {
            return CameraRoll.saveToCameraRoll(
              RNFS.CachesDirectoryPath + '/some-name.png',
              'photo'
            );
          })
          .then(() => {
            this.setState({ busy: false, imageSaved: true });
            ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT);
          });
      });
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.subContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.promptText();
              }}>
              <Text style={styles.buttonText}>
                Give a value for your QR Code
              </Text>
            </TouchableOpacity>
            <Text style={styles.displayTextS}>
              Your QRCodes value: {this.state.usersvalue}
            </Text>

            <Text
              style={[
                styles.displayTextS,
                { marginTop: 50, marginBottom: 15 },
              ]}>
              Select your Colour
            </Text>
            <select
              name="colorsele"
              onChange={(e) => {
                this.state.usersbackgroundcolor !== e.target.value
                  ? this.setState({ userscodestyle: e.target.value })
                  : alert(
                      `Your Code: "${this.state.usersvalue}" Will Be Hidden If You Select Same Colours For Background And Code.`
                    );
              }}>
              <option value="black">Color</option>
              <option value="black">Default</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="indigo">Indigo</option>
              <option value="violet">Violet</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
              <option value="cyan">Cyan</option>
              <option value="magenta">Magenta</option>
              <option value="powderblue">Powder Blue</option>
              <option value="lightblue">Light Blue</option>
              <option value="yellow">Yellow</option>
              <option value="pink">Pink</option>
            </select>
            <Text style={styles.displayTextS}>Default is Black</Text>
            <Text style={styles.displayTextS}>
              Select Your Background Color
            </Text>
            <select
              name="backcolorsele"
              onChange={(e) => {
                this.state.usersbackgroundcolor !== e.target.value
                  ? this.setState({ usersbackgroundcolor: e.target.value })
                  : alert(
                      `Your Code: "${this.state.usersvalue}" Will Be Hidden If You Select Same Colours For Background And Code.`
                    );
              }}>
              <option value="white">Color</option>
              <option value="white">Default</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="indigo">Indigo</option>
              <option value="violet">Violet</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
              <option value="cyan">Cyan</option>
              <option value="magenta">Magenta</option>
              <option value="powderblue">Powder Blue</option>
              <option value="lightblue">Light Blue</option>
              <option value="yellow">Yellow</option>
              <option value="pink">Pink</option>
            </select>
            <Text style={styles.displayTextS}>Default is White</Text>
            <Text style={styles.displayTextS}>Your QRCode: </Text>
            <View style={[styles.qrcode, { marginLeft: -2, marginBottom: 80 }]}>
              <QRCode
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 50,
                }}
                getRef={(c) => (this.qr = c)}
                color={this.state.userscodestyle}
                backgroundColor={this.state.usersbackgroundcolor}
                value={text}
              />
              <TouchableOpacity
                onPress={() => {
                  this.qr.toDataURL((data) => {
                    RNFS.writeFile(
                      'Downloads/' + '/some-name.png',
                      data,
                      'base64'
                    )
                      .then((success) => {
                        return CameraRoll.saveToCameraRoll(
                          'Downloads/' + '/some-name.png',
                          'photo'
                        );
                      })
                      .then(() => {
                        ToastAndroid.show(
                          'Saved to gallery !!',
                          ToastAndroid.SHORT
                        );
                      });
                  });
                }}>
                <Text>dewdwedw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 15,
    backgroudColor: 'red',
    borderColor: 'darkgreen',
    marginTop: 50,
    width: 200,
    height: 50,
  },
  button1: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 15,
    backgroudColor: 'red',
    borderColor: 'darkgreen',
    marginTop: 600,
    width: 200,
    height: 50,
  },
  subContainer: {
    marginTop: 50,
    flex: 1,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  qrcode: {
    marginTop: 15,
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    width: 250,
    height: 25,
    textAlign: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'darkblue',
  },
  displayTextS: {
    color: 'black',
    fontWeight: 'bolder',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 2,
    width: 200,
    textAlign: 'center',
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
});
