import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Modal,
    FlatList,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
import { refreshing,imgUrl } from '../../redux/actions';
import { request } from '../../global/request';
const screenHeight = Dimensions.get('window').height;
const endURl = `&min_behot_time=1491981025&last_refresh_sub_entrance_interval=1491981165&loc_mode=&loc_time=1491981000&latitude=&longitude=&city=&tt_from=pull&lac=&cid=&cp=&iid=0123456789&device_id=12345678952&ac=wifi&channel=&aid=&app_name=&version_code=&version_name=&device_platform=&ab_version=&ab_client=&ab_group=&ab_feature=&abflag=3&ssmix=a&device_type=&device_brand=&language=zh&os_api=&os_version=&openudid=1b8d5bf69dc4a561&manifest_version_code=&resolution=&dpi=&update_version_code=&_rticket=`
const startUrl = 'http://is.snssdk.com/api/news/feed/v51/?category='


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                data: []
            },
            listFooterComponentText:'加载更多',
            newsUrl:{url:'news_hot',count:10},
            modalVisible: false,
            newsType:'热点新闻',
            modalList:[
                {title: '热点',url: `news_hot`,count:10},
                {title: '社会',url: `news_society`,count:10},
                {title: '娱乐',url: `news_entertainment`,count:10},
                {title: '科技',url: `news_tech`,count:10},
                {title: '汽车',url: `news_car`,count:10},
                {title: '体育',url: `news_sport`,count:10},
                {title: '财经',url: `news_finance`,count:10},
                {title: '军事',url: `news_military`,count:10},
                {title: '国际',url: `news_world`,count:10},
                {title: '段子',url: `essay_joke`,count:10}
            ]
        }
    }

    componentDidMount = () => {                                                                    //  页面渲染完成
        this.props.dispatch(refreshing(true))
        this.getData(this.state.newsUrl.url,this.state.newsUrl.count)
    }
    selectMore = () => {                                                                          //  选择类型
        this.setState({ modalVisible: true });
    }
    selectType = (title,url,count) => {                                                           //  选择新闻类型
        this.props.dispatch(refreshing(true))
        this.setState({ 
            modalVisible: false,
            newsUrl:{url,count},
            newsType: `${title}新闻`,
            data:{data:[]}
        });
        this.getData(url,count)
    }
    getData(url,count) {                                                                          //  获取数据
        request(`${startUrl}${url}&refer=1&count=${count}${endURl}`).then(res => {
            this.props.dispatch(refreshing(false))
            if (res.message == 'success') {
                if (res.data.length > 0) {
                    this.state.data.data = [...this.state.data.data,...res.data]
                    this.setState({
                        data: this.state.data
                    })
                } else {
                    this.setState({listFooterComponentText:'这是我的底线'})
                    ToastAndroid.show('没有内容啦~', ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show('数据请求失败', ToastAndroid.SHORT);
            }
        },err => {
            this.props.dispatch(refreshing(false))
            ToastAndroid.show('网络异常'+err, ToastAndroid.SHORT);
        })
    }
    jumpDetail = (item,index) => {                                                          //  跳转到详情
        this.props.navigation.navigate('NewsView',{
            newsPath:JSON.parse(item.content).share_url,
            title: JSON.parse(item.content).title
        })
    }
    onRefresh = () => {                                                                     //  下拉刷新事件
        this.props.dispatch(refreshing(true))
        let {url,count} = this.state.newsUrl
        this.getData(url,count)
    }
    itemSeparatorComponent = () => {                                                        //  行与行之间的分隔线组件
        return <View style={styles.separ} />
    }
    emptyComponent = () => {                                                                //  列表为空时渲染该组件
        return (
            <View style={styles.empty}>
                <Text>暂无内容</Text>
            </View>
        )
    }
    listHeaderComponent = () => {                                                          //  列表头部
        return (
            <View style={styles.listHead}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.listHeadText}>{this.state.newsType}</Text>
                </View>
                <View style={{flex: 1,alignItems: 'flex-end' }}>
                     <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('#aaa', true)}
                        onPress={() => this.selectMore()}>
                        <View style={styles.selectMore}>
                            <Image source={require('../../static/img/more.png')} style={{width:25,height:25}}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
    listFooterComponent = () => {                                                       //  列表底部
        if (this.state.data.data.length >0) {
            return(
                <View style={styles.listFooter}>
                    <Text style={styles.listFooterText}>{this.state.listFooterComponentText}</Text>
                </View>
            )
        } else {
            return null;
        }
    }
    publish = (t) => {                                                                  //  发布时间
        return `${new Date(t).getFullYear()}年${(new Date(t).getMonth())+1}月${new Date(t).getDate()}日`
    }
    loadMore = () => {                                                                  //  加载更多
        this.props.dispatch(refreshing(true))
        let [url,count] = [this.state.newsUrl.url,this.state.newsUrl.count]
        this.getData(url,count)
    }
    jumpViewImg = (t) => {                                                              //  查看图片
        this.props.navigation.navigate('ViewImg',{
            img: t
        })
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                {this.listHeaderComponent()}
                <FlatList
                    data={this.state.data.data}
                    initialNumToRender={5}
                    refreshing={this.props.store.refreshing}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.3}
                    onEndReached={(info) => this.loadMore()}
                    loadMore={this.loadMore}
                    ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                    ListEmptyComponent={() => this.emptyComponent()}
                    // ListHeaderComponent={() => this.listHeaderComponent()}
                    ListFooterComponent={() => this.listFooterComponent()}
                    getItemLayout={(item, index) => (
                        {length: 148.3, offset: 148.3 * index, index}
                    )}
                    renderItem={({ item, index }) =>
                    <TouchableHighlight
                        activeOpacity={1}
                        underlayColor="#eee"
                        key={index}
                        onPress={() => preventDoublePress.onPress(() => this.jumpDetail(item, index))}
                        >
                        <View style={styles.item}>
                            <View style={styles.newsLeft}>
                                {/* <View style={styles.media}>
                                    <Image source={{uri: JSON.parse(item.content).media_info ? JSON.parse(item.content).media_info.avatar_url: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiA4ueH_7LhAhW5HjQIHUZsCAAQjRx6BAgBEAU&url=http%3A%2F%2F90sheji.com%2Fsucai%2F19307745.html&psig=AOvVaw1JLVYPTIInRuDExCJctci4&ust=1554348911571386'}} style={styles.media_img} />
                                    <Text style={styles.media_name}>{JSON.parse(item.content).media_name}   {this.publish(JSON.parse(item.content).cursor)}</Text>    
                                </View> */}
                                <View style={styles.titleView}>
                                    <Text style={styles.title} numberOfLines={2}>{JSON.parse(item.content).title}</Text>    
                                </View>
                                <View>
                                    <Text numberOfLines={2} style={styles.abstract}>{JSON.parse(item.content).abstract}</Text>
                                </View>
                                <View style={styles.readView}>
                                    <Text style={styles.readCount}>阅读 {JSON.parse(item.content).read_count}     </Text>
                                    <Text style={styles.readCount}>分享 {JSON.parse(item.content).share_count}</Text>
                                </View>
                            </View>
                            {
                                JSON.parse(item.content).has_image ? 
                                <TouchableOpacity 
                                    onPress={() => this.jumpViewImg(JSON.parse(item.content).middle_image.url)}
                                    style={styles.newsRight}
                                    activeOpacity={1}>
                                        <Image 
                                        source={{uri: JSON.parse(item.content).middle_image.url}} 
                                        style={styles.newsImg}
                                        />
                                    </TouchableOpacity>
                                :
                                null
                            }
                        </View>
                    </TouchableHighlight>}
                />

                {/* 选择类型弹框 */}
                <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => console.log("退出了")}
                >
                <TouchableOpacity 
                    style={styles.modal} 
                    activeOpacity={1}
                    onPress={() => preventDoublePress.onPress(() => this.setState({modalVisible:false}))}>
                    <View style={styles.modalList}>
                        {
                            this.state.modalList.map((item,index) => 
                                <TouchableHighlight
                                    underlayColor="#eee"
                                    key={index}
                                    style={styles.modalItem}
                                    onPress={() => this.selectType(item.title,item.url,item.count+10>80?80:item.count)}
                                    >
                                    <Text style={styles.modalText}>{item.title}</Text>
                                </TouchableHighlight>
                            )
                        }
                    </View>
                </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(HomeScreen);