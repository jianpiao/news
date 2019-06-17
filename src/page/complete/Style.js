import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewPager: {
        flex:1,
        backgroundColor: '#fff'
    },  
    pageStyle: {

    },  
    tabView: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        borderBottomColor: '#000'
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


    preview: {
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
        paddingTop:10,
        paddingBottom:10
    },
    previewItem:{
        paddingLeft:20,
        paddingRight:20
    },
})

export default styles;