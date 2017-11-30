import React, { Component } from 'react';

import Container from '../../components/firstrun/ContainerComponent';

export default class ExplanationScreen extends Component {
  /**
   * Navigate to the next screen.
   */
  nextScreen = () => {
    console.info('btn pressed');
  };

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Next', onPress: this.nextScreen},
    ];

    return (
      <Container
        title={'CoinResults'}
        buttons={buttons}
        body={
          'Nullam mollis lacinia mollis. Donec quis consectetur ipsum. Quisque vel erat a lacus luctus gravida in in purus.' +
          'Nunc efficitur elit nibh, sit amet aliquam risus feugiat at. Vestibulum bibendum, sem quis mattis volutpat, mi tortor bibendum lacus, vulputate gravida quam massa at ex. Fusce dictum feugiat consequat.'
        } />
    );
  }
}
