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


const NotificationsPage = ({navigation}) => {

    const handleSubmit = () => {
        navigation.navigate('SelectDoctor1')
    };

    return(
      
      <View style = {styles.MainContainer}>
        <Text style={{color:'#2EEE9D',fontSize:38,fontWeight:'bold'}}> Questionnaire Page</Text>
        
        <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        >
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      
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
      justifyContent: 'center',
      alignItems: 'center',
      
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

export default NotificationsPage;
