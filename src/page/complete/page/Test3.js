import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  ToastAndroid
} from 'react-native';
import {
  request
} from '../../../global/request'

export default class Test3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentDidMount = () => {

  }



  render() {
    return ( 
      <View style = {styles.container}>
        <Text>页面3</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});