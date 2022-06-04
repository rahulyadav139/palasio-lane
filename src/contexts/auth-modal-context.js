import React, { useReducer } from 'react';

const AuthModalContext = React.createContext();

const authModalReducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH':
      return { ...state, isAuthTypeLogin: !state.isAuthTypeLogin };

    case 'RESET':
      return { isAuthModal: false, isAuthTypeLogin: true };

    case 'SHOW':
      return { ...state, isAuthModal: true };
    default:
      return state;
  }
};

const AuthModalProvider = props => {
  const [state, dispatch] = useReducer(authModalReducer, {
    isAuthModal: false,
    isAuthTypeLogin: true,
  });

  const switchModalHandler = () => {
    dispatch({ type: 'SWITCH' });
  };

  const resetModalHandler = () => {
    dispatch({ type: 'RESET' });
  };

  const showModalHandler = () => {
    dispatch({ type: 'SHOW' });
  };

  const defaultValue = {
    isAuthModal: state.isAuthModal,
    isAuthTypeLogin: state.isAuthTypeLogin,
    switchModal: switchModalHandler,
    resetModal: resetModalHandler,
    showModal: showModalHandler,
    dispatch,
  };

  return (
    <AuthModalContext.Provider value={defaultValue}>
      {props.children}
    </AuthModalContext.Provider>
  );
};

export { AuthModalProvider, AuthModalContext };
