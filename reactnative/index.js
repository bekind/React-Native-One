/**
 * Created by alice on 17/4/10.
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Image, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Example from './pages/example';
import Home from './pages/home'

export default class Index extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab:'home'
        };
    }
    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="美图"
                    renderIcon={() => <Image source={{uri:'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png'}} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={{uri:'http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png'}} style={styles.icon} />}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <Home/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'read'}
                    title="阅读"
                    renderIcon={() => <Image source={{uri:'http://gtms03.alicdn.com/tps/i3/TB1LEn9MpXXXXaUXpXX9t7RGVXX-46-46.png'}} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={{uri:'http://gtms02.alicdn.com/tps/i2/TB1qysbMpXXXXcnXXXX9t7RGVXX-46-46.png'}} style={styles.icon}/>}
                    onPress={() => this.setState({ selectedTab: 'read' })}>
                    <Example/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'movie'}
                    title="电影"
                    renderIcon={() => <Image source={{uri:'http://gtms01.alicdn.com/tps/i1/TB1B0v5MpXXXXcvXpXX9t7RGVXX-46-46.png'}} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={{uri:'http://gtms04.alicdn.com/tps/i4/TB1NxY5MpXXXXcrXpXX9t7RGVXX-46-46.png'}} style={styles.icon}/>}
                    onPress={() => this.setState({ selectedTab: 'movie' })}>
                    <Example/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    icon: {
        width:25,
        height:25
    }
});