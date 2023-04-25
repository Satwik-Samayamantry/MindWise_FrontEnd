import { useState, useContext, createContext} from 'react';

const UserContext = createContext(0);

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    return (
      <UserContext.Provider
        value={{
            user,
            setUser,
            currentTask, 
            setCurrentTask
        }}>
        {children}
      </UserContext.Provider>
    );
  };

export {UserContext, UserContextProvider};
  