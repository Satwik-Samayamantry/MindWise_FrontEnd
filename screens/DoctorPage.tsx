import React, { useState  } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;



const LoginPage = () => {


    // let doc_data;
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
          "specialization": "S01"
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
          "specialization": "S02"
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
          "specialization": "S03"
      }
  ];
    const funcall = () => {
      axios.get('https://3ad9-2406-7400-45-783-c83c-6394-7ac5-c574.in.ngrok.io/doctors').then((response) => {
              console.log(response.data);
              doc_data = response.data;
            
            }).catch((error) => {
              Alert.alert('Error', error.message);
              console.log(error.message)
            });;
    };
    
    // const x = funcall();

    return(
      
      <View style = {styles.MainContainer}>

        <View style={styles.rectangleup}/>
        <View style={styles.rectangledown}/>

        <Text style={styles.pageheading}> Available Doctors</Text>

        {doc_data.map(doctor => 
                            <TouchableOpacity
                            key = {doctor.name}
                            style={styles.doctorbutton}>
                            {/* onPress = {() => connectToDevice(device)}> */}
        <View style={styles.buttonlist}>

        <Image source = {require('../pp.jpg')} style={{width: 50, height: 70,left:10,resizeMode: 'contain'}}/>
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

    </View>
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

export default LoginPage;
