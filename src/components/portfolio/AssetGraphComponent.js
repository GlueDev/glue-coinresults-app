import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient, Stop } from 'react-native-svg';
import { AreaChart } from 'react-native-svg-charts';

export default class AssetGraphComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    style:      PropTypes.number,
    dataPoints: PropTypes.array.isRequired,
    color:      PropTypes.string.isRequired,
  };

  /**
   * Calculate the grids.
   */
  constructor (props) {
    super(props);

    this.gridMin = Math.min.apply(Math, this.props.dataPoints) - Math.min.apply(Math, this.props.dataPoints) * 0.03;
    this.gridMax = Math.max.apply(Math, this.props.dataPoints) + Math.max.apply(Math, this.props.dataPoints) * 0.03;
  }

  /**
   * Render the view.
   */
  render = () => (
    <View style={[styles.container, this.props.style]}>
      <AreaChart
        dataPoints={this.props.dataPoints}
        gridMin={this.gridMin}
        gridMax={this.gridMax}
        showGrid={false}

        style={{width: '100%', height: '100%'}}
        contentInset={{top: 10, bottom: 0}}
        strokeColor={'transparent'}
        animate={false}

        renderGradient={({id}) => (
          <LinearGradient id={id} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
            <Stop offset={'0%'} stopColor={this.props.color} stopOpacity={0.5}/>
            <Stop offset={'100%'} stopColor={'#FFFFFF'} stopOpacity={0.4}/>
          </LinearGradient>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width:    '100%',
    height:   110,
  },
});
