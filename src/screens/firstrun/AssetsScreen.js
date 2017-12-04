import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';
import { toJS } from 'mobx';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Container from '../../components/firstrun/ContainerComponent';

import Finance from '../../utils/Finance';

@inject('cryptos') @observer
export default class AssetsScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden:          true,
    screenBackgroundColor: 'transparent',
  };

  /**
   * Define the possible props.
   */
  static PropTypes = {
    portfolioName: PropTypes.string.isRequired,
  };

  /**
   * Show the asset modal.
   */
  addAsset = () => {
    this.props.navigator.showModal({
      screen: 'CR.FR.AddTickerScreen',

      passProps: {
        portfolioName: this.props.portfolioName,
      },
    });
  };

  /**
   * Remove an asset.
   */
  removeAsset = (asset) => {
    this.props.cryptos.removeAsset(this.props.portfolioName, asset.ticker);
  };

  /**
   * Save the portfolio to iCloud.
   */
  savePortfolio = () => {
    this.props.cryptos.saveStore();
  };

  /**
   * Render the action.
   */
  renderAction = () => (
    <View style={styles.actionContainer}>
      <FlatList
        data={toJS(this.props.cryptos.getPortfolio(this.props.portfolioName).assets)}
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
        onPress:         () => {this.removeAsset(item)},
      },
    ];

    return (
      <Swipeout
        sensitivity={20}
        backgroundColor={'transparent'}
        right={listItemButton}>
        <View style={styles.listItem}>
          <Text style={styles.listItemTicker}>{item.ticker}</Text>
          <Text style={styles.listItemAmount}>{Finance.formatCrypto(item.amount)}</Text>
        </View>
      </Swipeout>
    );
  };

  /**
   * Render the component.
   */
  render () {
    const assets = this.props.cryptos.portfolios[0].assets;
    let body     = '', action;
    let buttons = [{text: 'Add asset', onPress: this.addAsset}];

    if (assets === undefined || !assets.length) {
      body = 'Add at least one asset to your portfolio.';
    } else {
      body   = 'The following asset(s) have been added to your portfolio. Swipe right to remove' +
        ' an asset.';
      action = this.renderAction();
      buttons.push({text: 'Continue', onPress: this.savePortfolio});
    }

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
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
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
