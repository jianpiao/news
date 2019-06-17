import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, ToastAndroid} from 'react-native';


export default class Test1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>页面1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    }
});
