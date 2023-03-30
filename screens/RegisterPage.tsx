import React, { useState  } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, ScrollView, Alert  } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;



const RegisterPage = ({navigation}) => {

  const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prooftype, setProoftype] = useState('');
  const [proofno, setProofno] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const status = 1 ;


  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };



  const handleRegister =  () => {

    axios.post(' https://e62e-2a09-bac1-3680-58-00-ca-86.in.ngrok.io/login', {"username":username, "role":"Patient", "password" : password}
    ).then((response) => {
      Alert.alert('Success', 'User registered successfully');
      console.log(response.data)
    }).catch((error) => {
      Alert.alert('Error', error.message);
      console.log(error.message)
    });

    axios.post(' https://e62e-2a09-bac1-3680-58-00-ca-86.in.ngrok.io/patient',
    {
      "name":name ,
      "dob" : dob, 
      "gender" :  gender, 
      "phoneNo" : phone, 
      "email" : email, 
      "proofType" : prooftype, 
      "proofNum" : proofno,
      "username":username,
      "status" :  1
    }).then((response) => {
      Alert.alert('Success', 'User registered successfully');
      console.log(response.data)
    }).catch((error) => {
      Alert.alert('Error', error.message);
      console.log(error.message)
    });

    navigation.navigate('LoginPage')

  };



    return(
      <View style = {styles.MainContainer}>
        
        <View style={styles.rectangleup}>
        </View>
        {/* <View style={styles.rectangledown}>
        </View> */}
        <Image source = {require('../logo1.png')} style={{width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>

        <View style={styles.inputContainer}>
          <Text style = {styles.heading}>Sign Up </Text>
          <ScrollView>

          <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  value={name}
                  placeholder="Name"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue

                />
          <TextInput
                  style={styles.input}
                  onChangeText={setDob}
                  value={dob}
                  placeholder="DOB"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue

                />
          <TextInput
                  style={styles.input}
                  onChangeText={setGender}
                  value={gender}
                  placeholder="Gender"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
          {/* <TextInput
                  style={styles.input}
                  onChangeText={setPhone}
                  value={phone}
                  placeholder="Phone Number"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
          <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
          <TextInput
                  style={styles.input}
                  onChangeText={setProoftype}
                  value={prooftype}
                  placeholder="Proof Type"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
          <TextInput
                  style={styles.input}
                  onChangeText={setProofno}
                  value={proofno}
                  placeholder="Proof Number"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                /> */}
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
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
          <TextInput
                  style={styles.input}
                  onChangeText={setConfirmPassword}
                  value={confirmpassword}
                  placeholder="Confirm Password"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
        </ScrollView>
        </View>

        <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={handleCheckbox}
          style={styles.checkbox}
        />
        <TouchableOpacity onPress={() => alert('Terms and Conditions')}>
          <Text style={styles.checkboxLabel}>I agree to the Terms and Conditions</Text>
        </TouchableOpacity>
        </View>


      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      </View>
    );

};


const styles = StyleSheet.create(
{
    MainContainer: 
    {
      flex: 1,
      // Set content's vertical alignment.
      // justifyContent: 'center',
      // Set content's horizontal alignment.
      // alignItems: 'center',
      // Set hex color code here.
      borderwidth:10,
      backgroundColor: '#16202A',
    },
  
    rectangleup: {
      position: "absolute",
      backgroundColor: "#2EEE9D",
      width: horizontalScale(321),
      height: verticalScale(313),
      transform: [{ rotate: "-38.68deg" }],
      left: horizontalScale(280),
      top: verticalScale(-30),
    },
    rectangledown: {
      position: "absolute",
      backgroundColor: "#2EEE9D",
      width: horizontalScale(321),
      height: verticalScale(313),
      transform: [{ rotate: "-22.85deg" }],
      right: horizontalScale(230),
      bottom: verticalScale(-280),
    },

    heading:
    {
      fontWeight: 'bold',
      color : "#2EEE9D",
      fontSize: 32,
      marginBottom : 20,
      // fontFamily: FontFamily.interSemibold,
    },

    inputContainer: {
      width: '80%',
      marginLeft: 30,
      marginBottom: 20,
      marginTop: 15,
      // justifyContent: 'center',
      // Set content's horizontal alignment.
      // alignItems: 'center',
    },

    input: {
      height: 40,
      width: '80%',
      // borderColor: 'gray',
      // borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
  
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      marginLeft : 10
    },

    checkbox: {
      marginRight: 10,
    },

    checkboxLabel: {
      fontSize: 16,
    },

    button: {
      backgroundColor: '#2F4052',
      padding: 10,
      borderRadius: 500,
      opacity: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft : 100,
      marginRight : 100
    },

    buttonText: {
      color: '#2EEE9D',
      fontSize: 20,
    },
});

export default RegisterPage;
