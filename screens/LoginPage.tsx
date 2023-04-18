import React, { useState, useContext} from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import {UserContext, UserContextProvider} from '../global/UserContext';
import {storeData,getData,deleteData} from '../global/LocalStore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;



const LoginPage = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user,setUser} = useContext(UserContext);

  const handleLogin =  () => {
    axios.post('https://40a1-2a09-bac5-3b4c-1282-00-1d8-174.ngrok-free.app/validate', {"username":username, "role":"Patient", "password" : password}
    ).then((response) => {
      
      if(response.data != null && response.data != "")
      {
        console.log(response.data)
        setUser(response.data);
        storeData('user',response.data);
        navigation.navigate('App');
      }
      else
      {
        Alert.alert('Failed', 'Username/Password Incorrect');
      }
    }).catch((error) => {
      Alert.alert('Error', error.message);
      console.log(error.message)
    });
  
  
  }


    return(
      
      <View style = {styles.MainContainer}>
        
        <View style={styles.rectangleup}>
        <View style={styles.rectangledown}>
        </View>
        </View>


        <View style={styles.inputContainer}>
        <Image source = {require('../logo1.png')} style={{width: 200, height: 200,resizeMode: 'contain',marginTop:20}}/>
          <Text style = {styles.heading}>MindWise </Text>

          <TextInput
                  style={styles.input}
                  onChangeText={setUsername}
                  value={username}
                  placeholder="Username"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
          <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Password"
                  underlineColorAndroid="#2F4052" 
                />
                
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            // disabled={!isChecked}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity> */}
          <Text style={styles.signuptext}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() =>
        navigation.navigate('RegisterPage')
      }><Text style={styles.highlight}>Register here</Text></TouchableOpacity>
          </Text>
        {/* </TouchableOpacity> */}

        {/* <Text>{userID}</Text> */}
        </View>
      </View>
    );

};


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
      transform: [{ rotate: "-30.85deg" }],
      left: horizontalScale(280),
      top: verticalScale(-10),
    },
    rectangledown: {
      position: "absolute",
      backgroundColor: "#2EEE9D",
      width: horizontalScale(321),
      height: verticalScale(313),
      // transform: [{ rotate: "-30.85deg" }],
      right: horizontalScale(430),
      bottom: verticalScale(300),
    },

    heading:
    {
      fontWeight: 'bold',
      color : "#2EEE9D",
      fontSize: 32,
      marginBottom : 20,
    }, 

    inputContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
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

    signuptext:{
      marginTop: 50,
      fontSize: 15,

    },

    highlight: {
      color: '#2EEE9D',
    },
  
  
});

export default LoginPage;
