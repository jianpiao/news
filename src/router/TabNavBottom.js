//  底部导航
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Image, Text, View } from 'react-native';

//  页面
import HomeScreen from '../page/home/Home';
import CompleteScreen from '../page/complete/Complete';
import NoticeScreen from '../page/notice/Notice';
import MeScreen from '../page/me/Me';

import TabTop from './TabNavTop'; //  头部选项卡

const style = StyleSheet.create({
    footImage: {
        width: 23,
        height: 23
    }
});  

const headerStyle = {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomColor:'#eee',
    borderBottomWidth: 1
}


//Tab
export default createBottomTabNavigator({
    //每一个页面的配置
    Notice: {
        screen: TabTop,
        navigationOptions: () => ({
            tabBarLabel: '通知',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage]}
                    source={require('../static/img/icon3.png')}
                />
            ),
            headerStyle: headerStyle
        })
    },
    Complete: {
        screen: CompleteScreen,
        navigationOptions: () => ({
            tabBarLabel: '发现',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage]}
                    source={require('../static/img/icon2.png')}
                />
            ),
            headerStyle: headerStyle
        })
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            tabBarLabel: '新闻',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage]}
                    source={require('../static/img/icon1.png')}
                />
            ),
            headerStyle: headerStyle
        })
    },
    
    Me: {
        screen: MeScreen,
        navigationOptions: () => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image style={[style.footImage]}
                    source={require('../static/img/icon4.png')}
                />
            ),
            headerStyle: headerStyle
        })
    }
}, {
        //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        backBehavior: "none",
        //　懒加载
        lazy: true,
        //设置Tab标签的属性
        tabBarOptions: {    
            //共有属性
            showLabel: true,//是否显示label，默认开启
            activeBackgroundColor: '#fff',  // 活动选项卡的标签和图标颜色。
            activeTintColor: '#000',  // 活动选项卡的背景色。
            inactiveBackgroundColor: '#fff',   // 非活动选项卡的背景色。
            pressColor: '#999',//  波纹
            inactiveTintColor: '#777', // label和icon的背景色 不活跃状态下（未选中）。
            style: { //TabNavigator 的背景颜色
                backgroundColor: '#fff',
                height: 50
            },
            showIcon: true,
            labelStyle: {//文字的样式
                fontSize: 11,
                marginTop: 0
            },
            tabStyle: {
                fontSize:14
            },
            indicatorStyle: {
                height: 0
            }
        }
    });