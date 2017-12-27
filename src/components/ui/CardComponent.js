import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class CardComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    style:    PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  /**
   * Render the view.
   */
  render = () => (
    <View style={[styles.container, this.props.style]}>
      {this.props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius:    4,
    width:           '92%',
    marginLeft:      '4%',
    marginRight:     '4%',
    marginBottom:    20,
    shadowColor:     '#929191',
    shadowOpacity:   0.25,
    shadowOffset:    {width: 0, height: 5},
    shadowRadius:    10,
  },
});
