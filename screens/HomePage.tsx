import React, { useState  } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;
var name = "John"
var progress = 49
var taskstatus = 1


const HomePage = () => {

    let exercise_data = [
      {
          "exerciseID": 1,
          "defaultflag": 1,
          "description": "Description of task1",
          "type": "binary",
          "ans": "value2"
      },
      {
          "exerciseID": 12,
          "defaultflag": 1,
          "description": "value3",
          "type": "etc",
          "ans": "value2"
      }
  ];
    
    return(
      
      <View style = {styles.MainContainer}>
        <Image source = {require('../logo1.png')} style={{ width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>
        <Text style={styles.startText}> Hey, {name} !!</Text>

        <View style={styles.rect}>
          <Text style={styles.questext}> How are you today?</Text>
          
          <View style={styles.emojibar}>
            <TouchableOpacity>
              <Text style={styles.emoji}>😠</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.emoji}>🙁</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.emoji}>😐</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.emoji}>🙂</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.emoji}>😄</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={styles.progressview}>
          <Text style={styles.progresstext}>Your Progress </Text>
          <Text style={styles.progresstext}>                       {progress}% </Text>
        </View>

        <View style={styles.barview}> 
        <Progress.Bar progress={progress/100} width={horizontalScale(300)} borderRadius={10} height={15} color='#2EEE9D' unfilledColor='#2F4052' borderColor = '#2F4052' />
        </View>

        {exercise_data.map(doctor => 

                <TouchableOpacity
                key={doctor.exerciseID}
                style={styles.taskbutton}>
                {/* onPress = {() => connectToDevice(device)}> */}
                
                        <View style={styles.buttonlist}>
                                        <Text style={styles.TaskText}>
                                            Task {doctor.exerciseID}
                                        </Text>

                                        {taskstatus ? <Text style={styles.statusText1}> Completed</Text>  : <Text style={styles.statusText2}> Yet to complete</Text>}
                        </View>

              </TouchableOpacity>)}


        <TouchableOpacity 
  // onPress={() => navigation.navigate('RegisterPage')}
          >
          <Text style={styles.chattext}>Chat with Doctor</Text></TouchableOpacity>


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
