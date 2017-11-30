import React, { Component } from 'react';

import Container from '../../components/firstrun/ContainerComponent';

export default class AssetsScreen extends Component {
  /**
   * Render the component.
   */
  render() {
    const buttons = [
      {text: 'Next', onPress: this.nextScreen},
    ];

    return (
      <Container
        title={'Add assets'}
        buttons={buttons}
        body={'No assets added yet.'} />
    );
  }
}
