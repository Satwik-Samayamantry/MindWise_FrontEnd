import React, { useState, useContext, useEffect } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import {UserContext, UserContextProvider} from '../global/UserContext';
import {storeData,getData,deleteData} from '../global/LocalStore'
import '../global/ngrok.js'
import Icon from 'react-native-vector-icons/Ionicons';  


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


const ProfilePage = ({navigation}) => {

    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const {user,setUser,currentTask, setCurrentTask} = useContext(UserContext);
    const [doctorname,setdoctorname] = useState('');

    const handleDeleteAcc = () => {
        Alert.alert('Are you sure you want to Delete Account?', 'You lose all data related to your account.');
    }

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

    const [hidepassword3,sethidepassword3] = useState(true)

    const handleEye3 = () =>
    {
      sethidepassword3(!hidepassword3)
    }
  
    

    const handleLogout = () => {
      deleteData('user');
      setUser(null);
      navigation.navigate('LoginPage')
    }

    const handleSubmit = () => {
      console.log(user.username)
      console.log(oldPassword)
      console.log(newPassword)
      axios.post(global.ngroklink+'/updatePassword', {"username":user.username, "role":"Patient", "oldpassword" : oldPassword, "newpassword" : newPassword}
      ).then((response) => {
        if(response.data)
        {
          Alert.alert('Success', 'Password Update Change');
        }
        else
        {
          Alert.alert('Failed', 'Password Update Failed');
        }
      }).catch((error) => {
        Alert.alert('Error', error.message);
        console.log(error.message)
      });    }

      useEffect(()=>{
        const fetchDoctor = async () => {
          axios.get(global.ngroklink+'/getdocidbypid',{params:{pid:user?.patientID}}
          ).then((response)=>{
            axios.get(global.ngroklink+'/getdocnamebydocid', {params:{docid : response.data}}
            ).then((response11)=>{
              setdoctorname(response11.data)
            })
          })
          // const doc_name = await axios.get(global.ngroklink+'/getdocnamebydocid', {params:{docid : docid}});
          // setdoctorname(doc_name);
        };
        fetchDoctor()
        console.log(user)
      },[doctorname])
    

    return(
      
      <View style = {styles.MainContainer}>
        {/* <Text style={{color:'#2EEE9D',fontSize:38,fontWeight:'bold'}}> Profile Page</Text> */}
        <Image source = {require('../logo1.png')} style={{ width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>
        <Text style={styles.startText}> Profile</Text>

        <View style={styles.fieldview}>
        <Text style={styles.detailsText}> Name : {user?.name}</Text>
        </View>
        <View style={styles.fieldview}>
        <Text style={styles.detailsText}> DOB : {user?.dob} </Text>
        </View>

        <View style={styles.fieldview}>
        <Text style={styles.detailsText}> Gender : {user?.gender} </Text>
        </View>

        <View style={styles.fieldview}>
        <Text style={styles.detailsText}> Doctor : {doctorname} </Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.changebutton} onPress={()=>navigation.navigate('DoctorPage')}>
          <Text style={styles.buttonText}> Change Doctor</Text>
        </TouchableOpacity>
        </View>
        </View>

        <Text style={styles.startText}> Update Password</Text>

        <View style={styles.passwordView}>
            <TextInput
                    style={styles.input}
                    onChangeText={setoldPassword}
                    value={oldPassword}
                    placeholder="Current Password"
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
                    style={styles.input}
                    onChangeText={setnewPassword}
                    value={newPassword}
                    placeholder="New Password"
                    underlineColorAndroid="#2F4052" 
                    secureTextEntry={hidepassword2}
                  />

            <TouchableOpacity
              onPress={handleEye2}>
                <Icon style={[{color: 'gray', alignContent : "flex-end"}]} size={25} name={hidepassword2 ? 'eye-off' : 'eye'}/>  
            </TouchableOpacity>

          </View>

          <View style={styles.passwordView}>
            <TextInput
                    style={styles.input}
                    onChangeText={setconfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    underlineColorAndroid="#2F4052" 
                    secureTextEntry={hidepassword3}
                  />

            <TouchableOpacity
              onPress={handleEye3}>
                <Icon style={[{color: 'gray', alignContent : "flex-end"}]} size={25} name={hidepassword3 ? 'eye-off' : 'eye'}/>  
            </TouchableOpacity>

          </View>

        {/* <TextInput
                  style={styles.input}
                  onChangeText={setoldPassword}
                  value={oldPassword}
                  placeholder="Current Password"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
        <TextInput
                  style={styles.input}
                  onChangeText={setnewPassword}
                  value={newPassword}
                  placeholder="New Password"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                />
        <TextInput
                  style={styles.input}
                  onChangeText={setconfirmPassword}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  underlineColorAndroid="#2F4052" // Set the underline color to blue
                /> */}

        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            // disabled={!isChecked}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      </View>


        <View>
            {/* <TouchableOpacity
            onPress={handleDeleteAcc}>
                <Text style={styles.highlight1}>Delete Account</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={handleLogout}>
                <Text style={styles.highlight1}>Logout</Text>
            </TouchableOpacity>
        </View>

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
    fieldview:{
        flexDirection: 'row',
        alignContent:"center"
      },
      highlight1: {
        color: '#B73B3B',
        marginLeft : 25,
        marginBottom : 25,
        fontSize:18
      },
      highlight2: {
        color: '#8D99A9',
        marginLeft : 25,
        marginBottom : 25,
        fontSize:18

      },
      input: {
        height: 40,
        width: '70%',
        // borderColor: 'gray',
        // borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        marginLeft : 20,
      },
      detailsText:
      {
        color: '#FFFFFF',
        fontSize: 24,
        // fontSize: 36,
        // fontWeight: 'bold',
        marginBottom: 24,
        marginLeft : 20,
        // marginTop : 10
      },
      button: {
        backgroundColor: '#2F4052',
        padding: 10,
        borderRadius: 50,
        opacity: 0.7,
        paddingLeft:30,
        paddingRight:30,
        marginTop:15
      },
      changebutton:{
        backgroundColor: '#2F4052',
        // padding: 10,
        borderRadius: 50,
        opacity: 0.7,
        padding:10,
        marginLeft:30,
        alignItems: 'center',
      },
      buttonText: {
        color: '#2EEE9D',
        fontSize: 18,
      },
      buttonContainer: {
        flex:1,
        // justifyContent: 'center',
        alignItems: 'center',
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

export default ProfilePage;
