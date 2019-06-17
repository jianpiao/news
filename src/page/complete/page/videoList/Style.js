import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    //  列表组建
    item: {
        paddingTop: 0,
        paddingBottom: 25,
    },
    author: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    authorImg: {
        width:20,
        height: 20,
        borderRadius:10
    },  
    authorName: {
        paddingLeft: 10,
        paddingRight: 10,
        color:'#aaa',
        fontSize:14,
        fontWeight:'200',
    },
    authorCat: {
        color: '#aaa',
        fontSize:14,
        fontWeight:'200',
    },  
    content: {
        padding:12
    },
    title: {
        color: '#000',
        fontSize:23,
        marginBottom:10
    },
    description: {
        color: '#aaa',
        fontSize:14,
        fontWeight:'200',
    },  
    //  列表组件
    separ:{
        height: 0.3,
        backgroundColor: '#f3f3f3'
    },
    empty:{
        flex: 1, 
        marginTop: 100,
        alignItems: 'center',
    },
    listFooter: {
        height:50,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listFooterText: {
        color: '#999',
        fontSize:13
    },
    fullScreen: {
        width:'100%'
    },
    imageBack: {
        width:screenWidth,
        height: 200,
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default styles;