import React, { Component } from 'react';
import { View, Text } from 'react-native';

import GradientComponent from '../ui/GradientComponent';

export default class ResultComponent extends Component {
  render = () => (
    <GradientComponent>
      <Text>Hello</Text>
    </GradientComponent>
  );
}
