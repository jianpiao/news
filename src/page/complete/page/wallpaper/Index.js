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


class wallpaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallpaperID:[],
            wallpaper: [],
            selectWallpaperID:1,
        }
    }
    //  页面渲染完成
    componentDidMount = () => {                                                            
        this.props.dispatch(refreshing(true))
        this.getWallpaper()
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
    //  列表头部
    listHeaderComponent = () => {                                                         
        return ;
    }
    //  列表底部
    listFooterComponent = () => {
        if (this.state.wallpaper.length >0) {
            return(
                <View style={styles.listFooter}>
                    <Text style={styles.listFooterText}>加载更多</Text>
                </View>
            )
        } else {
            return null;
        }
    }
    //  加载更多
    loadMore = () => {                                                                      
        this.props.dispatch(refreshing(true))
        this.state.num = this.state.num+1
        this.getData()
        this.getPhotoList()
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
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(wallpaper);