import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

@inject('user', 'cryptos') @observer
export default class OverviewScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  async componentWillMount() {
    await this.props.cryptos.getRates();
  }

  render () {
    return (
      <TouchableOpacity onPress={() => {
        this.props.cryptos.createOrUpdateAsset('Diederik', {ticker: 'XRP', amount: 1200});
        // this.props.cryptos.getRates();
      }}>
        <View>
          <Text style={{marginTop: 100, marginLeft: 40}}>{this.props.cryptos.getPortfolio('Diederik').assets[0].amount}</Text>
          <Text style={{marginTop: 10,  marginLeft: 40}}>{this.props.cryptos.totalValues[0].value}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
