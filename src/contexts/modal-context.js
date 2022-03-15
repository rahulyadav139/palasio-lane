import React, { useContext, useReducer } from 'react';

const ModalContext = React.createContext();

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH':
      return { ...state, isAuthTypeLogin: !state.isAuthTypeLogin };

    case 'RESET':
      return { isModal: false, isAuthTypeLogin: true };

    case 'SHOW':
      return { ...state, isModal: true };
  }
};

const ModalProvider = props => {
  const [state, dispatch] = useReducer(modalReducer, {
    isModal: false,
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
    isModal: state.isModal,
    isAuthTypeLogin: state.isAuthTypeLogin,
    switchModal: switchModalHandler,
    resetModal: resetModalHandler,
    showModal: showModalHandler,
  };

  return (
    <ModalContext.Provider value={defaultValue}>
      {props.children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
