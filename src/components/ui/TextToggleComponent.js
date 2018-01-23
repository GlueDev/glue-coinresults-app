import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

export default class TextToggleComponent extends Component {
  /**
   * Prop Types.
   */
  static propTypes = {
    values:           PropTypes.object.isRequired,
    allowFontScaling: PropTypes.bool,
    emitChange:       PropTypes.string,
    style:            PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  /**
   * Set the default state.
   */
  constructor (props) {
    super(props);

    this.state = {
      values:      ['...'],
      activeKey:   0,
      activeValue: '...',
    };
  }

  /**
   * Update the state when new props arrive.
   */
  componentWillReceiveProps (props) {
    const values = Object.values(props.values);

    this.setState({
      values,
      activeKey:   this.state.activeKey,
      activeValue: values[this.state.activeKey],
    });

    if (props.emitChange !== undefined) EventRegister.on(props.emitChange, () => this.nextValue(false));
  }

  /**
   * Switch to next value.
   */
  nextValue = (emit = true) => {
    const length  = this.state.values.length - 1;
    const nextKey = this.state.activeKey === length ? 0 : this.state.activeKey + 1;

    this.setState({
      activeKey:   nextKey,
      activeValue: this.state.values[nextKey],
    });

    if (this.props.emitChange && emit) EventRegister.emit(this.props.emitChange);
  };

  /**
   * Render the view.
   */
  render = () => (
    <TouchableOpacity onPress={() => this.nextValue()}>
      <Text style={this.props.style}>{this.state.activeValue}</Text>
    </TouchableOpacity>
  );
}
