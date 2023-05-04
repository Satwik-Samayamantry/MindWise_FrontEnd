import React, { useState, useEffect, useContext, useRef } from 'react';
import {StyleSheet, ScrollView, View, KeyboardAvoidingView, SafeAreaView, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import {UserContext, UserContextProvider} from '../global/UserContext';
import {storeData,getData,deleteData} from '../global/LocalStore'
import '../global/ngrok.js'
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Ionicons';  


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


// var  messages = [
//     {
//         "messageId": 102,
//         "chatRoomId": 52,
//         "senderId": 3,
//         "recipientId": 102,
//         "content": "Hello from Doctor!!",
//         "timestamp": "2023-04-28T21:18:15.556+00:00",
//         "readReceipt": false
//     },
//     {
//         "messageId": 103,
//         "chatRoomId": 52,
//         "senderId": 102,
//         "recipientId": 3,
//         "content": "Hello from Patient.",
//         "timestamp": "2023-04-28T21:18:43.810+00:00",
//         "readReceipt": false
//     },
//     {
//         "messageId": 104,
//         "chatRoomId": 52,
//         "senderId": 3,
//         "recipientId": 102,
//         "content": "How are you?",
//         "timestamp": "2023-04-28T21:19:04.184+00:00",
//         "readReceipt": false
//     },
//     {
//         "messageId": 105,
//         "chatRoomId": 52,
//         "senderId": 102,
//         "recipientId": 3,
//         "content": "I'm fine ",
//         "timestamp": "2023-04-28T21:19:23.444+00:00",
//         "readReceipt": false
//     }
// ]



const ChatPage = ({navigation}) => {
    const {user,setUser,currentTask, setCurrentTask} = useContext(UserContext);
    const [messages,setmessages] = useState([])
    const [currentMessage,setCurrentMessage] = useState("")
    const [docid,setdocid] = useState("")
    const [docname,setdocname] = useState("")

    const sendMessage = async () => {
            const chatid = await getData("chatroomid")
            console.log(chatid.chatroomid)
            console.log(user.patientID)
            console.log(docid)
            console.log(currentMessage)
            var data={chatroomid:chatid.chatroomid, senderid:user.patientID, recipientid:docid, content:currentMessage, readreceipt:false}
            let jt = await getData('jwt-token')
            const header={'Authorization':jt}
            axios.post(global.ngroklink+"/addmessage",data,header)
            setCurrentMessage("")
    }

    useEffect(()=>{
        const fetchDoctor = async () => {
        let jt = await getData('jwt-token')
        axios.get(global.ngroklink+'/getdocidbypid',{params:{pid:user?.patientID},headers:{ 'Authorization' : jt }}
          ).then((response)=>{
            setdocid(response.data)
            axios.get(global.ngroklink+'/getdocnamebydocid', {params:{docid : response.data},headers:{ 'Authorization' : jt }}
            ).then((response11)=>{
                setdocname(response11.data)
            })
          })
          // const doc_name = await axios.get(global.ngroklink+'/getdocnamebydocid', {params:{docid : docid}});
          // setdoctorname(doc_name);
        };
        fetchDoctor()
        console.log(user)
      },[])


    useEffect(()=>{
        const getmessages = async () => {
            const chatid = await getData("chatroomid")
            let jt = await getData('jwt-token')
        // console.log(chatid.chatroomid)
            axios.get(global.ngroklink+'/getallmessages',{params:{chatroomid:chatid.chatroomid},headers:{ 'Authorization' : jt }}
            ).then((response)=>{
                if(response.data)
                {
                    setmessages(response.data)
                }
            }).catch((error) => {
                Alert.alert('Error', error.message);
                console.log(error.message)
              }); 
        };
        getmessages();
    },[])
    const scrollView = useRef();

    
    return(
    //   <SafeAreaView style = {styles.MainContainer}>

        <SafeAreaView style={{ flex: 1, backgroundColor: '#16202A', }}>
                    
            {/* <View style={{ flex: 1 }}> */}
            {/* <Image source = {require('../logo1.png')} style={{  width: 60, height: 60, top : 20, left : 10,resizeMode: 'contain'}}/> */}
            <View style={styles.topbar}>
                <TouchableOpacity onPress={()=>navigation.navigate('App')}>
                    <Icon style={[{color: 'black',marginRight:10}]} size={25} name={'md-chevron-back'}/>  
                </TouchableOpacity>
                <Icon style={[{color: 'white', marginRight:10}]} size={35} name={'person-circle'}/>  
                <Text style={{color:'#2EEE9D',fontSize:24}}>{docname}</Text>
            </View>

            {/* </View> */}
            
            <KeyboardAvoidingView
        style={styles.msgcontainer}
        behavior="height"
      >
            <ScrollView 
			ref={ref => scrollView.current = ref}
			onContentChange={() => {
				scrollView.current.scrollToEnd({ animated: true })
			}}
            // style={{marginTop:80}}
		> 
            {/* <View style={styles.msgcontainer}> */}
                {messages.map(m => 
                <View style={{width: "100%",
                flexDirection: "column",
                alignItems: m.senderId===user.patientID ? "flex-end" : "flex-start",
                marginBottom:5
                }}>
                    

                    <View style={{backgroundColor : m.senderId===user.patientID ? "#2EEE9D" : "#2F4052",
                                    padding:10,borderRadius:50,
                                    marginRight: m.senderId===user.patientID ? 15:0,
                                    marginLeft: m.senderId===user.patientID ? 0:15,
                                    
                                }}> 
                                    
                        <Text style={{backgroundColor : m.senderId===user.patientID ? "#2EEE9D" : "#2F4052",color:m.senderId===user.patientID?"black":"#2EEE9D", fontSize:16}}>{m.content}</Text>
                    
                    </View>
                </View>

                    )}
            {/* </View> */}
            </ScrollView>


            {/* <KeyboardAvoidingView
                // keyboardVerticalOffset={50}
                behavior={'height'}
                style={{ flex: 1 }}
            > */}

                <View style={styles.sendMessageContainer}>
                    <View style={styles.sendMessageInnerContainer}>
                        <TextInput
                        style={styles.typeMessage}
                        onChangeText={setCurrentMessage}
                        value={currentMessage}
                        placeholder={"Type Message here.."}
                        multiline
                        numberOfLines={1}
                        cursorColor={"#2EEE9D"}
                        />
                        <TouchableOpacity
                        onPress={() => {
                            sendMessage();
                        }}
                        >
                    <Icon style={[{color: '#2EEE9D', marginRight:10}]} size={20} name={'send'}/>  
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );

};


const styles = StyleSheet.create(
{
    MainContainer: 
    {
        flex: 1,
        // borderwidth:10,
        backgroundColor: '#16202A',
        // justifyContent: 'center',
        // alignItems: 'center',
      
    },
    topbar:
    {
        // position:"absolute",
        // top : 80, left : 70,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#2F4052',
        height: 55,
        // marginTop:15,
        // marginVertical:15,
        marginBottom: 15,
        paddingLeft: 15,
        // paddingRight: 25,
        // borderRadius : 15,
        // overflow: "hidden",
        // width:"100%"
    
        // flex: 1,
    },
    msgcontainer : {
        flex: 1,
        // justifyContent: "flex-end",
        // backgroundColor: AppStyles.colour.chatBg,
        // alignItems: "center",
    },
    sendMessageContainer: {
        // flex: 1,
        borderRadius: 15,
        padding: 20,
        width: "100%",
        justifyContent: 'flex-end',
      },
      sendMessageInnerContainer: {
        // paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#2F4052",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
      },
      typeMessage: {
        flex: 1,
        fontSize: 16,
        // fontFamily: AppStyles.font.poppinsRegular,
        // color: "darkGreen",
      },
      sendIcon: {
        width: 28,
        height: 28,
        marginLeft: 20,
      },
    
    

  
});

export default ChatPage;
