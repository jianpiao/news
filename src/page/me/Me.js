import React, { Component } from 'react';
import {
    View,
    Button,
    Animated,
    ToastAndroid,
} from 'react-native';
import styles from './Style'
import preventDoublePress from '../../global/preventDoublePress';
import ToastExample from '../../global/ToastExample'


export default class MeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
    }


    showAnim = () => {
        /*
        3. 处理动画值，并启动动画
        * */
        this.state.toValue = this.state.toValue == 1 ? 0 : 1
        Animated.timing(
            this.state.fadeAnim,
            {
            duration: 1000,
            toValue: this.state.toValue,
            useNativeDriver: true
            }
        ).start();
        ToastExample.show('显示动画效果', ToastExample.SHORT)
    }

    //  页面
    render() {
        return (
            <View style={styles.container}>
                <Animated.Text style={{
                /*
                2. 将动画值绑定到style的属性
                * */
                opacity: this.state.fadeAnim
                }}>
                Simple Animated Used Animated.timing
                </Animated.Text>
                <Button title="touch me" onPress={() => { preventDoublePress.onPress(() => this.showAnim())}} />
            </View>
        )
    }
}
