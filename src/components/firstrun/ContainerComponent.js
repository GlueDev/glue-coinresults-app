import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Gradient from '../../components/ui/GradientComponent';

export default class ContainerComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    title:   PropTypes.string.isRequired,
    body:    PropTypes.string.isRequired,
    buttons: PropTypes.array.isRequired,
  };

  /**
   * Render the component.
   */
  render () {
    return (
      <Gradient style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.body}>{this.props.body}</Text>

        <View style={styles.buttonContainer}>
          {this.props.buttons.map((button, i) => (
            <TouchableOpacity style={styles.touchable} onPress={button.onPress} key={i}>
              <Text style={styles.button}>Hello!</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom:    50,
  },

  body: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
    textAlign:       'justify',
    lineHeight:      23,
    fontWeight:      '100',
    padding:         30,
  },

  buttonContainer: {
    marginTop: 60,
  },

  touchable: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    width:           300,
    shadowColor:     '#595959',
    shadowOpacity:   0.5,
    shadowOffset:    {width: 0, height: 2},
    shadowRadius:    4,
    borderRadius:    4,
    marginBottom:    20,
  },

  button: {
    backgroundColor: 'transparent',
    color:           '#489DD0',
    fontWeight:      'bold',
    textAlign:       'center',
    paddingTop:      12,
    paddingBottom:   12,
  },
});
