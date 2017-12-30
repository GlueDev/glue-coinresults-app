import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AlertIOS,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';

import Container from '../../components/firstrun/ContainerComponent';

export default class CameraScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor (props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };
  }
  /**
   * Navigate to the next screen.
   */
  nextScreen = () => (
    this.props.navigator.resetTo({
      screen: 'CR.FR.Portfolio.AddScreen',
    })
  );

  onBarCodeRead(e) {
    if(e.type == Camera.constants.BarCodeType.qr) {
      console.log(
        "QR Found!",
        "Type: " + e.type + "\nData: " + e.data
      );

      // Todo: check if found data (e.g. json) is matching our format
      // Todo: vibrate perhaps?

      this.props.navigator.resetTo({
        screen: 'CR.PF.OverviewScreen',
      });

      this.state = null;
      // AlertIOS.alert("Type: " + e.type + "\nData: " + e.data);
    }
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
  }

  /**
   * Navigate to the next screen.
   */
  previousScreen = () => (
    this.props.navigator.resetTo({
      screen: 'CR.PF.OverviewScreen',
    })
  );

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: this.nextScreen},
    ];

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
        />
        <View style={styles.navigator}>
          <TouchableOpacity style={styles.touchable} onPress={this.previousScreen}>
            <Text style={styles.button}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  navigator: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'transparent',
    color:           '#489DD0',
    fontWeight:      'bold',
    textAlign:       'center',
    paddingTop:      12,
    paddingBottom:   12,
  },
  touchable: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    width:           300,
    shadowColor:     '#595959',
    shadowOpacity:   0.5,
    shadowOffset:    {width: 0, height: 2},
    shadowRadius:    4,
    borderRadius:    4,
    marginBottom:    20,
  },
});
