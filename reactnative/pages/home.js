/**
 * Created by alice on 17/4/10.
 */
import React, {Component} from 'react'
import {Image, Text, View, Navigator, StyleSheet, ScrollView, Dimensions} from 'react-native'

import {_apis} from '../common/Api'

const ScreenWidth  = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default class Home extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:[]
        };
    }

    componentDidMount() {
        let self = this;
        _apis.getData("homePage","2016-06",function (res) {
            if (res.res == 0) {
                self.setState({
                    dataSource:res.data
                });
            }
        },function (error) {
            console.log('network request error',error);
        });
    }

    render() {
        return (
            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.container}
                        pagingEnabled={true}>
                {this.state.dataSource.map(createItem)}
            </ScrollView>
        )
    }
}

class PicItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            hp_day: '',
            hp_month: '',
            hp_year: ''
        };
        this.content = this.props.content;
    }

    componentDidMount() {
        this.setStateDate(this.content);
    }

    setStateDate(content) {
        let monthdata = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
        let hpMarketTime = new Date(content.hp_makettime.split(' ')[0]);
        let day = hpMarketTime.getDate();
        let month = monthdata[hpMarketTime.getMonth()];
        let year = hpMarketTime.getFullYear();
        this.setState({
            hp_day: day,
            hp_month: month,
            hp_year: year
        });
    }

    render() {
        return (
            <Image style={styles.backImg}
                   source={{uri:this.content.hp_img_url}}>
                <View style={styles.infoContainer}>
                    <Text style={styles.day}>{this.state.hp_day}</Text>
                    <Text style={styles.title}>{this.content.hp_title} | {this.state.hp_month} {this.state.hp_year}</Text>
                    <Text style={styles.content}>{this.content.hp_content}</Text>
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 20,
    },
    backImg: {
        width: ScreenWidth,
        height: ScreenHeight-49,
        paddingBottom: 49
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    day: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 35,
        lineHeight: 35,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6
    },
    content: {
        color: 'white',
        fontSize: 14,
        marginTop: 7,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
    }
});

const createItem = (obj,i) => <PicItem key={i} content={obj}/>;