import {
    StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
    backView: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,240,220,0.2)',
        zIndex:999
    },
    back: {
        color: '#fff'
    }
})

export default styles;