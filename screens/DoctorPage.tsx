import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';  


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;



const DoctorPage = ({navigation}) => {

    const [doc_data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('https://ba4e-2a09-bac5-3b4f-7eb-00-ca-7f.in.ngrok.io/doctors');
        setData(result.data);
      };

      fetchData();
    }, []);


    const handleButtonPress = (doctorName) => {
      console.log(doctorName);
      navigation.navigate('App')
    };
  

    return(
      
      <View style = {styles.MainContainer}>

        <View style={styles.rectangleup}/>
        <View style={styles.rectangledown}/>

        <Text style={styles.pageheading}> Available Doctors</Text>

        {doc_data.map(doctor => 
                            <TouchableOpacity
                            key = {doctor.name}
                            style={styles.doctorbutton}
                            onPress = {() => handleButtonPress(doctor.name)}>
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

export default DoctorPage;
