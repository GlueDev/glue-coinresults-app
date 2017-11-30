import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

import Gradient from '../../components/ui/GradientComponent';

export default class ContainerComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    title: PropTypes.string.isRequired,
    body:  PropTypes.string.isRequired,
  };

  /**
   * Render the component.
   */
  render () {
    return (
      <Gradient style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.body}>{this.props.body}</Text>
      </Gradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    paddingTop:     40,
    alignItems:     'center',
    justifyContent: 'center',
  },

  title: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
    fontSize:        30,
    fontWeight:      'bold',
    marginBottom: 50,
  },

  body: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
    textAlign:       'justify',
    lineHeight: 23,
    fontWeight: '100',
    padding: 30,
  },
});
