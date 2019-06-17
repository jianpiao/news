import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    rateView: {
        position:'absolute',
        flexDirection:'row',
        height:40,
        justifyContent:'center',
        bottom:60,
        left:0,
        right:0
    },  
    rate: {
        width:'25%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,0.1)'
    },
    volumeView: {
        position:'absolute',
        flexDirection:'row',
        height:40,
        justifyContent:'center',
        bottom:0,
        left:0,
        right:0
    },
    volume: {
        flex: 1,
        width:'33%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,0.1)'
    },
    text: {
        color:'#fff'
    },
    controlsView: {
        position:'absolute',
        right:15,
        top:10,
        width:60,
        height:40
    },
    videoTrans: {
        width:60,
        height:40,
        backgroundColor:'rgba(255,255,255,0.1)',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default styles;