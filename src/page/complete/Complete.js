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
import preventDoublePress from '../../global/preventDoublePress';
import { refreshing,imgUrl } from '../../redux/actions';
import SaleMovies from './page/saleMovies/Salling';
import WillShow from './page/willShow/Index';
//  全屏
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


class CompleteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num:1,
            saleMovies: [],
            showTimes:[],
            willShow:{
                attention:[],
                moviecomings:[]
            },
            wallpaperID:[],
            wallpaper: [],
            selectWallpaperID:1,
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
        // this.getData();
        this.getPhotoList()
        // this.getWallpaper()
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

        //  获取壁纸类型
        fetch(`http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => {
            // console.log(res)
            this.setState({wallpaperID:res.data})
        })
    }
    //  获取壁纸
    getWallpaper() {
        fetch(`http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory&cid=${this.state.selectWallpaperID}&start=0&count=99`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => {
            // console.log(res)
            this.setState({wallpaper:res.data})
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
        } else if(this.state.netStatus == 'MOBILE' || this.state.netStatus == 'mobile'){
            Alert.alert(
                '确认',
                '当前为流量状态，是否使用流量观看视频？',
                [
                  {text: '不了', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '有钱任性', onPress: () => this.jumpVideo(url,width,height)},
                ],
                { cancelable: false }
              )
        } else {
            ToastAndroid.show('网络不可用', ToastAndroid.SHORT)
        }
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
        this.getPhotoList()
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
        this.getPhotoList()
    }
    //  滑动页面
    onPageSelected(e) {
        this.setState({ initialPage:e})
        this.refs.viewPage.setPage(e)
    }


    /*
        电影
    */
   getPhotoList() {
        //  正在售票 
        fetch('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=365', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => {
            this.setState({saleMovies: res.movies})
            this.props.dispatch(refreshing(false))
        })
        .catch((err) => {
            ToastAndroid.show('网络异常'+err, ToastAndroid.SHORT)
            this.props.dispatch(refreshing(false))
        })

        //  即将上映 
        // fetch('https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=365', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        // })
        // .then((res) => res.json())
        // .then((res) => {
        //     this.setState({
        //         willShow:{
        //             attention:res.attention,
        //             moviecomings:res.moviecomings
        //         }
        //     })
        //     this.props.dispatch(refreshing(false))
        // })
        // .catch((err) => {
        //     ToastAndroid.show('网络异常'+err, ToastAndroid.SHORT)
        //     this.props.dispatch(refreshing(false))
        // })
    }

    //  查看图片详情 
    jumpPhotoDetail = (item) => {
        this.props.navigation.navigate('MovieDetail',{
            movieId:item.movieId
        })
    }
    jumpwillShowDetail = () => {
        
    }
    //  查看预告片
    watchPreview = (url,title) => {
        this.jumpVideo(url,screenWidth,screenHeight,title)
    }
    //  查看图片
    jumpViewImg = (t) => {  
        this.props.navigation.navigate('ViewImg',{
            img: t
        })
    }
    //  选择壁纸类型
    selectWallpaerType = (id) => {
        this.state.selectWallpaperID = id
        this.getWallpaper()
    }
    //  页面
    render() {
        const tabList = ['开眼视频','正在售票','即将上映','360壁纸','安卓壁纸']
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',height:50}}>
                {
                    tabList.map((item,index) => {
                        return (
                            <TouchableNativeFeedback 
                                key={index}
                                background={TouchableNativeFeedback.Ripple('#aaa', false)}
                                onPress={() => this.onPageSelected(index)}>
                                <View style={[styles.tabView]}>
                                    <Text style={{ color: this.state.initialPage == index ? '#000' : '#666' }}>{item}</Text>
                                    <View style={{width:'30%',bottom:10,backgroundColor:'#ffdd91',position:'absolute',left:'35%',height:this.state.initialPage == index?3:0}}></View>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })
                }
                </View>
                <ViewPagerAndroid 
                    style={styles.viewPager} 
                    initialPage={this.state.initialPage}
                    onPageSelected={(e) => this.onPageSelected(e.nativeEvent.position)}
                    ref="viewPage">
                    {/* <VideoList 
                        data={this.state.data}
                        refreshing={this.props.store.refreshing}
                        onRefresh={this.onRefresh}
                        loadMore={this.loadMore}
                        itemSeparatorComponent={this.itemSeparatorComponent}
                        emptyComponent={this.emptyComponent}
                        listFooterComponent={this.listFooterComponent}
                        jumpDetail={this.jumpDetail}
                    /> */}
                    <View key="1">
                        <Text>adsfsdf</Text>
                    </View>
                    {/* <SaleMovies 
                        saleMovies={this.state.saleMovies}
                        refreshing={this.props.store.refreshing}
                        onRefresh={this.onRefresh}
                        loadMore={this.loadMore}
                        itemSeparatorComponent={this.itemSeparatorComponent}
                        emptyComponent={this.emptyComponent}
                        listFooterComponent={this.listFooterComponent}
                        jumpPhotoDetail={this.jumpPhotoDetail}
                    /> */}
                    <View key="2">
                        <Text>adsfsdf</Text>
                    </View>
                    {/* <WillShow
                        willShow={this.state.willShow}
                        refreshing={this.props.store.refreshing}
                        onRefresh={this.onRefresh}
                        itemSeparatorComponent={this.itemSeparatorComponent}
                        emptyComponent={this.emptyComponent}
                        listFooterComponent={this.listFooterComponent}
                        jumpwillShowDetail={this.jumpwillShowDetail}
                        watchPreview={this.watchPreview}
                    /> */}
                    <View key="3">
                        <Text>即将上映</Text>
                    </View>
                    <View style={styles.pageStyle} key="4">
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.preview}>
                                    {
                                        this.state.wallpaperID.map((item,index) => {
                                            return (
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    key={index}
                                                    onPress={() => preventDoublePress.onPress(() => this.selectWallpaerType(item.id))}>
                                                    <View style={styles.previewItem}>
                                                        <Text style={styles.previewTitle}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        <FlatList
                            data={this.state.wallpaper}
                            initialNumToRender={5}
                            // refreshing={refreshing}
                            // onRefresh={() => onRefresh()}
                            onEndReachedThreshold={0.4}
                            // onEndReached={(info) => loadMore()}
                            ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                            ListEmptyComponent={() => this.emptyComponent()}
                            // ListHeaderComponent={() => this.listHeaderComponent()}
                            ListFooterComponent={() => this.listFooterComponent()}
                            renderItem={({ item, index }) =>
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor="#eee"
                                key={index}
                                onPress={() => preventDoublePress.onPress(() => this.jumpViewImg(item.url))}
                                >
                                <Image source={{uri: item.url}} style={{width:'100%',height: 250}} resizeMode="stretch"/>
                            </TouchableHighlight>}
                        />
                    </View>
                    <View style={{flex:1}} key="5">
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => preventDoublePress.onPress(() => this.jumpViewImg('http://img5.adesk.com/595de628e7bce77b95a5968f'))}
                        >
                            <Image source={{uri:'http://img5.adesk.com/595de628e7bce77b95a5968f'}} style={{width:'100%',height: '100%'}} resizeMode="stretch" />
                        </TouchableOpacity>
                    </View>
                </ViewPagerAndroid>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(CompleteScreen);