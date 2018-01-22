import AssetCardComponent from 'components/portfolio/AssetCardComponent';
import CardListComponent from 'components/portfolio/CardListComponent';
import ResultComponent from 'components/portfolio/ResultComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { connectRealm } from 'react-native-realm';
import RateAPI from 'utils/RateAPI';

class DetailsScreen extends Component {
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
      loading: false,
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
   * Update the portfolios.
   */
  updatePortfolio = async () => {
    this.setState({loading: true});
    await RateAPI.refreshData([this.state.portfolio]);
    this.setState({loading: false});
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
          portfolio={this.state.portfolio}
          ref={'ResultComponent'}
        />

        <CardListComponent
          data={this.state.assets}
          renderItem={({item}) => this.renderItem(item)}
          refreshControl={<RefreshControl
            tintColor={'#FFFFFF'}
            refreshing={this.state.loading}
            onRefresh={this.updatePortfolio}/>}/>
      </View>
    );
  };
}

export default connectRealm(DetailsScreen, {
  schemas:    ['Portfolio', 'Rate', 'Asset', 'Ticker'],
  mapToProps: (results, realm, ownProps) => {
    const portfolio = results.portfolios.filtered('name == $0', ownProps.portfolioName)[0];

    return {
      realm,
      portfolio,
    };
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
