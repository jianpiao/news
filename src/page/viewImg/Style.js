import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // justifyContent: 'center'
    },
    viewImg: {
        width: screenWidth,
        height: 300
    },
    back: {
        position:"absolute",
        top: 15,
        left:15,
        color: '#fff'
    }
})

export default styles;