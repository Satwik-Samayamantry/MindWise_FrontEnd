import React, { useState  } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

var taskname = "TAskNAme1";
var tasktext = "Description of Task 1 will be displayed here.Description of Task 1 will be displayed here. Description of Task 1 will be displayed here. Description of Task 1 will be displayed here. Description of Task 1 will be displayed here. Description of Task 1 will be displayed here. Description of Task 1 will be displayed here. Description of Task 1 will be displayed here. ";
var taskquestion = "question111 ?";
var optionslist = ['yes','no']

const TaskPage = () => {

  const handleYes = () => {
    console.log('Yes');
  };

  const handleNo = () => {
    console.log('No');
  };
    
  const [selectedOption, setOption]= useState('');

    return(

        <View style = {styles.MainContainer}>
        <Image source = {require('../logo1.png')} style={{width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>

        <View style={styles.TaskContainer}> 
        <Text style={styles.TaskName}>{taskname}</Text>
        <Text style={styles.TaskText}>{tasktext}</Text>
        <Text style={styles.TaskQuestion}>{taskquestion}</Text>


        {optionslist.map(option =>

          <TouchableOpacity 
           key={option}
           onPress = {() => setOption(option)}>
              <View style={styles.radiolist}>

                <View style={styles.outer}> 
                  {
                    selectedOption== option ? <View style={styles.inner}/> : null
                  }
                   
                </View>

                <Text style={styles.radiotext}>{option}</Text>
              </View>

          </TouchableOpacity>


        )}
        

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
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    radiolist:
    {
      flexDirection:'row',
    },

    TaskName:
    {
      color: '#2EEE9D',
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 15,
    },

    TaskText:
    {
      color: '#FFFFFF',
      fontSize: 24,
      // fontSize: 36,
      // fontWeight: 'bold',
      marginBottom: 24,
      // marginLeft : 10,
      // marginTop : 10
    },

    TaskQuestion:
    {
      color: '#FFFFFF',
      fontSize: 24,
      marginBottom: 12,

    },

    TaskContainer:
    {
      marginLeft : 27,
      marginTop : 10
      
    },

    radiotext:
    {
      color: '#FFFFFF',
      fontSize: 18,
      marginLeft : 5
    },

    outer:
    {
      width:18,
      height:18,
      borderWidth:1,
      borderRadius:15,
      borderColor:'#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom : 15,

    },
    inner:
    {
      width:10,
      height:10,
      borderRadius:15,
      backgroundColor:'#2EEE9D',
      margin:2
    },


  
});

export default TaskPage;
