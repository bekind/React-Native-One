/**
 * Created by alice on 17/4/10.
 */
import React, {Component} from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native'

import {_apis} from '../common/Api'
import Loading from './loading'

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default class Home extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        let initail = '2016-06';
        this.state = {
            datalist: [],
            title: initail,
            showMenu: false,
            isLoading: false
        };
    }

    componentDidMount() {
        this.getList(this.state.title);
    }

    getList(param) {
        let self = this;
        self.setState({
            isLoading:true
        });
        _apis.getData("homePage", param, function (res) {
            if (res.res == 0) {
                console.log('request success back');
                self.setState({
                    datalist: []
                });
                let responseData = res.data;
                self.setState({
                    datalist: responseData,
                    isLoading: false
                });
            }
        }, function (error) {
            console.log('network request error', error);
        });
    }

    menuClicked = () => {
        let currentState = this.state.showMenu;
        this.setState({
            showMenu: !currentState
        });
    };

    menuItemClicked = (value) => {
        this.menuClicked();
        if (!value) return;
        if (value == this.state.title) return;
        this.setState({
            title: value
        });
        this.getList(value);
    };

    render() {
        let menu = this.state.showMenu ? <Menu onPress={this.menuClicked} onItemPress={this.menuItemClicked}/> : null;
        let loading = this.state.isLoading ? <Loading/> : null;
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}>
                    {this.state.datalist.map(createItem)}
                </ScrollView>
                <Navbar title={this.state.title} onPress={this.menuClicked}/>
                {menu}
                {loading}
            </View>
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
                   source={{uri:this.content.hp_img_url}} resizeMode='cover'>
                <View style={styles.infoContainer}>
                    <Text style={styles.day}>{this.state.hp_day}</Text>
                    <Text style={styles.title}>{this.content.hp_title}
                        | {this.state.hp_month} {this.state.hp_year}</Text>
                    <Text style={styles.content}>{this.content.hp_content}</Text>
                </View>
            </Image>
        )
    }
}

class Navbar extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        let source = {uri: 'http://image.wufazhuce.com/m.wufazhuce.com-menu-white.png'};
        const {title, onPress} = this.props;
        return (
            <View style={navstyles.navbar}>
                <Text style={navstyles.navtitle}>ONE {title}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Image source={source} style={navstyles.navRightIcon}/>
                </TouchableOpacity>
            </View>
        )
    }
}

class Menu extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(
                ['2016-06', '2016-05', '2016-04', '2016-03', '2016-02']
            )
        };
        this.onPress = this.props.onPress;
        this.onItemPress = this.props.onItemPress;
    }

    render() {
        return (
            <View style={menustyles.container}>
                <TouchableOpacity style={[menustyles.container,menustyles.mask]}
                                  onPress={this.onPress}/>
                <ListView style={menustyles.list}
                          scrollEnabled={false}
                          dataSource={this.state.dataSource}
                          renderRow={(rowData) => {
                        //this.cellClicked.bind(this)
                        return <TouchableOpacity onPress={this.onItemPress.bind(this,rowData)}>
                                <View style={menustyles.rowcontent}>
                                 <Text style={{fontSize: 16}}>{rowData}</Text>
                                </View>
                            </TouchableOpacity>
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 20
    },
    backImg: {
        width: ScreenWidth,
        height: ScreenHeight - 49,
        paddingBottom: 40
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

const navstyles = StyleSheet.create({
    navbar: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0
    },
    navRightIcon: {
        width: 20,
        height: 20,
        marginRight: 13
    },
    navtitle: {
        color: '#eee',
        fontWeight: 'bold',
        marginLeft: 10
    }
});

const menustyles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 64,
        right: 0,
        bottom: 0,
    },
    mask: {
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    list: {
        position: 'absolute',
        top: 0,
        right: 10,
        height: 400
    },
    rowcontent: {
        height: 44,
        width: 100,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        justifyContent: 'center'
    }
});

const createItem = (obj, i) => <PicItem key={i} content={obj}/>;