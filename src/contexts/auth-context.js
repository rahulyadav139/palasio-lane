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
  if (action.type === 'UPDATE-EMAIL') {
    const { updatedEmail } = action;
    return { ...state, email: updatedEmail };
  }
  if (action.type === 'UPDATE-NAME') {
    const { updatedName } = action;
    return { ...state, user: updatedName };
  }

  if (action.type === 'GET-TOKEN') {
    return { ...state, token: action.token };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginHandler = (fullName, token, addresses, email) => {
    document.cookie = `token=${token}`;

    dispatch({
      type: 'LOGIN',
      token,
      user: fullName,
      addresses,
      email,
    });
  };

  const logoutHandler = () => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    dispatch({ type: 'LOGOUT' });
  };

  const updateAddressHandler = addresses => {
    dispatch({ type: 'UPDATE-ADDRESS', addresses });
  };

  const updateEmailHandler = updatedEmail => {
    dispatch({ type: 'UPDATE-EMAIL', updatedEmail });
  };
  const updateNameHandler = updatedName => {
    dispatch({ type: 'UPDATE-NAME', updatedName });
  };

  const getTokenHandler = token => {
    dispatch({ type: 'GET-TOKEN', token });
  };

  const defaultValue = {
    ...state,
    loginHandler,
    logoutHandler,
    updateAddress: updateAddressHandler,
    updateEmail: updateEmailHandler,
    updateName: updateNameHandler,
    getToken: getTokenHandler,
  };

  return (
    <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
