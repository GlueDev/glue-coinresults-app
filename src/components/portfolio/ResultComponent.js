import BackButtonComponent from 'components/ui/BackButtonComponent';
import GradientComponent from 'components/ui/GradientComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Finance from 'utils/Finance';

export default class ResultComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  /**
   * Grab all portfolios.
   */
  constructor (props) {
    super(props);

    this.state = {
      valueChange: '...',
      ROI:         '...',

      valueResultSwitcher: {
        active: 'value',
        values: {value: '...'},
      },
    };
  }

  /**
   * Listen for portfolio changes.
   */
  componentDidMount () {
    EventRegister.on('dataRefreshed', () => this.updateComponent(this.props));
  }

  /**
   * Wait for the props.
   */
  componentWillReceiveProps (props) {
    this.updateComponent(props);
  }

  /**
   * Remove listeners.
   */
  componentWillUnmount () {
    EventRegister.rmAll();
  }

  /**
   * Update component with the data.
   */
  updateComponent = async (props = false) => {
    const valueChange = Finance.formatFIAT(props.portfolio.valueChangeToday, 'EUR'),
          ROI         = Finance.formatPercentage(props.portfolio.ROI);

    this.setState({
      valueChange,
      ROI,

      valueResultSwitcher: {
        ...this.state.valueResultSwitcher,
        values: {
          value:  Finance.formatFIAT(props.portfolio.totalValue, 'EUR'),
          result: Finance.formatFIAT(props.portfolio.totalResult, 'EUR'),
        },
      },
    });
  };

  /**
   * Render the view.
   */
  render = () => (
    <GradientComponent style={styles.container}>
      <BackButtonComponent
        onPress={() => this.props.navigator.pop()}
        label={'Portfolio overview'}/>

      <TouchableOpacity onPress={() => {}}>
        <Text
          style={styles.totalProfit}
          allowFontScaling={false}>
          {this.state.valueResultSwitcher.values[this.state.valueResultSwitcher.active]}
        </Text>
      </TouchableOpacity>

      <Text style={styles.lastVisitResult}>
        Portfolio value changed {this.state.portfolioValue} since 00:00.
      </Text>

      <Text style={styles.ROI}>
        Your ROI is currently {this.state.ROI}.
      </Text>

    </GradientComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:    60,
    paddingBottom: 80,
    paddingLeft:   30,
    paddingRight:  30,
  },

  totalProfit: {
    backgroundColor: 'transparent',
    color:           '#FFF',
    fontSize:        45,
    fontWeight:      '100',
  },

  lastVisitResult: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    marginTop:       10,
  },

  ROI: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    marginTop:       10,
  },
});
