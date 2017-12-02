import React, { Component } from 'react';

import Container from '../../components/firstrun/ContainerComponent';

export default class AssetsScreen extends Component {
  nextScreen = () => {
    this.props.navigator.showModal({
      screen: 'CR.FR.AssetsAddScreen',
      title:  'Modal',
    });
  };

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Add asset', onPress: this.nextScreen},
      {text: 'Continue', onPress: this.nextScreen},
    ];

    return (
      <Container
        title={'Add assets'}
        buttons={buttons}
        body={'No assets added yet. You need to add at least one asset in order to continue.'}/>
    );
  }
}
