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
import Fetch from '../../../../global/Fetch';
import { refreshing,imgUrl } from '../../../../redux/actions';
//  全屏
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

//  开眼视频
class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saleMovies: [],
            data:[]
        }
    }
    //  页面渲染完成
    componentDidMount = () => {                                                            
        this.getMoive()
    }
     //  下拉刷新事件
    onRefresh = () => {                                                                    
        this.props.dispatch(refreshing(true))
        this.getMoive()
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
        if (this.state.saleMovies >0) {
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
        // this.props.dispatch(refreshing(true))
        if (this.state.data.length > this.state.saleMovies.length) {
            let [dl,sl] = [this.state.data.length,this.state.saleMovies.length]
            if ((dl - sl) > 3) {
                this.setState({
                    saleMovies:this.state.saleMovies.concat(this.state.data.filter((item,index) => index > sl && index < (sl+3)))
                })
            } else {
                this.setState({
                    saleMovies:this.state.saleMovies.concat(this.state.data.filter((item,index) => index > sl))
                })
            }
        }
        // this.getMoive()
    }

    /*
        电影
    */
   getMoive() {
        //  正在售票 
        Fetch('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=365').then(res => {
            this.setState({
                data:res.movies,
                saleMovies: res.movies.filter((item,index) => index <4),
            })
            console.log(res.movies);
        })
    }

    //  查看电影详情 
    jumpMovieDetail = (item) => {
        this.props.navigation.navigate('MovieDetail',{
            movieId:item.movieId
        })
    }

    //  页面
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.saleMovies}
                initialNumToRender={3}
                refreshing={this.props.store.refreshing}
                onRefresh={() => this.onRefresh()}
                onEndReachedThreshold={0.2}
                onEndReached={(info) => this.loadMore()}
                ItemSeparatorComponent={() => this.itemSeparatorComponent()}
                ListEmptyComponent={() => this.emptyComponent()}
                // ListHeaderComponent={() => this.listHeaderComponent()}
                ListFooterComponent={() => this.listFooterComponent()}
                renderItem={({ item, index }) =>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#eee"
                    key={index}
                    onPress={() => preventDoublePress.onPress(() => this.jumpMovieDetail(item, index))}
                    >
                    <View style={styles.item}>
                        <Image source={{uri: item.img}} style={{width:'50%',height: 250,borderRadius:5}} resizeMode="stretch"/>
                        <View style={{flex:1,paddingLeft:10}}>
                            <Text style={styles.titleCn}>{item.titleCn}</Text>
                            <Text style={styles.title}>{item.titleEn}({item.rYear})</Text>
                            <Text style={{color:'#777',fontSize:12}}>类型: {item.type}</Text>
                            <Text style={{color:'#777',fontSize:12}}>片长: {item.length}分钟</Text>
                            <Text style={{color:'#777',fontSize:12}}>上映: {item.rYear}-{item.rMonth}-{item.rDay}(中国大陆)</Text>
                            <Text style={{color:'#777',fontSize:12}}>评分: {item.ratingFinal}</Text>
                            <Text style={{color:'#777',fontSize:12}}>导演: {item.directorName}</Text>
                            <Text style={{color:'#777',fontSize:12}}>演员: {item.actorName1 || ''} / {item.actorName2 || ''}</Text>
                            <Text style={{fontWeight:'200',color:'#777',fontSize:12}}>简介: {item.commonSpecial}</Text>
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



