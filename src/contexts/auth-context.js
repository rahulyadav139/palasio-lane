import React, { useReducer } from 'react';

const AuthContext = React.createContext();

const initialState = {
  isAuth: false,
  token: '',
  fullName: '',
  addresses: [],
};

const authReducer = (state, action) => {
  if (action.type === 'LOGIN') {
    return {
      isAuth: true,
      token: action.token,
      fullName: action.fullName,
      addresses: action.addresses,
    };
  }

  if (action.type === 'LOGOUT') {
    return initialState;
  }

  if (action.type === 'UPDATE-ADDRESS') {
    return {
      ...state,
      addresses: action.addresses,
    };
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginHandler = (fullName, token, addresses) => {
    dispatch({ type: 'LOGIN', token, fullName, addresses });
  };

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateAddressHandler = addresses => {
    dispatch({ type: 'UPDATE-ADDRESS', addresses });
  };

  const defaultValue = {
    isAuth: state.isAuth,
    token: state.token,
    fullName: state.fullName,
    addresses: state.addresses,
    loginHandler,
    logoutHandler,
    updateAddress: updateAddressHandler,
  };

  return (
    <AuthContext.Provider value={defaultValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
