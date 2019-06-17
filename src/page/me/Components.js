import React, { Component } from 'react';
import {Text,View} from 'react-native';

export const B = ({data}) => {
    return (
        <View>
            {
                data.map((item,index) => {
                    return (
                        <View style={{width:50,justifyContent:'center',alignItems: 'center'}}>
                            <Text>{item}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export const C = ({count,changeCount}) => {
    return (
        <View>
            <Text>我是C组建</Text>
            <Text onPress={() => changeCount(count+1)}>改变数值</Text>
            <Text>{count}</Text>
        </View>
    )
}