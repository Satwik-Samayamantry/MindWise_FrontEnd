import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';  
import {UserContext, UserContextProvider} from '../global/UserContext';
import '../global/ngrok.js'
import { ScrollView } from 'react-native-gesture-handler';
import {storeData,getData,deleteData} from '../global/LocalStore'


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;



const DoctorPage = ({navigation}) => {

    const [doc_data, setData] = useState([]);
    const {user,setUser,currentTask, setCurrentTask} = useContext(UserContext);

    useEffect(() => {
      const fetchData = async () => {
        let jt = await getData('jwt-token')
        const header={'Authorization':jt}
  
        const result = await axios.get(global.ngroklink+'/doctors',{headers:header});
        setData(result.data);
      };

      fetchData();
    }, []);


    const handleButtonPress = async (doctorId) => {
      let jt = await getData('jwt-token')
      const header={'Authorization':jt}

      axios.post(global.ngroklink+'/assign-doctor', {"doctorID": doctorId, "patientID": user?.patientID, "summary": null},{headers:header}
    ).then((response) => {
      console.log(response.data)
      if(response.data)
      {
        console.log("doctorid :"+ doctorId)
        console.log("patientid:"+user?.patientID)

        axios.post(global.ngroklink+'/createchat', {"doctorid" : doctorId, "patientid": user.patientID},{headers:header}
        ).then((reply)=>{
            storeData('chatroomid',{"chatroomid":reply.data})

            navigation.navigate('App');
        }).catch((error) => {
          Alert.alert('Error', error.message);
          console.log(error.message)
        }); 
        // Alert.alert('Success', 'Login successful');
      }
      else
      {
        Alert.alert('Failed', 'Network Error');
      }
    }).catch((error) => {
      Alert.alert('Error', error.message);
      console.log(error.message)
    }); 
    };
  

    return(
      
      <ScrollView style = {styles.MainContainer}>

        <View style={styles.rectangleup}/>
        {/* <View style={styles.rectangledown}/> */}

        <Text style={styles.pageheading}> Available Doctors</Text>

        {doc_data.map(doctor => 
                            <TouchableOpacity
                            key = {doctor.name}
                            style={styles.doctorbutton}
                            onPress = {() => handleButtonPress(doctor.doctorID)}>
        <View style={styles.buttonlist}>

                <Icon style={[{color: 'black', left:15}]} size={40} name={'person-outline'}/>  
        <View style={styles.buttonnames}>
                            <Text style={styles.ButtonText}>
                                {doctor.name}
                            </Text>
                            <Text style={styles.ButtonText}>
                                {doctor.specialization}
                            </Text>
                            
      </View>
      </View>
                          </TouchableOpacity>)}

    </ScrollView>
);};


const styles = StyleSheet.create(
{
    MainContainer: 
    {
      flex: 1,
      borderwidth:10,
      backgroundColor: '#16202A',
    },
  
    rectangleup: {
      position: "absolute",
      backgroundColor: "#2EEE9D",
      width: horizontalScale(321),
      height: verticalScale(313),
      transform: [{ rotate: "-25.68deg" }],
      left: horizontalScale(-300),
      top: verticalScale(-180),
    },
    rectangledown: {
      position: "absolute",
      backgroundColor: "#2EEE9D",
      width: horizontalScale(321),
      height: verticalScale(313),
      transform: [{ rotate: "-25.85deg" }],
      right: horizontalScale(-180),
      bottom: verticalScale(-80),
    },
    doctorbutton: {
        backgroundColor: '#2F4052',
        justifyContent: 'center',
        // alignItems: 'center',
        height: 90,
        // marginHorizontal: 20,
        marginBottom: 5,
        // borderRadius: 8,
      },
      ButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginHorizontal : 30,
        // marginLeft:10
      },
      buttonlist:
      {
        flexDirection:'row',
      },
      buttonnames:
      {
        flexDirection:'column',
        justifyContent: 'center',
      },
      pageheading:
      {
        color: '#2EEE9D',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop : 80
      },


    input: {
      height: 40,
      width: '70%',
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
  
    button: {
      backgroundColor: '#2F4052',
      padding: 10,
      borderRadius: 50,
      opacity: 0.7,
      paddingLeft:30,
      paddingRight:30,
    },

    buttonText: {
      color: '#2EEE9D',
      fontSize: 20,
    },

  
  
});

export default DoctorPage;
