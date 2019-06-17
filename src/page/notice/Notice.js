import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    Linking,
    Dimensions,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
// import { refreshing, getRepairList,detail } from '../../redux/actions';

class NoticeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '这里是关键字这里是关键字这里是关键字这里是关键字这里是关键字这里是关键字'
        }
    }
    //  设置关键字
    keyword = (key) => {
        let data = this.state.data          //   获取文本
        let newData = data.split(key)       //  通过关键字的位置开始截取，结果为一个数组
        return (
            <Text>
                {
                    newData.map((item,index) => {
                        return <Text key={index}>{item}<Text style={{color:'#a44a44'}}>{key}</Text></Text>
                    })
                }
            </Text>
        )
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:20}}>内容<Text>Text文本可以嵌套text</Text></Text>
                <View>{this.state.data.includes('关键字') ? this.keyword('关键字') : <Text>{this.state.data}</Text>}</View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(NoticeScreen);