import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Button,
    Animated,
    FlatList,
    Linking,
    ScrollView,
    Dimensions,
    ToastAndroid,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../../../global/preventDoublePress';
import { refreshing, getRepairList,detail } from '../../../../redux/actions';
import Fetch from '../../../../global/Fetch'
import Video from 'react-native-video';
const screenWidth = Dimensions.get('window').width;


class MovieScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                img:'',
                actors:[],
                director:{
                    img:'',
                    name:'',
                    nameEn:''
                }
            },
            movieId:125805
        }
    }

    componentDidMount = () => {
        let { params } = this.props.navigation.state;
        this.state.movieId = params.movieId
        this.getDate(params.movieId)
    }
    getDate() {
        //  即将上映 
        Fetch('https://ticket-api-m.mtime.cn/movie/detail.api?locationId=365&movieId='+this.state.movieId).then(res => {
            this.setState({
                data:res.data.basic
            })
            console.log(this.state.data);
        })
        // fetch('https://ticket-api-m.mtime.cn/movie/detail.api?locationId=365&movieId='+this.state.movieId, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        // })
        // .then((res) => res.json())
        // .then((res) => {
        //     this.setState({
        //         data:res.data.basic
        //     })
        //     console.log(this.state.data);
        //     this.props.dispatch(refreshing(false))
        // })
        // .catch((err) => {
        //     ToastAndroid.show('网络异常'+err, ToastAndroid.SHORT)
        //     this.props.dispatch(refreshing(false))
        // })
    }
    //  页面
    render() {
        let {data} = this.state
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../../static/img/err.jpg')} style={{width: '100%', height: '100%'}}>
                    <View style={{backgroundColor:'rgba(0,0,0,.6)',flex:1}}>
                        <Image source={{uri:data.img}} style={{width:'50%'}} resizeMode="stretch" resizeMethod="auto" />
                        <View>
                        <View style={{flex:1,paddingLeft:10}}>
                            <Text style={styles.titleCn}>{data.titleCn}</Text>
                            <Text style={styles.title}>{data.titleEn}({data.rYear})</Text>
                            <Text style={{color:'#777',fontSize:12}}>类型: {data.type}</Text>
                            <Text style={{color:'#777',fontSize:12}}>片长: {data.length}分钟</Text>
                            <Text style={{color:'#777',fontSize:12}}>上映: {data.rYear}-{data.rMonth}-{data.rDay}(中国大陆)</Text>
                            <Text style={{color:'#777',fontSize:12}}>评分: {data.ratingFinal}</Text>
                            <Text style={{color:'#777',fontSize:12}}>导演: {data.directorName}</Text>
                            <Text style={{color:'#777',fontSize:12}}>演员: {data.actorName1 || ''} / {data.actorName2 || ''}</Text>
                            <Text style={{fontWeight:'200',color:'#777',fontSize:12}}>简介: {data.commonSpecial}</Text>
                        </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{color:'#999',fontSize:12}}>{data.story}</Text>
                    </View>
                    <View style={{backgroundColor:'rgba(0,0,0,.6)',flex:1}}>
                        {/* <View style={{height:50,flexDirection:'row',alignItems:'center',paddingLeft:10,paddingRight:10}}>
                            <Text style={{fontSize:18,color:'#fff'}}>演职员</Text>
                            <View style={{flex:1,alignItems:'flex-end'}}>
                                <Text style={{fontSize:14,color:'#fff',opacity:.5}}>全部{data.actors.length}  ></Text>
                            </View>
                        </View> */}
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{marginRight:5}}>
                                <Image source={{uri:data.director.img}} style={{width:100,height:160}} resizeMode="stretch" resizeMethod="auto" />
                                <Text numberOfLines={1} style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>{data.director.name}</Text>
                                <Text numberOfLines={1} style={{color:'#aaa',fontSize:12}}>{data.director.nameEn}</Text>
                            </View>
                            {
                                data.actors.map((actor,i) => {
                                    return (
                                        <View key={i} style={{marginLeft:5,marginRight:5,width:100}}>
                                            <Image source={{uri:actor.img}} style={{height:160}} resizeMode="stretch" resizeMethod="auto" />
                                            <Text numberOfLines={1} style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>{actor.name}</Text>
                                            <Text numberOfLines={1} style={{color:'#aaa',fontSize:12}}>{actor.nameEn}</Text>
                                            <Text numberOfLines={1} style={{color:'#aaa',fontSize:12}}>饰 {actor.roleName}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(MovieScreen);