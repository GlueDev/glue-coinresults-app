import AssetCardComponent from 'components/portfolio/AssetCardComponent';
import CardListComponent from 'components/portfolio/CardListComponent';
import ResultComponent from 'components/portfolio/ResultComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class DetailsScreen extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    portfolioName: PropTypes.string.isRequired,
    portfolio:     PropTypes.object.isRequired,
  };

  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Define the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      ...this.mapState(props),
    };
  }

  /**
   * Update the state when new props arrive.
   */
  componentWillReceiveProps (props) {
    this.setState(this.mapState(props));
  }

  /**
   * Map the props to the state.
   */
  mapState = (props) => {
    const assets = props.portfolio.assets.slice();
    assets.sort((a, b) => a.totalValue('EUR') < b.totalValue('EUR'));

    return {
      portfolio: props.portfolio,
      assets,
    };
  };

  /**
   * Render an asset.
   */
  renderItem = asset => {
    const ticker = this.props.realm.objects('Ticker').filtered('ticker == $0', asset.ticker)[0];
    return <AssetCardComponent asset={asset} ticker={ticker}/>;
  };

  /**
   * Render the view.
   */
  render = () => {
    return (
      <View style={styles.container}>
        <ResultComponent
          navigator={this.props.navigator}
          portfolio={this.state.portfolio}/>

        <CardListComponent
          data={this.state.assets}
          renderItem={({item}) => this.renderItem(item)}/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
