import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

export default class CardListComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    style:          PropTypes.number,
    renderItem:     PropTypes.func.isRequired,
    refreshControl: PropTypes.object,
    data:           PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.array.isRequired,
    ]),
  };

  /**
   * Render the view.
   */
  render = () => (
    <ScrollView
      refreshControl={this.props.refreshControl}
      style={[styles.container, this.props.style]}>
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
    marginTop: -55,
  },

  flatList: {
    paddingBottom: 40,
  },
});
