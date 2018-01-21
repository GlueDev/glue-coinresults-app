import Container from 'components/firstrun/ContainerComponent';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, Vibration, View, } from 'react-native';
import Camera from 'react-native-camera';
import Swipeout from 'react-native-swipeout';
import realm from 'realm';
import Finance from 'utils/Finance';

export default class CameraScreen extends Component {

  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Initialize the camera and state variables
   * @param props
   */
  constructor (props) {
    super(props);

    this.camera = null;

    this.state = {
      showCamera: true,
      QRData:     false,
      camera:     {
        type: Camera.constants.Type.back,
      },
    };
  }

  /**
   * Handle the bar code scan
   * @param e
   */
  onBarCodeRead = (e) => {
    // Check if QRData has already been scanned to avoid continously scanning the QR code
    if (this.state.QRData === false) {
      try {
        let QRData = JSON.parse(e.data);

        // Check if the provided QR code contains the data we need
        if (QRData.portfolio_name && QRData.investment && QRData.assets) {

          // Vibrate
          Vibration.vibrate();

          // Unmount the camera
          this.camera = null;

          // Save the QR Data + set showCamera to false
          this.setState({
            QRData,
            showCamera: false,
          });

          return;
        }

        throw 'QR/JSON does not provide sufficient data (make sure it contains portfolio_name,' +
        ' investment and assets)';

      } catch (e) {
        console.log(e);
      }
    }
  };

  /**
   * Navigate to the previous screen.
   */
  previousScreen = () => {
    // Unmount the camera
    this.camera = null;

    // Navigate to back to the OverviewScreen
    this.props.navigator.resetTo({
      screen: 'CR.PF.OverviewScreen',
    });
  };

  /**
   * Handler for the addPortfolio button
   * @returns {Promise.<void>}
   */
  addPortfolio = async () => {
    try {
      const portfolioName = this.state.QRData.portfolio_name;
      const assets        = this.state.QRData.assets;
      let portfolio;

      // Save the portfolio and investment in Realm
      realm.write(() => {
        portfolio = realm.create('Portfolio', {name: portfolioName}, true);

        // Delete old portfolio investments
        if (portfolio.investments) {
          realm.delete(portfolio.investments);
        }

        // Delete old portfolio assets
        if (portfolio.assets) {
          realm.delete(portfolio.assets);
        }

        portfolio.investments.push({amount: this.state.QRData.investment});
      });

      // Loop through the assets and add each asset to the portfolio
      assets.forEach((asset) => {
        let ticker = realm.objects('Ticker').filtered('ticker = $0', asset.ticker);

        // We can only add the asset if the ticker is present in the local realm database
        if (ticker.length) {
          realm.write(() => {
            portfolio.assets.push({ticker: asset.ticker, amount: asset.amount});
          });
        } else {
          console.log('asset.ticker does not exist in Realm/Ticker.json', asset.ticker);
        }
      });

      // Todo: fire an event here to have trigger the RateAPI.fetchRates()?

      // Navigate back to the overview
      this.props.navigator.resetTo({
        screen: 'CR.PF.OverviewScreen',
      });

    } catch (e) {
      console.error(e);
    }

  };

  /**
   * Render the asset table.
   */
  renderTable = () => (
    <View style={styles.actionContainer}>
      <FlatList
        data={this.state.QRData.assets}
        renderItem={this.renderListItem}
        keyExtractor={item => item.ticker}
      />
    </View>
  );

  /**
   * Remove an asset.
   */
  removeAsset = (index) => {
    const start = this.state.QRData.assets.slice(0, index);
    const end   = this.state.QRData.assets.slice(index + 1);

    this.setState({
      QRData: {
        assets: start.concat(end),
      },
    });
  };

  /**
   * Render a list item.
   */
  renderListItem = ({item, index}) => {
    const listItemButton = [
      {
        text:            'Remove',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        onPress:         () => {this.removeAsset(index);},
      },
    ];

    return (
      <Swipeout
        sensitivity={20}
        backgroundColor={'transparent'}
        right={listItemButton}>
        <View style={styles.listItem}>
          <Text style={styles.listItemTicker}>{item.ticker}</Text>
          <Text style={styles.listItemAmount}>{Finance.formatCrypto(item.amount)}</Text>
        </View>
      </Swipeout>
    );
  };

  /**
   * Render the camera view
   * @returns {XML}
   */
  renderCameraView = () => (
    <View style={styles.container}>
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        type={this.state.camera.type}
        onBarCodeRead={this.onBarCodeRead.bind(this)}
        barCodeTypes={[Camera.constants.BarCodeType.qr]}
      >
        <View style={styles.navigator}>
          <TouchableOpacity style={styles.touchable} onPress={this.previousScreen}>
            <Text style={styles.button}>Back</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );

  /**
   * Render the post scan view
   * @returns {XML}
   */
  renderPostScanView = () => {
    let body, action;
    let buttons = [
      {
        text:    'Add portfolio',
        onPress: this.addPortfolio,
      },
      {
        text:    'Back',
        onPress: this.previousScreen,
      },
    ];

    body   = 'This portfolio consists of the following assets. Swipe right to remove an asset.';
    action = this.renderTable();

    // Todo: show investment (with option to change it?)
    // Todo: show portfolio name (with option to change it?)

    return (
      <Container
        title={'Add portfolio'}
        buttons={buttons}
        action={action}
        body={body}/>
    );
  };

  /**
   * Render the component.
   * @returns {XML}
   */
  render () {
    if (this.state.showCamera) {
      return this.renderCameraView();
    } else {
      return this.renderPostScanView();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    flexDirection:  'column',
    justifyContent: 'space-between',
  },

  navigator: {
    backgroundColor: 'transparent',
    alignItems:      'center',
  },

  preview: {
    flex:           1,
    justifyContent: 'flex-end',
    alignItems:     'center',
  },

  button: {
    backgroundColor: 'transparent',
    color:           '#ffffff',
    fontWeight:      'bold',
    textAlign:       'center',
    paddingTop:      12,
    paddingBottom:   12,
  },

  touchable: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    width:           300,
    marginBottom:    20,
    borderWidth:     2,
    borderRadius:    4,
    borderColor:     '#ffffff',
  },

  actionContainer: {
    width:  300,
    height: 160,
  },

  listItem: {
    backgroundColor:   'transparent',
    flexDirection:     'row',
    alignItems:        'center',
    padding:           12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },

  listItemTicker: {
    width:      75,
    color:      '#FFF',
    fontWeight: 'bold',
    fontSize:   14,
  },

  listItemAmount: {
    color:    '#FFF',
    fontSize: 12,
  },
});
