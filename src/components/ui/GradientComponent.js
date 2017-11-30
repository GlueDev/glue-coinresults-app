import React, { Component } from 'react';
import Gradient from 'react-native-linear-gradient';

export default class GradientComponent extends Component {
  render () {
    // Define the colors if they are not set as props.
    let colors = ['#489ED1', '#9974E6'];
    if (!Object.is(this.props.colors, undefined)) {
      colors[0] = this.props.colors[0];
      colors[1] = this.props.colors[1];
    }

    return (
      <Gradient
        colors={colors}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={this.props.style}>
        {this.props.children}
      </Gradient>
    );
  }
}
