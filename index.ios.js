/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainScene from './components/MainScene';

class matchpoint extends Component {

  constructor(props) {
    super(props);
    this.state = {index: 0};
  }

  render() {
    return (
      <Navigator
        initialRoute={{ index: 0 }}
        renderScene={(route, navigator) =>
          <MainScene

          index={this.state.index}

            // Function to call when a new scene should be displayed           
            onForward={ () => {    
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Club 896',
                index: nextIndex,
              });
              this.setState({index: nextIndex});
            }}

            onBack={ () => {
              if (route.index > 0) {
                const prevIndex = route.index - 1;
                navigator.pop();
                this.setState({index: prevIndex});
              }
            }}

          />
        }
      />
    );
  }
}

AppRegistry.registerComponent('matchpoint', () => matchpoint);
