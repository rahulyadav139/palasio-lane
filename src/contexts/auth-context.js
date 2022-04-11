import React, { useReducer } from 'react';

const AuthContext = React.createContext();

const initialState = {
  isAuth: false,
  token: '',
  user: '',
  email: '',
  addresses: [],
};

const authReducer = (state, action) => {
  if (action.type === 'LOGIN') {
    const { token, user, addresses, email } = action;
    return {
      isAuth: true,
      token,
      user,
      addresses,
      email,
    };
  }

  if (action.type === 'LOGOUT') {
    return initialState;
  }

  if (action.type === 'UPDATE-ADDRESS') {
    const { addresses } = action;
    return {
      ...state,
      addresses,
    };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log(state);

  const loginHandler = (fullName, token, addresses, email) => {
    dispatch({ type: 'LOGIN', token, user: fullName, addresses, email });
  };

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateAddressHandler = addresses => {
    dispatch({ type: 'UPDATE-ADDRESS', addresses });
  };

  const defaultValue = {
    ...state,
    loginHandler,
    logoutHandler,
    updateAddress: updateAddressHandler,
  };

  return (
    <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
