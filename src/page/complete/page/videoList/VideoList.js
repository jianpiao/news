import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
    Image,
    FlatList,
    NetInfo,
    ScrollView,
    Dimensions,
    SectionList,
    ToastAndroid,
    ImageBackground,
    ViewPagerAndroid,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../../../global/preventDoublePress';
import { refreshing,imgUrl } from '../../../../redux/actions';
//  全屏
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

//  开眼视频
class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num:1,
            netStatus:null,
            initialPage: 0
        }
    }
    //  页面加载前
    componentWillMount() {
        //监听网络状态改变
        NetInfo.addEventListener('change', this.handleConnectivityChange);
    }
    //  页面销毁前移除监听事件
    componentWillUnMount() {
        NetInfo.removeEventListener('change', this.handleConnectivityChange);
    }
    //  网络状态
    handleConnectivityChange = (status) =>{
        this.setState({netStatus:status})
    }
    //  页面渲染完成
    componentDidMount = () => {                                                            
        this.props.dispatch(refreshing(true))
        //  设置默认网络类型
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.setState({netStatus:connectionInfo.type})
        });
        this.getData();
    }
    //  获取视频数据
    getData() {                                                                         
        let num = this.state.num
        fetch(`http://baobab.kaiyanapp.com/api/v4/tabs/selected?num=${num}&page=1`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => {
            this.setState({data: res.itemList.filter(e => e.type == 'video')})
            // console.log(this.state.data)
            this.props.dispatch(refreshing(false))
        })
        .catch((err) => {ToastAndroid.show('网络异常'+err, ToastAndroid.SHORT)})
    }
    //  跳转到详情
    jumpDetail = (item,index) => {                                                          
        let url = item.data.playUrl                                                //  视频链接
        let width = item.data.playInfo.length > 0 ? item.data.playInfo[0].width : screenWidth    //  宽
        let height = item.data.playInfo.length > 0 ? item.data.playInfo[0].height : screenHeight  //  高
        if(this.state.netStatus == 'WIFI' || this.state.netStatus == 'wifi') {
            this.jumpVideo(url,width,height)
        } else {
            Alert.alert(
                '确认',
                '当前为流量状态，是否使用流量观看视频？',
                [
                  {text: '不了', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '有钱任性', onPress: () => this.jumpVideo(url,width,height)},
                ],
                { cancelable: false }
              )
        }
        // if(this.state.netStatus == 'MOBILE' || this.state.netStatus == 'mobile'){
        //     Alert.alert(
        //         '确认',
        //         '当前为流量状态，是否使用流量观看视频？',
        //         [
        //           {text: '不了', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //           {text: '有钱任性', onPress: () => this.jumpVideo(url,width,height)},
        //         ],
        //         { cancelable: false }
        //       )
        // } else {
        //     ToastAndroid.show('网络不可用', ToastAndroid.SHORT)
        // }
    }
    //  跳转到视频播放页面
    jumpVideo = (url,width,height,title) => {
        this.props.navigation.navigate('Video',{
            url:url,
            width: width || screenWidth,
            height: height || screenHeight,
            title:title || ''
        })
    }
     //  下拉刷新事件
    onRefresh = () => {                                                                    
        this.props.dispatch(refreshing(true))
        this.getData()
    }
    //  行与行之间的分隔线组件
    itemSeparatorComponent = () => {                                                        
        return <View style={styles.separ} />
    }
    //  列表为空时渲染该组件
    emptyComponent = () => {                                                                
        return (
            <View style={styles.empty}>
                <Text>暂无内容</Text>
            </View>
        )
    }
    //  列表头部
    listHeaderComponent = () => {                                                         
        return ;
    }
    //  列表底部
    listFooterComponent = () => {                                                          
        if (this.state.data.length >0) {
            return(
                <View style={styles.listFooter}>
                    <Text style={styles.listFooterText}>加载更多</Text>
                </View>
            )
        } else {
            return null;
        }
    }
    //  发布时间
    publish = (t) => {                                                                      
        return `${new Date(t).getFullYear()}年${(new Date(t).getMonth())+1}月${new Date(t).getDate()}日`
    }
    //  加载更多
    loadMore = () => {                                                                      
        this.props.dispatch(refreshing(true))
        this.state.num = this.state.num+1
        this.getData()
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.data}
                initialNumToRender={4}
                refreshing={this.props.store.refreshing}
                onRefresh={() => this.onRefresh()}
                onEndReachedThreshold={0.4}
                onEndReached={(info) => this.loadMore()}
                ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                ListEmptyComponent={() => this.emptyComponent()}
                // ListHeaderComponent={() => this.listHeaderComponent()}
                ListFooterComponent={() => this.listFooterComponent()}
                renderItem={({ item, index }) =>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#fff"
                    key={index}
                    onPress={() => preventDoublePress.onPress(() => this.jumpDetail(item, index))}
                    >
                    <View style={styles.item}>
                        <ImageBackground source={{uri: item.data.cover.detail}} style={styles.imageBack} resizeMode="contain">
                            <Image source={require('../../../../static/img/play.png')} style={{width:70,height:70}}/>
                            <Text style={{color:'#fff',textAlign:'left',position:'absolute',bottom:10,left:20,fontSize:25}}>{item.data.slogan}</Text>
                        </ImageBackground>
                        <View style={styles.author}>
                            <Image source={{uri: item.data.author.icon}} style={styles.authorImg}/>
                            <Text style={styles.authorName}>{item.data.author.name}(<Text style={styles.authorCat}>{item.data.category}</Text>)</Text> 
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title}>{item.data.title}</Text>
                            <Text style={styles.description}>{item.data.description}</Text>
                        </View>
                    </View>
                </TouchableHighlight>}
                />
            </View>
        )
    }

}


const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(VideoList);
