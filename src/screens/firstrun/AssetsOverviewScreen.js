import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';

import Container from '../../components/firstrun/ContainerComponent';

@inject('cryptos') @observer
export default class AssetsScreen extends Component {
  constructor () {
    super();
    this.state = {portfolioName: ''};
  }

  componentWillMount () {
    // This can actually be set as a prop from the previous screen.
    const firstPortfolio = this.props.cryptos.portfolios[0];
    this.setState({portfolioName: firstPortfolio.name});

    this.props.cryptos.createOrUpdateAsset(firstPortfolio.name, {ticker: 'BTC', amount: 3.15452});
    this.props.cryptos.createOrUpdateAsset(firstPortfolio.name, {ticker: 'ETH', amount: 12.14469});
    this.props.cryptos.createOrUpdateAsset(firstPortfolio.name, {ticker: 'XMR', amount: 50.0});
    this.props.cryptos.createOrUpdateAsset(firstPortfolio.name, {ticker: 'XRP', amount: 12418.311331});
  }

  nextScreen = () => {
    this.props.navigator.showModal({
      screen: 'CR.FR.AssetsAddScreen',
      title:  'Modal',
    });
  };

  /**
   * Render the action.
   */
  renderAction = () => (
    <View style={styles.actionContainer}>
      <FlatList
        data={this.props.cryptos.getPortfolio(this.state.portfolioName).assets}
        renderItem={this.renderListItem}
        keyExtractor={item => item.ticker}
      />
    </View>
  );

  /**
   * Render a list item.
   */
  renderListItem = ({item}) => {
    const listItemButton = [
      {
        text:            'Remove',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        onPress:         () => {this.removeAsset(item);},
      },
    ];

    return (
      <Swipeout
        sensitivity={20}
        backgroundColor={'transparent'}
        right={listItemButton}>
        <View style={styles.listItem}>
          <Text style={styles.listItemTicker}>{item.ticker}</Text>
          <Text style={styles.listItemAmount}>{item.amount}</Text>
        </View>
      </Swipeout>
    );
  };

  /**
   * Remove an asset.
   */
  removeAsset = (asset) => {
    this.props.cryptos.removeAsset(this.state.portfolioName, asset.ticker);
  };

  /**
   * Render the component.
   */
  render () {
    const assets = this.props.cryptos.portfolios[0].assets;
    let body     = '', action;

    if (assets === undefined || !assets.length) {
      body = 'Add at least one asset to your portfolio.';
    } else {
      body   = 'The following asset(s) have been added to your portfolio. Swipe right to remove' +
        ' an asset';
      action = this.renderAction();
    }

    const buttons = [
      {text: 'Add asset', onPress: this.nextScreen},
      {text: 'Continue', onPress: this.nextScreen},
    ];

    return (
      <Container
        title={'Add assets'}
        buttons={buttons}
        action={action}
        body={body}/>
    );
  }
}

const styles = StyleSheet.create({
  actionContainer: {
    width:  300,
    height: 160,
  },

  listItem: {
    backgroundColor:   'transparent',
    flexDirection:     'row',
    alignItems:        'center',
    padding:           12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, .3)',
  },

  listItemTicker: {
    width:      75,
    color:      '#FFF',
    fontWeight: 'bold',
    fontSize:   14,
  },

  listItemAmount: {
    color:    '#FFF',
    fontSize: 12,
  },
});
