import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BackButtonComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label:   PropTypes.string,
  };

  /**
   * Render the view.
   */
  render = () => (
    <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
      <Icon
        name="ios-arrow-back"
        size={30}
        color="rgba(255, 255, 255, 0.65)"
        style={styles.backButton}/>
      <Text style={styles.label}>{this.props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:    'center',
    marginBottom: 10,
  },

  backButton: {
    backgroundColor: 'transparent',
  },

  label: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.65)',
    marginLeft:      10,
    paddingBottom:   3,
  },
});
