import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CircleInputComponent from './CircleInputComponent';

export default class NumpadComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    style:   PropTypes.number,
    handler: PropTypes.func.isRequired,
  };

  /**
   * Render the view.
   * TODO: Replace the undo and clear actions with prettier icons.
   */
  render = () => (
    <View style={this.props.style}>
      <View style={styles.row}>
        <CircleInputComponent
          input={'1'}
          onPress={() => this.props.handler('add', 1)}
          style={styles.circleInput}/>
        <CircleInputComponent
          input={'2'}
          onPress={() => this.props.handler('add', 2)}
          style={styles.circleInput}/>
        <CircleInputComponent
          input={'3'}
          onPress={() => this.props.handler('add', 3)}
          style={styles.circleInput}/>
      </View>

      <View style={styles.row}>
        <CircleInputComponent
          input={'4'}
          onPress={() => this.props.handler('add', 4)}
          style={styles.circleInput}/>
        <CircleInputComponent
          input={'5'}
          onPress={() => this.props.handler('add', 5)}
          style={styles.circleInput}/>
        <CircleInputComponent
          input={'6'}
          onPress={() => this.props.handler('add', 6)}
          style={styles.circleInput}/>
      </View>

      <View style={styles.row}>
        <CircleInputComponent
          input={'<'}
          onPress={() => this.props.handler('undo')}
          style={styles.circleInput}/>
        <CircleInputComponent
          input={'0'}
          onPress={() => this.props.handler('add', 0)}
          style={styles.circleInput}/>
        <CircleInputComponent
          input={'x'}
          onPress={() => this.props.handler('clear')}
          style={styles.circleInput}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height:        100,
    flexDirection: 'row',
  },

  circleInput: {
    marginLeft:  15,
    marginRight: 15,
  },
});
