import React, { useState  } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;



const SelectDoctor1 = () => {

  const handleYes = () => {
    console.log('Yes');
  };

  const handleNo = () => {
    console.log('No');
  };
    
    return(
      
      <View style = {styles.MainContainer}>
        <Image source = {require('../logo1.png')} style={{position:'absolute', width: 100, height: 100, top : 20, left : 10,resizeMode: 'contain'}}/>

        <View style={styles.rectangleup}>
        </View>
        <View style={styles.rectangledown}>
        </View>
        
        <View style = {styles.QuestionContainer}>

        <Text style={styles.questionText}>Do you want to consult Doctor?</Text>

        <View style ={styles.ButtonContainer}>
        <TouchableOpacity
        style={[styles.optionCard]}
        onPress={handleYes}
      >
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionCard]}
        onPress={handleNo}
      >
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>

      </View>
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

    rectangleup: {
      position: "absolute",
      backgroundColor: "#2EEE9D",
      width: horizontalScale(321),
      height: verticalScale(313),
      transform: [{ rotate: "-25.68deg" }],
      left: horizontalScale(280),
      top: verticalScale(-30),
    },
    rectangledown: {
      position: "absolute",
      backgroundColor: "#2EEE9D",
      width: horizontalScale(321),
      height: verticalScale(313),
      transform: [{ rotate: "-25.85deg" }],
      right: horizontalScale(180),
      bottom: verticalScale(-200),
    },

    
    ButtonContainer:
    {
      flexDirection: 'row',
      // margin : 50
      
    },
    QuestionContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
  
    optionCard :
    {
      backgroundColor: '#2F4052',
      borderRadius: 20,
      // padding: 50,
      paddingVertical : 50,
      width: '40%',
      margin : 20,

    },
    questionText: {
      color: '#2EEE9D',
      // fontSize: 20,
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign:"center"
  
    },
    buttonText: {
      color: '#2EEE9D',
      // fontSize: 20,
      fontSize: 24,
      fontWeight: 'bold',
      // marginBottom: 20,
      textAlign:"center"
  
    },


  
});

export default SelectDoctor1;
