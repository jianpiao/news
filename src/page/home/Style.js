import { StyleSheet, Dimensions } from 'react-native';

var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    selectMore: {
        width: 60,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },  
    item:{
        // marginLeft: 10, 
        // marginRight: 10, 
        backgroundColor: '#fff', 
        borderRadius: 5, 
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20,
        paddingBottom:20,
        flexDirection: 'row'
    },
    itemHeader:{
        flexDirection: 'row', 
        paddingTop: 8, 
        paddingBottom: 8,
    },
    itemHeaderRight: {
        flex: 1,
        alignItems: 'flex-end',
    },  
    itemContent:{
        flexDirection: 'row', 
        paddingTop: 8, 
        paddingBottom: 8
    },
    img:{
        width: 80, 
        height: 80, 
        borderRadius: 5, 
        marginLeft: 15, 
    },
    separ:{
        height: 0.3,
        backgroundColor: '#eee'
    },
    empty:{
        flex: 1, 
        marginTop: 100,
        alignItems: 'center',
    },
    listHead:{
        flexDirection: 'row',
        height: 50, 
        backgroundColor: '#fff',
        justifyContent: 'center', 
        paddingLeft: 15,
        // elevation: 5
    },
    listHeadText:{
        fontSize: 20, 
        fontWeight: '600', 
        color: '#000'
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

    //  新闻资源
    newsLeft: {
        flex:1,
        paddingRight: 10,
    },
    titleView: {
        // marginTop:15,
        marginBottom: 15,
    },  
    title: {
        color: '#000',
        fontSize: 20,
    },  
    abstract: {
        color: '#999',
        fontSize:14,
        fontWeight:'200',
    },
    abstractView: {

    },  
    media: {
        flexDirection: 'row'
    },  
    media_img: {
        width: 16, 
        height: 16,
        marginRight:10,
        borderRadius: 7,
    },
    media_name: {
        fontSize:14,
        fontWeight:'200',
        color: '#aaa'
    },
    newsRight: {
        marginTop:5
        // justifyContent: 'center'
    },
    newsImg: {
        width: 100,
        height: 100
    },
    readView: {
        flexDirection:'row',
        marginTop: 15,
    },
    readCount: {
        fontSize:12,
        fontWeight:'200',
        color:'#aaa'
    },

    //  类型选择弹出框
    modal: {
        width:'100%',
        height: '100%',
        alignItems: 'flex-end'
    },
    modalList: {
        width:150,
        backgroundColor:'#fff',
        elevation: 10
    },
    modalItem: {
        height:45,
        width:150,
        justifyContent: 'center',
        paddingLeft:15,
        paddingRight:15
    },
    modalText: {
        color: '#000',
        fontSize: 16,
    }
})

export default styles;