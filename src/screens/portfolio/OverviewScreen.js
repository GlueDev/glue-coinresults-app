import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

@inject('user', 'cryptos') @observer
export default class OverviewScreen extends Component {
  testPress = async () => {
    this.props.cryptos.createOrUpdateAsset('Johnny', {
      ticker: 'NEO',
      amount: 100,
    });
  };

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.testPress}>
          <Text style={{marginTop: 50}}>{this.props.user.currency}</Text>
          <Text style={{marginTop: 10}}>{this.props.cryptos.portfolioTotalValue('Johnny')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
