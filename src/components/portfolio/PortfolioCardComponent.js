import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient, Stop } from 'react-native-svg';
import { AreaChart } from 'react-native-svg-charts';

import Finance from '../../utils/Finance';

class AssetCardComponent extends Component {
  /**
   * Render the view.
   */
  render = () => (
    <View style={styles.container}>
      <Text style={[styles.assetName, {color: '#000'}]}>Diederik</Text>

      <View style={styles.assetValueView}>
        <Text style={[styles.assetValueInFIAT, {color: '#000'}]}>
          {Finance.formatFIAT(32564.41)}
        </Text>
      </View>
    </View>
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
