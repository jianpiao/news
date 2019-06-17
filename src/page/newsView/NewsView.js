import React, { Component } from 'react';
import {
    Text,
    View,
    WebView
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
// import { refreshing, getRepairList,detail } from '../../redux/actions';



class NewsViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsPath: ''
        }
    }

    
    componentDidMount = () => {
        let { params } = this.props.navigation.state;
        this.setState({
            newsPath: params.newsPath
        })
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,//设置标题内容
    });


    //  页面
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: this.state.newsPath}} style={{flex: 1}}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(NewsViewScreen);