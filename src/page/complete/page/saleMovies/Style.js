import {
    StyleSheet,
    Dimensions
} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    //  正在售票
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    pageStyle: {

    },
    item: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    titleCn: {
        fontSize: 16,
        color: '#000',
    },
    title: {
        color: '#777',
        paddingBottom: 10,
    },
    empty: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    listFooter: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listFooterText: {
        color: '#999',
        fontSize: 13
    },
})

export default styles;