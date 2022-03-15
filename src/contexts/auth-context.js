import React, { useContext, useReducer } from 'react';

const AuthContext = React.createContext();

const authReducer = (state, action) => {
  if (action.type === 'LOGIN') {
    return { isAuth: true, token: action.token };
  }

  if (action.type === 'LOGOUT') {
    return { isAuth: false, token: '' };
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuth: false,
    token: '',
  });

  console.log(state);

  const loginHandler = token => {
    dispatch({ type: 'LOGIN', token });
  };

  const logoutHandler = token => {
    dispatch({ type: 'LOGOUT' });
  };

  const defaultValue = {
    isAuth: state.isAuth,
    token: state.token,
    loginHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={defaultValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
