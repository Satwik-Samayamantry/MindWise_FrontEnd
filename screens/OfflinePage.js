import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Progress from 'react-native-progress';
import {UserContext, UserContextProvider} from '../global/UserContext';
import {storeData,getData,deleteData} from '../global/LocalStore'
import '../global/ngrok.js'


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;

const OfflinePage = ({navigation}) => {

    const {user,setUser,currentTask, setCurrentTask} = useContext(UserContext);
    const [feelings,setfeelings] = useState('');

    const handleSubmit = async () => {
        const currentDate = new Date();
        storeData('cache',{"feelings":feelings,"timestamp":currentDate.toISOString()})
        setfeelings('');
        // const data1 = await getData("cache");
        // console.log(Date())
        // console.log(data1)
    }

    useEffect(()=>{
        const fetchUserData = async () => {
          const data1 = await getData('user');
          // console.log(data1)
          setUser(data1);
        };
        fetchUserData()  
      },[])

    return(
        <View style = {styles.MainContainer}>
        <Image source = {require('../logo1.png')} style={{ width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>
        <Text style={styles.startText}> Hey, {user?.name}</Text>
        <Text style={styles.offlineText}>You are Offline !!</Text>
        {/* <Text style={styles.quesText}>How are you feeling now ?</Text> */}

        <TextInput
                  style={styles.input}
                  onChangeText={setfeelings}
                  value={feelings}
                  placeholder="How are you feeling now ?"
                />

        <View style={styles.buttonview}>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Submit</Text>
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
      backgroundColor: '#16202A',
      
    },
    startText : {
      color: '#2EEE9D',
      fontSize: 36,
      fontWeight: 'bold',
      margin: 20,

    },
    offlineText:{
        color: '#B73B3B',
        fontSize: 20,
        fontWeight: 'bold',
        margin:20,
        marginLeft: 30,
    },
    quesText:{
        color: '#FFFFFF',
        fontSize: 20,
        margin:20,
        marginLeft: 30,
    },
    input: {
        height: 200,
        width: '80%',
        marginLeft: 30,
        padding: 25,
        borderRadius: 5,
        backgroundColor : '#2F4052', 
        borderRadius : 30,
        textAlignVertical: 'top',
        fontSize: 16,
    },

    buttonview :{
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#2F4052',
        padding: 10,
        borderRadius: 50,
        opacity: 0.7,
        paddingLeft:30,
        paddingRight:30,
        margin : 20
    },

    buttonText: {
        color: '#2EEE9D',
        fontSize: 20,
    },

});

export default OfflinePage;
    