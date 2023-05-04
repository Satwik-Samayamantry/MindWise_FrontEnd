import React, { useState, useContext } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, ScrollView, Alert  } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import {UserContext, UserContextProvider} from '../global/UserContext';
import {storeData,getData,deleteData} from '../global/LocalStore'
import Icon from 'react-native-vector-icons/Ionicons';  
import DatePicker from 'react-native-date-picker'
import '../global/ngrok.js'


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;



const RegisterPage = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prooftype, setProoftype] = useState('');
  const [proofno, setProofno] = useState('');


  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date())
  const [gender, setGender] = useState('Gender');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [open, setOpen] = useState(false)
  const [dobgiven, setdobgiven] = useState(false)
  let genderOptions = ["Male", "Female", "Other"];
  const [genderselected,setgenderselected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const status = 1 ;

  const {user,setUser,currentTask, setCurrentTask} = useContext(UserContext);


  const handleDate = (selectedDate) => {
    let date = selectedDate.getDate()
    let month = selectedDate.getMonth()+1
    let year = selectedDate.getFullYear()
    setDob(year+'-'+month+'-'+date);
    setDate(selectedDate)
    setdobgiven(true)
    console.log(dob)
    // console.log(selectedDate.getDate())
    // console.log(selectedDate.getMonth())
    // console.log(selectedDate.getFullYear())
  }

  const showOptions = () => {
      setIsVisible(!isVisible)
  }

  const handleGender = (selectedGender) => {
    showOptions();
    setGender(selectedGender);
    setgenderselected(true);
  }
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const [hidepassword1,sethidepassword1] = useState(true)

  const handleEye1 = () =>
  {
    sethidepassword1(!hidepassword1)
  }

  const [hidepassword2,sethidepassword2] = useState(true)

  const handleEye2 = () =>
  {
    sethidepassword2(!hidepassword2)
  }


  const handleRegister =  async () => {
    let jt = await getData('jwt-token')
    const header={'Authorization':jt}

    axios.post(global.ngroklink+'/login', {"username":username, "role":"Patient", "password" : password}, {headers: header}
    ).then((response) => {
      // Alert.alert('Success', 'User registered successfully');
      // console.log(dob)

      axios.post(global.ngroklink+'/patient',
      {
        "name":name ,
        "dob" : dob, 
        "gender" :  gender, 
        "username":username,
        "status" :  1
      }, {headers: header}).then((response) => {
        // Alert.alert('Success', 'User registered successfully');
        setUser(response.data);
        storeData('user',response.data);
        // console.log(response.data)
        navigation.navigate('QuestionnairePage')
      }).catch((error) => {
        Alert.alert('Error', error.message);
        console.log(error.message)
      });

    }).catch((error) => {
      Alert.alert('Error', error.message);
      console.log(error.message)
    });

  };



    return(
      <ScrollView style = {styles.MainContainer}>
        
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

{/* --------------------------------------------------------------------------------------------- */}

          <TouchableOpacity
            style = {styles.dropdown}
            onPress={()=>setOpen(true)}>
              <View style={styles.dropdownView}>
                  <Text style = {[styles.dropdownText ]}> {dobgiven ? dob : "DOB"} </Text>
                  <Icon style={[{color: 'gray',alignContent : "flex-end", marginRight : 10}]} size={15} name={"calendar"}/>  
              </View>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={(date) => {
              setOpen(false)
              handleDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />

{/* --------------------------------------------------------------------------------------------- */}
          <TouchableOpacity
          style = {styles.dropdown}
          onPress={showOptions}>
            <View style={styles.dropdownView}>
                <Text style = {[styles.dropdownText ,{color : genderselected ? 'white' : 'gray'}]}> {gender} </Text>
                <Icon style={[{color: 'gray', alignContent : "flex-end", marginRight : 10}]} size={15} name={isVisible ? 'caret-up' : 'caret-down'}/>  
            </View>
            </TouchableOpacity>
          
          {isVisible && 
              genderOptions.map(genderoption => 
                <TouchableOpacity
                    style = {styles.dropdownOptions}
                    key = {genderoption}
                    onPress={()=>handleGender(genderoption)}
                >
                  <Text style = {[styles.dropdownText, {color : 'gray'}]}> {genderoption}</Text>
              </TouchableOpacity>)
          }

{/* --------------------------------------------------------------------------------------------- */}
          <TextInput
                  style={styles.input}
                  onChangeText={setUsername}
                  value={username}
                  placeholder="Username"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />

          <View style={styles.passwordView}>
            <TextInput
                    style={styles.input1}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    underlineColorAndroid="#2F4052" 
                    secureTextEntry={hidepassword1}
                  />

            <TouchableOpacity
              onPress={handleEye1}>
                <Icon style={[{color: 'gray', alignContent : "flex-end"}]} size={25} name={hidepassword1 ? 'eye-off' : 'eye'}/>  
            </TouchableOpacity>

          </View>

          <View style={styles.passwordView}>
            <TextInput
                    style={styles.input1}
                    onChangeText={setConfirmPassword}
                    value={confirmpassword}
                    placeholder="Confirm Password"
                    underlineColorAndroid="#2F4052" 
                    secureTextEntry={hidepassword2}
                  />

            <TouchableOpacity
              onPress={handleEye2}>
                <Icon style={[{color: 'gray', alignContent : "flex-end"}]} size={25} name={hidepassword2 ? 'eye-off' : 'eye'}/>  
            </TouchableOpacity>

          </View>
        </ScrollView>
        </View>

{/* --------------------------------------------------------------------------------------------- */}
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

{/* --------------------------------------------------------------------------------------------- */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      </ScrollView>
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

    input1: {
      height: 40,
      width: '73%',
      // borderColor: 'gray',
      // borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },

    
    dropdownView: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    dropdown:{
      backgroundColor:'#16202A',
      width: '80%',
      height : 40,
      borderRadius: 5,
      borderWidth: 2,
      borderColor : '#2F4052',
      // alignItems: 'center',
      justifyContent: 'center',
      marginVertical : 10
    },
    dropdownOptions:{
      backgroundColor:'#16202A',
      width: '80%',
      height : 40,
      borderRadius: 5,
      borderWidth: 2,
      borderColor : '#2F4052',
      // alignItems: 'center',
      justifyContent: 'center',
    },
    dropdownText : {
      // color : "gray",
      marginLeft : 5,

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
    passwordView: {
      // backgroundColor: '#16202A',
      // width: '100%',
      // borderRadius: 8,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
      // borderWidth: 4,
      // borderColor: '#16202A'
      },



});

export default RegisterPage;
