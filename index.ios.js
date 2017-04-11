/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import {routerMap} from './reactnative/common/router';

export default class One extends Component {
  // 构造
  constructor(props) {
      super(props);
      // 初始状态
      this.state = {
      };
  }
  render() {
    return (
        <Navigator initialRoute={routerMap.index}
                   renderScene={(route, navigator) => {
                       let Component = route.component;
                       return <Component {...route.params} navigator={navigator}/>
                   }}
                   configureScene={(route) => {
                       return Navigator.SceneConfigs.PushFromRight;
                   }}
        />
    );
  }
}

AppRegistry.registerComponent('One', () => One);
