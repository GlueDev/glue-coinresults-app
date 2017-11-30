import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

@inject('user') @observer
export default class OverviewScreen extends Component {
  testPress = async () => {
    this.props.user.setCurrency('EUR');
    this.props.user.setLastLogin();
    await this.props.user.saveStore();
  };

  componentWillMount () {
    this.props.user.loadStore();
  }

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.testPress}>
          <Text style={{marginTop: 50}}>{this.props.user.currency}</Text>
          <Text style={{marginTop: 10}}>{this.props.user.lastLogin}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
