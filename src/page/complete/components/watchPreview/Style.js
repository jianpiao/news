import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    fullScreen: {
        width: screenWidth,
        height:300
    },
    rate: {
        width:'25%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,0.2)'
    },
    volume: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,0.2)'
    }
})

export default styles;