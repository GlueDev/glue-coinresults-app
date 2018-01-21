import Container from 'components/firstrun/ContainerComponent';
import React, { Component } from 'react';

export default class ExplanationScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Navigate to the next screen.
   */
  nextScreen = () => (
    this.props.navigator.resetTo({
      screen: 'CR.FR.Portfolio.AddScreen',
    })
  );

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: this.nextScreen},
    ];

    return (
      <Container
        title={'CoinResults'}
        buttons={buttons}
        body={
          'Nullam mollis lacinia mollis. Donec quis consectetur ipsum. Quisque vel erat a lacus luctus gravida in in purus.' +
          'Nunc efficitur elit nibh, sit amet aliquam risus feugiat at. Vestibulum bibendum, sem quis mattis volutpat, mi tortor bibendum lacus, vulputate gravida quam massa at ex. Fusce dictum feugiat consequat.'
        }/>
    );
  }
}
