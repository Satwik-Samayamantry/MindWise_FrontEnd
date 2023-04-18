import { useState, useContext, createContext} from 'react';

const UserContext = createContext(0);

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
      <UserContext.Provider
        value={{
            user,
            setUser,
        }}>
        {children}
      </UserContext.Provider>
    );
  };

export {UserContext, UserContextProvider};
  