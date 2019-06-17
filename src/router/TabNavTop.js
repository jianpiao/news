//  头部选项卡
import React from 'react';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Image, Text, View } from 'react-native';

//  页面
import T1Screen from '../page/complete/page/videoList/VideoList';
import T2Screen from '../page/complete/page/saleMovies/Salling';
import T3Screen from '../page/complete/page/willShow/Index';
import T4Screen from '../page/complete/page/wallpaper/Index';
import T5Screen from '../page/complete/page/Test4';

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
export default createMaterialTopTabNavigator({
    //每一个页面的配置
    T1: {
        screen: T2Screen,
        navigationOptions: () => ({
            title: '开眼视频',
            tabBarLabel: '开眼视频'
        })
    },
    T2: {
        screen: T1Screen,
        navigationOptions: () => ({
            title: '正在售票',
            tabBarLabel: '正在售票'
        })
    },
    T3: {
        screen: T3Screen,
        navigationOptions: () => ({
            title: '即将上映',
            tabBarLabel: '即将上映'
        })
    },
    
    T4: {
        screen: T4Screen,
        navigationOptions: () => ({
            title: '360壁纸',
            tabBarLabel: '360壁纸'
        })
    },
    T5: {
        screen: T5Screen,
        navigationOptions: () => ({
            title: '安卓壁纸',
            tabBarLabel: '安卓壁纸'
        })
    }
}, {
        // 首次加载时初始制表符路径的routeName。
        initialRouteName:'T1',
        //设置TabNavigator的位置
        tabBarPosition: 'top',
        //是否在更改标签时显示动画
        animationEnabled: true,
        //是否允许在标签之间进行滑动
        swipeEnabled: true,
        //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        backBehavior: "none",
        //　懒加载
        lazy: true,
        //设置Tab标签的属性
        tabBarOptions: {
            //是否显示label，默认开启
            showLabel: true,
            activeBackgroundColor: '#666',
            activeTintColor: '#000',
            inactiveBackgroundColor: '#777',
            //  材质波纹的颜色（Android> =仅限5.0）
            pressColor: '#ccc',
            //  按下选项卡的不透明度（仅适用于iOS和Android <5.0）。
            pressOpacity: .5,
            // label和icon的背景色 不活跃状态下（未选中）。
            inactiveTintColor: '#777', 
            //TabNavigator 的背景颜色
            style: { 
                backgroundColor: '#fff',
                alignItems:'center',
                justifyContent:'center',
                height: 40,
                elevation:0
            },
            //  是否显示选项卡的图标，默认为false。
            showIcon: false,
            // 是否启用可滚动选项卡。
            scrollEnabled: true,
            //文字的样式
            labelStyle: {
                fontSize: 14,
                marginTop: 0
            },
            tabStyle: {
                width:100,
            },
            //  选项卡指示器的样式对象（选项卡底部的行）。
            indicatorStyle: {
                left:35,
                width:30,
                height:3
            }
        }
    });