import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import {UserContext, UserContextProvider} from '../global/UserContext';
import {storeData,getData,deleteData} from '../global/LocalStore'
import '../global/ngrok.js'
import NetInfo from '@react-native-community/netinfo';


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;
var progress = 50
var taskstatus = 1




const HomePage = ({navigation}) => {

    const [exercise_data, setData] = useState([]);
    const [progress,setprogress] = useState(0);
    const [assignedtasks,setassignedtasks] = useState(0);
    const [completedtasks,setcompletedtasks] = useState(0);
    const {user,setUser,currentTask, setCurrentTask} = useContext(UserContext);
    const [status,setStatus] = useState(user?.status);
    const [chatid,setchatid] = useState(null);
    const [docid,setdocid] = useState("")


    const handleTaskPage = (exerciseid) => {
      setCurrentTask(exerciseid)
      navigation.navigate('TaskPage')
    }

    useEffect(()=>{
      const updatestatus = async () =>{
        await axios.post(global.ngroklink+'/setstatus',{"username":user?.username, "status":status}
        ).then((response) => {
          // console.log(response)
        }).catch((error) => {
          // Alert.alert('Error', error.message);
          console.log(error.message)
        });
      };
      updatestatus();
    },[])
    
    useEffect(()=>{
      const fetchUserData = async () => {
        const data1 = await getData('user');
        // console.log(data1)
        setUser(data1);
      };
      fetchUserData()  
    },[])
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(global.ngroklink+'/getexercisesfrompid',{params: {patientid: user?.patientID}});
        setData(result.data);
        // console.log(result.data)
      };

      fetchData();
    }, []);

    useEffect(()=>{
      const fetchDoctor = async () => {
        axios.get(global.ngroklink+'/getdocidbypid',{params:{pid:user?.patientID}}
        ).then((response)=>{
          setdocid(response.data)
        })
      };
      fetchDoctor()
    },[])


    // useEffect(()=>{
    //   const fetchprogress = async () =>{
    //     const num = await axios.get(global.ngroklink + "/getcountbypid", {params: {patientID: user?.patientID} });
    //     setassignedtasks(parseFloat(num.data));
    //     const numcd = await axios.get(global.ngroklink + "/getcountpidandcs", {params: {patientID: user?.patientID, completionstatus:1}})
    //     setcompletedtasks(parseFloat(numcd.data));
    //     setprogress((numcd.data/num.data).toFixed(4))
    //   };
    //   fetchprogress();
    // },[progress,exercise_data])

    const sendDataToBackend = async () => {
      // Retrieve saved data from local storage
        const savedText = await getData("cache");
        if (savedText!==null) {
            console.log(savedText)
            if(docid)
            {
              const response = await axios.post(global.ngroklink+'/logfeelings', { "patientID" : user?.patientID, "doctorID": docid,"description" : savedText.feelings, "timestamp":savedText.timestamp});
              await deleteData("cache");
    
            }
        }
    };


    useEffect(() => {
      // Check for network connectivity
      const fetchNetworkStatus = async () => 
      {
        NetInfo.addEventListener( async (state) => {
        if (state.isConnected) 
        {
          // Device is online, send data to backend
          // sendDataToBackend();
            const savedText = await getData("cache");
            if (savedText!==null) {
                console.log(savedText)
                if(docid)
                {
                  const response = await axios.post(global.ngroklink+'/logfeelings', { "patientID" : user?.patientID, "doctorID": docid,"description" : savedText.feelings, "timestamp":savedText.timestamp});
                  await deleteData("cache");
        
                }
            }
        }
        })
      };
      fetchNetworkStatus();
      
    }, [docid]);
  
    

    useEffect(()=>{
      const getchatid = async () =>{
          const temp = await getData("chatroomid") ;
          console.log(temp)
          if(temp!==null)
          {
            setchatid(temp)
          }
      };
      getchatid();
    },[])
  


    
    
    return(
      
      <View style = {styles.MainContainer}>
        <Image source = {require('../logo1.png')} style={{ width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>
        <Text style={styles.startText}> Hey, {user?.name} !!</Text>
        {/* <Text style={styles.startText}> Hey, !!</Text> */}

        <View style={styles.rect}>
          <Text style={styles.questext}> How are you feeling?</Text>
          
          <View style={styles.emojibar}>
            <TouchableOpacity onPress={()=>setStatus(1)}>
              <Text style={styles.emoji}>😠</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setStatus(2)}>
              <Text style={styles.emoji}>🙁</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setStatus(3)}>
              <Text style={styles.emoji}>😐</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setStatus(4)}>
              <Text style={styles.emoji}>🙂</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setStatus(5)}>
              <Text style={styles.emoji}>😄</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={styles.progressview}>
          <Text style={styles.progresstext}>Your Progress </Text>
          <Text style={styles.progresstext}>{progress*100}% </Text>
        </View>

        <View style={styles.barview}> 
        <Progress.Bar progress={progress} width={horizontalScale(300)} borderRadius={10} height={15} color='#2EEE9D' unfilledColor='#2F4052' borderColor = '#2F4052' />
        </View>

        {exercise_data.map(exercise => 

                <TouchableOpacity
                key={exercise.exerciseID}
                style={styles.taskbutton}
                 onPress = {() => handleTaskPage(exercise.exerciseID)}>
                
                        <View style={styles.buttonlist}>
                                        <Text style={styles.TaskText}>
                                            Task {exercise.exerciseID}
                                        </Text>

                                        {exercise.completionstatus ? <Text style={styles.statusText1}> Completed</Text>  : <Text style={styles.statusText2}> Yet to complete</Text>}
                        </View>

              </TouchableOpacity>)}


              {/* <Text>{chatid}</Text> */}
          {
            chatid!==null ? 
              <TouchableOpacity 
                  onPress={() => navigation.navigate('ChatPage')}>
                <Text style={styles.chattext}>Chat with Doctor</Text>
              </TouchableOpacity> 
              :
              <Text>{chatid}</Text>
          }


      </View>
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
    startText : {
      color: '#2EEE9D',
      fontSize: 36,
      fontWeight: 'bold',
      // marginBottom: 20,
      margin: 20,

    },
    rect: {
      backgroundColor: "#2F4052",
      width: horizontalScale(315),
      height: verticalScale(98),
      marginHorizontal :30,
      borderRadius : 21,
    },
    questext :
    {
      color: '#2EEE9D',
      margin : 10,
      fontSize: 24,
    },
    progresstext:{
      color: '#2EEE9D',
      fontSize: 28,
      fontWeight: 'bold',
      // marginBottom: 20,
      margin: 25,
    },
    emojibar:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emoji:{
      fontSize:36,
      margin : 5
    },
    progressview:{
      flexDirection: 'row',
      justifyContent: 'space-between'

    },
    barview:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonlist:
    {
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    taskbutton: {
      backgroundColor: '#2F4052',
      justifyContent: 'center',
      // alignItems: 'center',
      height: 80,
      marginHorizontal: 20,
      marginTop: 25,
      // margin : 10,
      borderRadius: 30,
    },
    TaskText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginHorizontal : 30,
      // marginLeft:10
      alignContent : "flex-end"
    },
    statusText1:{
      marginRight:20,
      color: '#2EEE9D',
    },
    statusText2:{
      marginRight:20,
    },
    chattext:{
      color: '#2EEE9D',
      fontSize: 18,
      marginLeft : 30,
      marginTop: 25
    }
    

  
});

export default HomePage;
