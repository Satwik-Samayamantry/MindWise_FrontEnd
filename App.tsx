import React, { useState, useEffect } from 'react';
import {UserContext, UserContextProvider} from './global/UserContext';
import {useNetInfo} from '@react-native-community/netinfo';
import ScreenStack from './Stack';
import OfflinePage from './screens/OfflinePage';
import NetInfo from '@react-native-community/netinfo';

const MainApp = () => {
  const netInfo = useNetInfo();
  const [isonline,setIsonline] = useState(false)


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


  return(
    <UserContextProvider>
      {!isonline?
      <OfflinePage /> :
      <ScreenStack /> 
      }
    </UserContextProvider>
  )
};
  
export default MainApp;
