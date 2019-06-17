import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../../../global/preventDoublePress';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import Video from 'react-native-video';
import Back from '../../../../publicComponents/back/Back';


class WatchPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'http://baobab.kaiyanapp.com/api/v1/playUrl?vid=155345&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss',
            title:''
        }
    }


    componentDidMount = () => {
        let { params } = this.props.navigation.state;
        this.setState({
            url: params.url,
            title: params.title
        })
    }
    
    back = () => {
        this.props.navigation.goBack()
    }
    //  加载媒体
    onLoad = () =>{
        // console.log("加载媒体");
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                <Back back={this.back}/>
                <Video 
                    ref={(ref) => {
                        this.player = ref
                    }}  
                    source={{ uri: this.state.url}}
                    style={{width:'100%',height:250}}//组件样式
                    rate={1}//播放速率
                    paused={false}//暂停
                    controls={true}
                    volume={1}//调节音量
                    muted={false}//控制音频是否静音
                    resizeMode='contain'//缩放模式
                    onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                    repeat={false}//确定在到达结尾时是否重复播放视频。
                />
                <View style={{marginTop:20}}>
                    <Text style={{color:'#fff'}}>{this.state.title}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(WatchPreview);