import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import preventDoublePress from '../../global/preventDoublePress';

const back = ({back}) => {
    return (
        <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple('#aaa', false)}
            onPress={() => preventDoublePress.onPress(() => back())}>
            <View style={styles.backView}>
                <Text style={styles.back}>返回</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default back;