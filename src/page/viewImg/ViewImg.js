import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styles from './Style'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import preventDoublePress from '../../global/preventDoublePress';
import {} from '../../redux/actions';
import Back from '../../publicComponents/back/Back';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import ImageViewer from 'react-native-image-zoom-viewer';



class ViewImgScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:'https://p.ssl.qhimg.com/dmfd/400_300_/t01da5bd44928dcfc6c.jpg',
            state: false,
            modalVisible: true
        }
    }

    
    componentDidMount = () => {
        // this.getMyRepair();
        // console.log(this.props.store.imgUrl);
        let { params } = this.props.navigation.state;
        this.setState({
            img: params.img
        })
    }
    back = () => {
        this.props.navigation.goBack()
    }
    renderLoad() { //这里是写的一个loading
        return (
            <View style={{ marginTop: '50%' }}>
                <ActivityIndicator animating={true} size={"large"} />
            </View>
        )
    }
    //  页面
    render() {
        return (
            <View style={styles.container}>
                {/* <Back back={this.back}/> */}
                <ImageViewer 
                    imageUrls={[
                        {url:this.state.img},
                        {url:'https://p.ssl.qhimg.com/dmfd/400_300_/t01da5bd44928dcfc6c.jpg'},
                        {url:'https://p.ssl.qhimg.com/dmfd/400_300_/t01da5bd44928dcfc6c.jpg'}
                        ]}
                    saveToLocalByLongPress={false}
                    loadingRender={() =>this.renderLoad()}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(ViewImgScreen);