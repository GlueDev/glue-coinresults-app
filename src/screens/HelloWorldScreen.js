import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react/native';

@inject('user') @observer
export default class HelloWorldScreen extends Component {
  render () {
    return (
      <View>
        <Text>{this.props.user.currency}</Text>
      </View>
    );
  }
}
