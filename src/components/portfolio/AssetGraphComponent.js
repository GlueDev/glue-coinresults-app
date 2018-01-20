import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
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
   * Shade HEX colors.
   *
   * @param color
   * @param percent
   *
   * @returns {string}
   */
  shadeColor = (color, percent) => {
    const f = parseInt(color.slice(1), 16),
          t = percent < 0 ? 0 : 255,
          p = percent < 0 ? percent * -1 : percent,
          R = f >> 16,
          G = f >> 8 & 0x00FF,
          B = f & 0x0000FF;
    return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B))
      .toString(16)
      .slice(1);
  };

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
        animate={false}

        svg={{
          fill:   this.shadeColor(this.props.color, 0.85),
          stroke: this.props.color,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:        '100%',
    height:       90,
    alignSelf:    'flex-end',
    borderRadius: 4,
    overflow:     'hidden',
  },
});
