import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, ToastAndroid} from 'react-native';
import StackNavigator from './src/router/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastBackPressed: 0
    }
  }

  //  页面创建的时候对物理按钮进行监听
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.BackHandler);
    }
  }
  //  页面摧毁的时候销毁监听
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.BackHandler);
    }
  }

  //  物理返回键 事件触发
  BackHandler = () => {
    if (this.state.lastBackPressed && this.state.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp()
      return false
    }
    this.state.lastBackPressed = Date.now()
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
    return true
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.app}>
          <StackNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'row'
  }
});
