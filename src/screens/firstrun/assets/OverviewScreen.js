import Container from 'components/firstrun/ContainerComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import realm from 'realm';
import Finance from 'utils/Finance';

export default class AssetsOverviewScreen extends Component {
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
  static propTypes = {
    portfolioName: PropTypes.string.isRequired,
  };

  /**
   * Construct.
   */
  constructor (props) {
    super(props);

    this.state = {
      portfolio: realm.objectForPrimaryKey('Portfolio', this.props.portfolioName),
    };
  }

  /**
   * Remove listeners.
   */
  componentWillUnmount () {
    realm.removeAllListeners();
  }

  /**
   * Show the asset modal.
   */
  addAsset = () => {
    this.props.navigator.showModal({
      screen: 'CR.FR.Assets.SetTickerScreen',

      passProps: {
        portfolioName: this.props.portfolioName,
      },
    });
  };

  /**
   * Remove an asset.
   */
  removeAsset = (asset) => {
    try {
      realm.write(() => {
        realm.delete(asset);
      });
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Render the asset table.
   */
  renderTable = () => (
    <View style={styles.actionContainer}>
      <FlatList
        data={this.state.portfolio.assets}
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
          <Text style={styles.listItemAmount}>{Finance.formatCrypto(item.amount)}</Text>
        </View>
      </Swipeout>
    );
  };

  /**
   * Render the component.
   */
  render () {
    let body    = '', action;
    let buttons = [{text: 'Add asset', onPress: this.addAsset}];

    if (this.state.portfolio.assets === undefined || !this.state.portfolio.assets.length) {
      body = 'Add at least one asset to your portfolio.';
    } else {
      body   = 'The following asset(s) have been added to your portfolio. Swipe right to remove' +
        ' an asset.';
      action = this.renderTable();
      buttons.push({
        text: 'Continue', onPress: () => this.props.navigator.push({
          screen:    'CR.FR.Investments.SetAmountScreen',
          passProps: {
            portfolioName: this.props.portfolioName,
          },
        }),
      });
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
