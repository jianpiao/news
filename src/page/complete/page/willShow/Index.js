import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    NetInfo,
    FlatList,
    Dimensions,
    ScrollView,
    SectionList,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { refreshing,imgUrl } from '../../../../redux/actions';
import preventDoublePress from '../../../../global/preventDoublePress';
//  全屏
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;



class willShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            willShow:{
                attention:[],
                moviecomings:[]
            },
            netStatus:null,
            initialPage: 0,
            times:1
        }
    }
    //  页面加载前
    componentWillMount() {
        //监听网络状态改变
        NetInfo.addEventListener('change', this.handleConnectivityChange);
        this.getPhotoList()
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
        this.getPhotoList()
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
    //  列表底部
    listFooterComponent = () => {                                              
        if (this.state.willShow.attention.length >0 || this.state.willShow.moviecomings.length > 0) {
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => preventDoublePress.onPress(() => this.loadMore())}>
                    <View style={styles.listFooter}>
                        <Text style={styles.listFooterText}>加载更多</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }
    //  加载更多
    loadMore = () => {
        //  自定义分页
        let temp = []
        if (((this.state.times+1)*5) < this.state.willShow.moviecomings.length) {
            temp = this.state.willShow.moviecomings.filter((item,index) => {
                if (index > (this.state.times*5) && index < ((this.state.times+1)*5)) {
                    return item
                }
            })
            this.state.data.push(...temp)
        } else {
            temp = this.state.willShow.moviecomings.filter((item,index) =>  index > this.state.data.length)
            this.state.data.push(...temp)
        }
        this.setState({
            data:this.state.data
        })
        this.state.times += 1
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
        //  即将上映 
        fetch('https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=365', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            
            this.state.willShow = {
                attention:res.attention,
                moviecomings:res.moviecomings
            },
            this.setState({
                data:res.moviecomings.filter((item,index) => index < 5)
            })
            this.props.dispatch(refreshing(false))
        })
        .catch((err) => {
            ToastAndroid.show('网络异常'+err, ToastAndroid.SHORT)
            this.props.dispatch(refreshing(false))
        })
    }
    jumpwillShowDetail = () => {
        
    }
    //  查看预告片
    watchPreview = (url,title) => {
        this.jumpVideo(url,screenWidth,screenHeight,title)
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                {/* <SectionList
                sections={[
                    {title:'最受关注',data:this.state.willShow.attention},
                    {title:'即将上映',data:this.state.willShow.moviecomings},
                ]}
                refreshing={this.props.store.refreshing}
                onRefresh={() => this.onRefresh()}
                onEndReachedThreshold={0.4}
                ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                ListEmptyComponent={() => this.emptyComponent()}
                ListFooterComponent={() => this.listFooterComponent()}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({ section: { title, data } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                renderItem={({ item, index, section }) =>
                    <View>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="#eee"
                            key={index}
                            onPress={() => preventDoublePress.onPress(() => this.jumpwillShowDetail(item, index))}>
                            <View style={styles.item}>
                                <Image 
                                    source={{uri: item.image}} 
                                    style={styles.itemImg} 
                                    resizeMode="stretch"/>
                                <View style={{flex:1,paddingLeft:10}}>
                                    <Text style={styles.title}>{item.title}({item.rYear})</Text>
                                    <Text style={styles.text}>制片: {item.locationName}</Text>
                                    <Text style={styles.text}>类型: {item.type}</Text>
                                    <Text style={styles.text}>上映: {item.rYear}-{item.rMonth}-{item.rDay}(中国大陆)</Text>
                                    <Text style={styles.text}>导演: {item.director}</Text>
                                    <Text style={styles.text}>演员: {item.actor1 || ''} / {item.actor2 || ''}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.preview}>
                                {
                                    item.videos.map((ind,ite) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                key={ite}
                                                onPress={() => preventDoublePress.onPress(() => this.watchPreview(ind.url,ind.title))}>
                                                <View style={styles.previewItem}>
                                                    <ImageBackground source={{uri: ind.image}} style={styles.previewBG}>
                                                        <Image source={require('../../../../static/img/play.png')} style={styles.previewImg}/>
                                                    </ImageBackground>
                                                    <Text style={styles.previewTitle}>{ind.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                }
            /> */}
                <FlatList
                    data={this.state.data}
                    initialNumToRender={5}
                    refreshing={this.props.store.refreshing}
                    onRefresh={() => this.onRefresh()}
                    // onEndReachedThreshold={0.01}
                    // onEndReached={(info) => this.loadMore()}
                    ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                    ListEmptyComponent={() => this.emptyComponent()}
                    ListFooterComponent={() => this.listFooterComponent()}
                    renderItem={({ item, index }) =>
                    <View style={{flex:1}}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="#eee"
                            key={index}
                            onPress={() => preventDoublePress.onPress(() => this.jumpwillShowDetail(item, index))}>
                            <View style={styles.itemTest}>
                                <ImageBackground source={{uri: item.image}} style={{width: '100%', height: '100%',flex:1}}>
                                    <View style={{flex:1,paddingLeft:10}}>
                                        <Text style={{color:'#fff',fontSize:20}}>{item.title}({item.rYear})</Text>
                                        <Text style={{color:'#f5f5f5'}}>制片: {item.locationName}</Text>
                                        <Text style={{color:'#f5f5f5'}}>类型: {item.type}</Text>
                                        <Text style={{color:'#f5f5f5'}}>上映: {item.rYear}-{item.rMonth}-{item.rDay}(中国大陆)</Text>
                                        <Text style={{color:'#f5f5f5'}}>导演: {item.director}</Text>
                                        <Text style={{color:'#f5f5f5'}}>演员: {item.actor1 || ''} / {item.actor2 || ''}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            {/* <View style={styles.item}>
                                <Image 
                                    source={{uri: item.image}} 
                                    style={styles.itemImg} 
                                    resizeMode="stretch"/>
                                <View style={{flex:1,paddingLeft:10}}>
                                    <Text style={styles.title}>{item.title}({item.rYear})</Text>
                                    <Text style={styles.text}>制片: {item.locationName}</Text>
                                    <Text style={styles.text}>类型: {item.type}</Text>
                                    <Text style={styles.text}>上映: {item.rYear}-{item.rMonth}-{item.rDay}(中国大陆)</Text>
                                    <Text style={styles.text}>导演: {item.director}</Text>
                                    <Text style={styles.text}>演员: {item.actor1 || ''} / {item.actor2 || ''}</Text>
                                </View>
                            </View> */}
                        </TouchableHighlight>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.preview}>
                                {
                                    item.videos.map((ind,ite) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                key={ite}
                                                onPress={() => preventDoublePress.onPress(() => this.watchPreview(ind.url,ind.title))}>
                                                <View style={styles.previewItem}>
                                                    <ImageBackground source={{uri: ind.image}} style={styles.previewBG}>
                                                        <Image source={require('../../../../static/img/play.png')} style={styles.previewImg}/>
                                                    </ImageBackground>
                                                    <Text style={styles.previewTitle}>{ind.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(willShow);

