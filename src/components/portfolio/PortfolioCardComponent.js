import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../Colors.json';

import Finance from '../../utils/Finance';

class AssetCardComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    portfolio: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  /**
   * Navigate action
   */
  navigateTo = () => {
    const portfolioName = this.props.portfolio.name;
    this.props.navigator.push({
      screen: 'CR.PF.DetailsScreen',

      passProps: {
        portfolioName: this.props.portfolio.name,
      },
    });
  };

  /**
   * Render the view.
   */
  render = () => (
    <TouchableWithoutFeedback onPress={this.navigateTo}>
      <View style={styles.container}>
        <Text style={[styles.assetName, {color: Colors[2]}]}>Diederik</Text>

        <View style={styles.assetValueView}>
          <Text style={[styles.assetValueInFIAT, {color: Colors[2]}]}>
            {Finance.formatFIAT(32564.41)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius:    4,

    width:         '92%',
    padding:       20,
    paddingTop:    30,
    paddingBottom: 30,

    marginLeft:   '4%',
    marginRight:  '4%',
    marginBottom: 20,

    shadowColor:   '#929191',
    shadowOpacity: 0.25,
    shadowOffset:  {width: 0, height: 5},
    shadowRadius:  10,
  },

  graphContainer: {
    position: 'absolute',
    width:    345,
    height:   110,
  },

  assetName: {
    backgroundColor: 'transparent',
    fontWeight:      'bold',
    color:           '#FF0000',
  },

  assetValueView: {
    flexDirection: 'row',
    alignItems:    'center',

    marginTop:    10,
    marginBottom: 10,
  },

  assetValueInFIAT: {
    backgroundColor: 'transparent',
    fontSize:        18,
    fontWeight:      'bold',
  },

  assetValueInCrypto: {
    backgroundColor: 'transparent',
    fontSize:        12,
    fontWeight:      '100',

    marginLeft: 10,
  },
};

export default AssetCardComponent;
