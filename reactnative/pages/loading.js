/**
 * Created by alice.
 * Date: 17/4/12
 * Time: 下午3:18
 * Description: 加载动画
 */
import React, {Component} from 'react'
import {View, Text, ActivityIndicator, Dimensions, StyleSheet} from 'react-native'

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            animating: true
        };
    }

    render() {
        let tipMsg = this.state.animating ? '正在加载中...':'加载完成';
        return (
            <View style={styles.maskView}>
                <View style={styles.contentView}>
                    <ActivityIndicator style={styles.centering}
                                       animating={this.state.animating}
                                       size="large"/>
                    <Text style={styles.loadingMsg}>{tipMsg}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    maskView: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentView: {
        position: 'absolute',
        width:100,
        height:100,
        left:screenW/2-50,
        top:screenH/2-50,
        backgroundColor:'white',
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    loadingMsg:{
        color:'#666666'
    }
});