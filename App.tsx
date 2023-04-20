import React from 'react';
import {UserContext, UserContextProvider} from './global/UserContext';
import ScreenStack from './Stack';

const MainApp = () => {
  return(
    <UserContextProvider>
      <ScreenStack />
    </UserContextProvider>
  )
};
  
export default MainApp;
