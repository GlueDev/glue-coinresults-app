import React, { Component } from 'react';

import Container from '../../components/firstrun/ContainerComponent';

export default class ExplanationScreen extends Component {
  render () {
    return (
      <Container
        title={'CoinResults'}
        body={
          'Nullam mollis lacinia mollis. Donec quis consectetur ipsum. Quisque vel erat a lacus luctus gravida in in purus.' +
          'Nunc efficitur elit nibh, sit amet aliquam risus feugiat at. Vestibulum bibendum, sem quis mattis volutpat, mi tortor bibendum lacus, vulputate gravida quam massa at ex. Fusce dictum feugiat consequat.'
        } />
    );
  }
}
