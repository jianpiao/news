import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, ToastAndroid} from 'react-native';


export default class Test2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>页面2</Text>
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
