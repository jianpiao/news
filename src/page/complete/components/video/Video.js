import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    Platform,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import styles from './Style';
import backStyles from '../../../../publicComponents/back/Style';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../../../global/preventDoublePress';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import Video from 'react-native-video';
import Back from '../../../../publicComponents/back/Back';
import Orientation from 'react-native-orientation';

class VideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'http://baobab.kaiyanapp.com/api/v1/playUrl?vid=155345&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss',
            title: '',
            playHeight: screenHeight, //  视频高度
            playWidth: screenWidth,  //  视频高度
            initialHeight:screenHeight,  //  存储默认高度值
            rate: 1,  //  播放速率
            volume: 5,  //  播放音量
            initialState:true,  //  视频默认竖屏状态
            setControls:true,  //   设置控制器,
            resizeMode: 'contain'  //  视频缩放模式
        }
    }

    //  页面进来强制横屏
    componentWillMount() {
        // Orientation.lockToLandscape();
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.back);
        }
    }
    //  页面渲染完成
    componentDidMount = () => {
        let { params } = this.props.navigation.state;
        this.setState({
            url: params.url,
            initialHeight:(screenWidth/params.width)*params.height,
            playHeight: (screenWidth/params.width)*params.height   //  比值算法，计算高度
        })
    }
    //  在页面摧毁的时候强制竖屏
    componentWillUnmount() {
        Orientation.lockToPortrait();
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.back);
        }
    }
    //  返回页面并且控制屏幕旋转
    back = () => {
        if (this.state.initialState) {
            //  竖屏时直接退出
            this.props.navigation.goBack()
        }
        //  横屏时变为竖屏
        Orientation.lockToPortrait();
        this.setState({
            playWidth: this.state.screenWidth,
            playHeight: this.state.initialHeight,
            setControls: true,
            resizeMode:'contain'
        })
        this.state.initialState = !this.state.initialState
        return true
    }
    //  控制屏幕旋转
    setScreen = () => {
        if(this.state.initialState) {
            //  横屏
            this.setState({
                playWidth: screenHeight,
                playHeight: screenWidth,
                setControls: false,
                resizeMode:'stretch'
            })
           new Promise(() => {
                Orientation.lockToLandscape();
            })
        } else {
            //  竖屏
            this.setState({
                playWidth: this.state.screenWidth,
                playHeight: this.state.initialHeight,
                setControls: true,
                resizeMode:'contain'
            })
            new Promise(() => {
                Orientation.lockToPortrait();
            })
        }
        this.state.initialState = !this.state.initialState
    }
    //  视频播放速度
    showMdoalView = () => {
        let tempData = [5,10,15,20]
        return tempData.map((item,index) => {
            return (
                <TouchableNativeFeedback 
                    key={index}
                    background={TouchableNativeFeedback.Ripple('#aaa', false)}
                    onPress={() => preventDoublePress.onPress(() => this.setState({rate:item/10}))}>
                    <View style={styles.rate}><Text style={{color:'#fff'}}>{item/10}倍速度</Text></View>
                </TouchableNativeFeedback>
            )
        })
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                {/* 返回键 */}
                <TouchableNativeFeedback 
                    background={TouchableNativeFeedback.Ripple('#aaa', false)}
                    onPress={() => preventDoublePress.onPress(() => this.back())}>
                    <View style={backStyles.backView}>
                        <Text style={backStyles.back}>返回</Text>
                    </View>
                </TouchableNativeFeedback>
                {/* 视频 */}
                <Video 
                    ref={(ref) => {
                        this.player = ref
                    }}  
                    source={{ uri: this.state.url}}
                    style={{width:this.state.playWidth,height:this.state.playHeight}}//组件样式
                    rate={this.state.rate}//播放速率
                    paused={false}//暂停
                    controls={true}
                    volume={this.state.volume/10}//调节音量
                    muted={false}//控制音频是否静音
                    resizeMode={this.state.resizeMode}//缩放模式
                    onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                    repeat={false}//确定在到达结尾时是否重复播放视频。
                />
                <View>
                    <Text>{this.state.title}</Text>
                </View>
                {/* 视频速率按钮 */}
                <View style={[styles.rateView,{width:this.state.setControls?'100%':0}]}>
                    {this.showMdoalView()}
                </View>
                {/* 视频音量按钮 */}
                <View style={[styles.volumeView,{width:this.state.setControls?'100%':0}]}>
                    <TouchableNativeFeedback 
                        background={TouchableNativeFeedback.Ripple('#aaa', false)}
                        onPress={() => preventDoublePress.onPress(() => this.setState({volume:this.state.volume < 10 ? this.state.volume+1:this.state.volume}))}>
                        <View style={styles.volume}>
                            <Text style={styles.text} >加大音量</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.volume}>
                        <Text style={styles.text}>{this.state.volume/10}</Text>
                    </View>
                    <TouchableNativeFeedback 
                        background={TouchableNativeFeedback.Ripple('#aaa', false)}
                        onPress={() => preventDoublePress.onPress(() => this.setState({volume:this.state.volume > 0 ?this.state.volume-1:this.state.volume}))}>
                        <View style={styles.volume}>
                            <Text style={styles.text} >减少音量</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                {/* 视频旋转按钮 */}
                <View style={styles.controlsView}>
                    <TouchableOpacity 
                        activeOpacity={1}
                        onPress={() => preventDoublePress.onPress(() => this.setScreen())}
                        style={{flex:1}}>
                    <View style={styles.videoTrans}><Text style={styles.text}>旋转屏幕</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(VideoScreen);