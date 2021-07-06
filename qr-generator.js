import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  CameraRoll
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ToastAndroid } from 'react-native';
var RNFS = require('react-native').NativeModules.RNFS;
import * as WebBrowser from 'expo-web-browser';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';
import saveQrToDisk from './qrsaver';
import colors from './colors';

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
      file: '',
    };
  }
  render() {
    var setText = (e) => {
      var text = e;

      if (text !== null) {
        if (text !== '' && text !== 'your value for qr code') {
          this.setState({ usersvalue: text });
        }
      }
    };
    var setColor = (e, state) => {
      var text = e.toLowerCase().trim();
      if (colors.includes(text)) {
        if (text !== '' && text !== 'your value for qr code') {
          this.setState({ userscodestyle: text });
        }
      } else {
        this.setState({ userscodestyle: 'black' });
      }
    };
    var setBgColor = (e, state) => {
      var text = e.toLowerCase().trim();
      if (colors.includes(text)) {
        if (text !== '' && text !== 'your value for qr code') {
          this.setState({ usersbackgroundcolor: text });
        }
      } else {
        this.setState({ usersbackgroundcolor: 'white' });
      }
    };
    var getData = (val) => {
      console.log(val.target);

      if (this.state.usersvalue !== '') {
        this.setState({ usersvalue: val.target.value });
      } else {
        this.setState({ usersvalue: 'please enter some text' });
      }
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.subContainer}>
            <TextInput
              style={styles.input}
              onTextInput={(e) => {
                setText(e.nativeEvent.text);
              }}
            />
            <Text style={styles.displayTextS}>{this.state.usersvalue}</Text>
            <Text
              style={[
                styles.displayTextS,
                { marginTop: 50, marginBottom: 15 },
              ]}>
              Type your Colour
            </Text>
            <TextInput
              style={styles.input}
              onTextInput={(e) => {
                setColor(e.nativeEvent.text);
              }}
            />
            <Text
              style={[
                styles.displayTextS,
                { marginTop: 50, marginBottom: 15 },
              ]}>
              Type your Backgroud Colour
            </Text>
            <TextInput
              style={styles.input}
              onTextInput={(e) => {
                setBgColor(e.nativeEvent.text);
              }}
            />
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
                value={this.state.usersvalue}
              />
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
