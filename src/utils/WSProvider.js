import React from 'react';

export default (Component) => (
  class WSProvider extends React.Component {
    /**
     * Set the screen's navigator style.
     */
    static navigatorStyle = {
      navBarHidden: true,
      ...Component.navigatorStyle,
    };

    /**
     * Define the store.
     */
    constructor (props) {
      super(props);
    }

    componentDidMount () {
      const ws     = new WebSocket('wss://kendoui-ws-demo.herokuapp.com');
      ws.onmessage = event => console.log(event.data);
    }

    /**
     * Render the original component.
     */
    render = () => (
      <Component store={this.state}/>
    );
  }
);
