import React, { useState  } from 'react';
import {StyleSheet, View, Dimensions, Image, Text, TextInput, TouchableOpacity, Alert,ScrollView } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';  


const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size : number ) => (width / guidelineBaseWidth) * size;
const verticalScale = (size : number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size : number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

var questions = [{"question" : "Which of the following describes you the best currently?", "type" : "mcq", "options" : ["Working","Studying","Homemaker","Searching for a job","Retired"]},
{"question" : "Marital Status1", "type" : "mcq", "options" : ["Married","Single"]},
{"question" : "Have you ever attempted to hurt yourself in the past?1", "type" : "dropdown", "options" : ["Yes","No"]},
{"question" : "Marital Status2", "type" : "mcq", "options" : ["Married","Single"]},
{"question" : "Have you ever attempted to hurt yourself in the past?2", "type" : "dropdown", "options" : ["Yes","No"]},
{"question" : "Marital Status3", "type" : "mcq", "options" : ["Married","Single"]},
{"question" : "Have you ever attempted to hurt yourself in the past?3", "type" : "dropdown", "options" : ["Yes","No"]},
{"question" : "Marital Status4", "type" : "mcq", "options" : ["Married","Single"]},
]


const NotificationsPage = ({navigation}) => {

    const [answers, setAnswers] = useState({});

    const handleAnswerSelect = (question, answer) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [question]: answer,
        }));
      };

    const questionRenderer = (ques) =>{

      const [selectedOption, setOption]= useState('Select Option');
      const [isVisible, setIsVisible] = useState(false);
      const showOptions = () => {
        setIsVisible(!isVisible)
      }
    
      const handlemcq = (ques,option) =>{
        setOption(option)
        handleAnswerSelect(ques,option)
      }
      const handledropdown = (ques,option) =>{
        setOption(option)
        setIsVisible(false)
        handleAnswerSelect(ques,option)
      }
    
      return (
        <View style = {styles.questionview}>
          <Text style={styles.Question}>{ques.question}</Text>
            {ques.type == "mcq" ?
              (ques.options.map(option =>
    
                  <TouchableOpacity 
                  key={option}
                  onPress = {() => handlemcq(ques.question,option)}>
                      <View style={styles.radiolist}>
        
                        <View style={styles.outer}> 
                          {
                            selectedOption== option ? <View style={styles.inner}/> : null
                          }
                        </View>
        
                        <Text style={styles.radiotext}>{option}</Text>
                    
                      </View>
                  </TouchableOpacity>)
              )
              :
              (
                <TouchableOpacity
                  style = {styles.dropdown}
                  onPress={showOptions}>
                    <View style={styles.dropdownView}>
                        <Text style = {[styles.dropdownText ]}>{selectedOption} </Text>
                        <Icon style={[{color: 'gray', alignContent : "flex-end", marginRight : 10}]} size={15} name={isVisible ? 'caret-up' : 'caret-down'}/>  
                    </View>
                </TouchableOpacity>
              )
          
            }
    
            {isVisible && ques.type == "dropdown" &&
                  ques.options.map(option => 
                    <TouchableOpacity
                        style = {styles.dropdownOptions}
                        key = {option}
                        onPress={()=>handledropdown(ques.question,option)}
                    >
                      <Text style = {[styles.dropdownText, {color : 'gray'}]}> {option}</Text>
                  </TouchableOpacity>) }
        </View>
      );
    }

    const handleSubmit = () => {
      console.log(answers)
        navigation.navigate('SelectDoctor1')
    };

    return(
      <ScrollView style = {styles.MainContainer}>
                <View style={styles.rectangleup}>
        </View>
        <View style={styles.rectangledown}>
        </View>


        <Text style = {styles.heading}>Evaluation</Text>

        {questions.map(quest =>
            questionRenderer(quest)
        )}
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      
      </ScrollView>
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
      transform: [{ rotate: "-38.68deg" }],
      left: horizontalScale(280),
      top: verticalScale(30),
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
      fontSize: 36,
      margin : 20,
      marginLeft : 15,
      marginTop : 25
      // fontFamily: FontFamily.interSemibold,
    },
    questionview :
    {
      margin : 10,
      marginLeft : 15
    },

    Question:
    {
      color: '#E6e6E6',
      fontSize: 20,
      marginBottom: 10,

    },
    radiolist:
    {
      flexDirection:'row',
      marginLeft : 5
    },
    radiotext:
    {
      color: '#E6e6E6',
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
      marginBottom : 10,
      marginLeft : 5
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
      marginLeft : 5
    },
    dropdownText : {
      color : "#E6e6E6",
      marginLeft : 5,

    },


    button: {
      backgroundColor: '#2F4052',
      padding: 10,
      borderRadius: 500,
      opacity: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft : 100,
      marginRight : 100,
      marginBottom : 30
    },

    buttonText: {
      color: '#2EEE9D',
      fontSize: 20,
    },
  
});

export default NotificationsPage;
