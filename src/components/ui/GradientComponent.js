import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Gradient from 'react-native-linear-gradient';

export default class GradientComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    colors: PropTypes.array,
  };

  /**
   * Define default colors if they are not provided as props.
   */
  constructor (props) {
    super(props);
    this.colors = ['#489ED1', '#9974E6'];

    if (!Object.is(this.props.colors, undefined)) {
      this.colors[0] = this.props.colors[0];
      this.colors[1] = this.props.colors[1];
    }
  }

  /**
   * Render the component's view.
   */
  render = () => (
    <Gradient
      colors={this.colors}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={this.props.style}>
      {this.props.children}
    </Gradient>
  );
}
