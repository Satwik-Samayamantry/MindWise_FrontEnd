import React, { useState, useEffect } from 'react';
import {UserContext, UserContextProvider} from './global/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';
import ScreenStack from './Stack';
import OfflinePage from './screens/OfflinePage';
import NetInfo from '@react-native-community/netinfo';
// import Translate from '@google-cloud/translate';

// import GoogleTranslate from 'react-native-google-translate';

const MainApp = () => {
  const netInfo = useNetInfo();
  const [isonline,setIsonline] = useState(true)


  // useEffect(()=>{
  //   const fetchstatus = async () => {
  //     if(netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
  //     {
  //       console.log("offline")
  //       setIsonline(false);
  //     }
  //     else{
  //       setIsonline(true);
  //     }
  //     };
  //     fetchstatus()
  // },[])

  useEffect(() => {
    // Check for network connectivity
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        // Device is online, send data to backend
        // sendDataToBackend();
        setIsonline(true);
      }
      else{
        setIsonline(false);
      }
    });
  }, []);

  // useEffect(()=>{
  //   const { Translate } = require('@google-cloud/translate').v2;
  //   const translate = new Translate({keyFilename: 'C:\Users\samay\Downloads/mindwise-384906-344ce5bedad5.json'});
    
  //   const targetLanguage = 'fr'; // Target language
  //   const text = 'Hello world'; // Text to be translated
    
  //   translate.translate(text, targetLanguage).then((translation) => {
  //     console.log(`Translated text: ${translation}`);
  //   });
    
  // },[])


  // useEffect(()=>{
  //     const fetchUserData = async () => {
  //       const translate = new Translate({ projectId: 'mindwise-384906', keyFilename: 'C:\Users\samay\Downloads/mindwise-384906-344ce5bedad5.json' });
  //       const text = 'Hello';
  //       const targetLanguage = 'es';
  //       const [translation] = await translate.translate(text, targetLanguage);
  //       console.log(translation);
  //     };
  //     fetchUserData()  
  // },[])

    // useEffect(()=>{
    //     const fetchUserData = async () => {
    //       const textToTranslate = 'Hello, world!';
    //       const sourceLanguage = 'en';
    //       const targetLanguage = 'es';
          
    //       GoogleTranslate.translate(textToTranslate, sourceLanguage, targetLanguage)
    //         .then(result => {
    //           console.log(result);
    //         })
    //         .catch(error => {
    //           console.error(error);
    //         });
    //               };
    //     fetchUserData()  
    // },[])


  return(

    <UserContextProvider>
      {isonline?
      <ScreenStack /> :
      <OfflinePage /> 
      }
    </UserContextProvider>
  )
};
  
export default MainApp;
