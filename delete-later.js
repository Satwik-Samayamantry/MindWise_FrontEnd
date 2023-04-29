import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, KeyboardAvoidingView, SafeAreaView, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import {UserContext, UserContextProvider} from '../global/UserContext';
import {storeData,getData,deleteData} from '../global/LocalStore'
import '../global/ngrok.js'
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Ionicons';  

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


const ChatPage = ({navigation}) => {

    const [messageList, setMessageList] = useState([]);
    const [isfirst,setisfirst] = useEffect(true);
    // const [stompClient, setStompClient] = useState();
    const [currentMessage, setCurrentMessage] = useState("");

    // const onMessageReceived = (msg) => {
    //     setMessageList((messages) => {
    //       return [...messages, JSON.parse(msg.body)];
    //     });
    //   };
    
    //   const onConnected = async (sc) => {
    
    //     await sc?.subscribe(
    //       global.ngroklink + cons?.consultationId + "/queue/messages",
    //       onMessageReceived
    //     );
    //   };
    //   const onError = (e) => {
    //     console.log("error: ", e);
    //     // connect();
    //   };

    // useEffect(()=>{
    //     const getmessages = async () =>{
    //         axios.post(global.ngroklink+'/getAllMessagesByPId',{params:{pid:user?.patientID}}
    //         ).then((res)=>{
    //             setMessageList(res.data)
    //         })
    //     };
    //     getmessages();
    // },[])

    // useEffect(()=>{
    //     const connectSock =()=>{
    //         console.log("Hi")
    //         // setisfirst(false);
    //         // const sc = Stomp.over(() => {
    //         //     const sockJS = new SockJS(global.ngroklink+'/ws', null);
    //         //     return sockJS;
    //         //   });
        
    //         // setStompClient(sc);
    //         // sc.connect(header, () => onConnected(sc), onError);
    //         // console.log(sc)
            
    //     }

    //     connectSock(); 
    // },[])

    // const sendMessage = async () => {
    //     if (currentMessage?.trim() !== "") {
    //       const message = {
    //         consultationId: cons.consultationId,
    //         content: currentMessage,
    //         senderId: userDetails.id,
    //         recipientId: cons.doctor[0],
    //       };
    
    //     //   await stompClient?.send(
    //     //     "/chat",
    //     //     JSON.stringify(message)
    //     //   );
    // }
    // setCurrentMessage("");

    //     // console.log(currentMessage)
    //     // console.log(messageList)
    //     // setMessageList(messageList.push(currentMessage));
    //     // console.log(messageList)
    //     // setCurrentMessage("");

    //   };
    
    
    return(
        <View>
            <Text>Hello</Text>
        </View>
    //   <View style = {styles.MainContainer}>
    //         <Image source = {require('../logo1.png')} style={{  width: 60, height: 60, top : 20, left : 10,resizeMode: 'contain'}}/>
    //         <View style={styles.topbar}>
    //             <TouchableOpacity onPress={()=>navigation.navigate('App')}>
    //                 <Icon style={[{color: 'black',marginRight:10}]} size={20} name={'md-chevron-back'}/>  
    //             </TouchableOpacity>
    //             <Icon style={[{color: 'white', marginRight:10}]} size={30} name={'person-circle'}/>  
    //             <Text style={{color:'#2EEE9D',fontSize:22}}>Doctor name</Text>
    //         </View>

    //         <View>
    //             {messageList != [] ? (
    //                 messageList.map((m, mid) => {
    //                 return (
    //                     <Message
    //                     content={m.content}
    //                     sender={m.senderId == userDetails.id ? true : false}
    //                     timeStamp={m.timeStamp}
    //                     readReceipt={m.readRecipt}
    //                     key={mid}
    //                     />
    //                 );
    //                 })
    //             ) : (
    //                 <></>
    //             )}
    //         </View>

    //         <View style={styles.sendMessageContainer}>
    //             <View style={styles.sendMessageInnerContainer}>
    //                 <TextInput
    //                 style={styles.typeMessage}
    //                 onChangeText={setCurrentMessage}
    //                 value={currentMessage}
    //                 placeholder={"Type Message here.."}
    //                 multiline
    //                 numberOfLines={1}
    //                 cursorColor={"#2EEE9D"}
    //                 />
    //                 <TouchableOpacity
    //                 onPress={() => {
    //                     sendMessage();
    //                 }}
    //                 >
    //             <Icon style={[{color: '#2EEE9D', marginRight:10}]} size={20} name={'send'}/>  
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //         {/* </View> */}
    // </View>

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
        // position:"fixed",
        // top : 80, left : 70,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#2F4052',
        height: 45,
        marginTop:15,
        // paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 25,
        // borderRadius : 15,
        overflow: "hidden",
        width:"100%"
    
    },
    chatSendContainer: {
        flex: 1,
        justifyContent: "flex-end",
        // backgroundColor: AppStyles.colour.chatBg,
        alignItems: "center",
      },
    
    sendMessageContainer: {
        flex: 1,
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
        fontSize: 13,
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
