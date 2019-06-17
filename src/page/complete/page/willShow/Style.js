import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    //  即将上映
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
        flex:1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom:5
    },
    title: {
        fontSize:20,
        color:'#000',
        paddingBottom: 10,
    },
    sectionHeader: {
        fontWeight: "bold", 
        color: '#000', 
        padding: 10, 
        fontSize:25
    },
    itemImg: {
        width:'50%',
        height: 250,
        borderRadius:5
    },
    text: {
        color:'#777'
    },
    preview: {
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
        paddingTop:10,
        paddingBottom:10
    },
    previewItem:{
        width: 180,
        paddingLeft:5,
        paddingRight:5
    },
    previewBG: {
        width: 170, 
        height: 100,
        justifyContent:'center',
        alignItems:'center'
    },
    previewTitle: {
        marginTop:6,
        color:'#777',
        marginLeft:15
    },
    previewImg: {
        width:50,
        height: 50
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

    //　测试
    itemTest:{
        flex:1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:5,
        paddingBottom:5
    }
})

export default styles;