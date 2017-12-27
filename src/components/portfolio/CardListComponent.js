import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';

export default class CardListComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    style:      PropTypes.number,
    data:       PropTypes.object.isRequired,
    renderItem: PropTypes.func.isRequired,
  };

  render = () => (
    <ScrollView style={[styles.container, this.props.style]}>
      <FlatList
        style={styles.flatList}
        data={this.props.data}
        renderItem={this.props.renderItem}
        keyExtractor={(item, index) => index}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -40,
  },

  flatList: {
    paddingBottom: 40,
  },
});
