import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

@inject('user', 'cryptos') @observer
export default class OverviewScreen extends Component {
  testPress = async () => {
  };

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.testPress}>
          <Text style={{marginTop: 50}}>{this.props.user.currency}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
