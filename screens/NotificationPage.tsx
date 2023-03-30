import React, { useState  } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';  


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

let doc_data = [
    {
        "doctorID": 1,
        "name": "Doctor1",
        "dob": "1995-03-13",
        "gender": "Male",
        "phoneNo": "9876543210",
        "email": "doctor1@gmail.com",
        "proofType": "PAN",
        "proofNum": "ZXCVB1234R",
        "username": "doctor1",
        "status": 1,
        "registeredID": "R01",
        "specialization": "Notification 1 info will be displayed here."
    },
    {
        "doctorID": 2,
        "name": "Doctor2",
        "dob": "1994-04-14",
        "gender": "Female",
        "phoneNo": "9876543210",
        "email": "doctor2@gmail.com",
        "proofType": "PAN",
        "proofNum": "ZXCVB1234R",
        "username": "doctor2",
        "status": 1,
        "registeredID": "R02",
        "specialization": "Notification 2 info will be displayed here."
    },
    {
        "doctorID": 3,
        "name": "Doctor3",
        "dob": "1994-04-14",
        "gender": "Female",
        "phoneNo": "9876543210",
        "email": "doctor3@gmail.com",
        "proofType": "PAN",
        "proofNum": "ZXCVB1234R",
        "username": "doctor3",
        "status": 1,
        "registeredID": "R03",
        "specialization": "Notification 3 info will be displayed here."
    }
];


const NotificationsPage = () => {

    return(
      
      <View style = {styles.MainContainer}>
        {/* <Text style={{color:'#2EEE9D',fontSize:38,fontWeight:'bold'}}> Notifications Page</Text> */}
        <Image source = {require('../logo1.png')} style={{ width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>
        <Text style={styles.startText}> Notifications</Text>

        {doc_data.map(doctor => 
                            <TouchableOpacity
                            key = {doctor.name}
                            style={styles.doctorbutton}>
                            {/* onPress = {() => connectToDevice(device)}> */}
        <View style={styles.buttonlist}>

                <Icon style={[{color: 'black', left:15}]} size={40} name={'person-outline'}/>  
        {/* <Image source = {require('../pp.jpg')} style={{width: 50, height: 70,left:10,resizeMode: 'contain'}}/> */}
        <View style={styles.buttonnames}>
                            {/* <Text style={styles.ButtonText}>
                                {doctor.name}
                            </Text> */}
                            <Text style={styles.ButtonText}>
                                {doctor.specialization}
                            </Text>
                            
      </View>
      </View>
                          </TouchableOpacity>)}


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
    //   justifyContent: 'center',
    //   alignItems: 'center',
      
    },
    startText : {
        color: '#2EEE9D',
        fontSize: 36,
        fontWeight: 'bold',
        // marginBottom: 20,
        margin: 20,
  
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
  
});

export default NotificationsPage;
