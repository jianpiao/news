import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import tabNav from './TabNavBottom';
import newsViewScreen from '../page/newsView/NewsView';
import viewImgScreen from '../page/viewImg/ViewImg';
import VideoScreen from '../page/complete/components/video/Video';
import WatchPreviewScreen from '../page/complete/components/watchPreview/Index';
import MovieDetailScreen from '../page/complete/components/movieDetail/Index';

const headerStyle = {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomColor: '#eee',
    borderBottomWidth: 0.8
}


// 初始化StackNavigator
export default MyApp = createStackNavigator({
    tabNav: {
        screen: tabNav,
        navigationOptions: {
            header: null,
        }
    },
    //  新闻详情页面
    NewsView: {
        screen: newsViewScreen,
        navigationOptions: {
            headerStyle: headerStyle,
        }
    },
    //  查看图片页面
    ViewImg: {
        screen: viewImgScreen,
        navigationOptions: {
            header: null,
            // headerStyle: headerStyle,
        }
    },
    //  视频播放页面
    Video: {
        screen: VideoScreen,
        navigationOptions: {
            header: null,
        }
    },
    //  查看预告片页面
    watchPreview: {
        screen: WatchPreviewScreen,
        navigationOptions: {
            header: null,
        }
    },
    //  电影详情页面
    MovieDetail: {
        screen: MovieDetailScreen,
        navigationOptions: {
            header: null,
        }
    }
}, {
        // transitionConfig: TransitionConfiguration
        
        //  设置打开应用默认显示的页面
        // initialRouteName: tabNav,
    });