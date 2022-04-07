import React, { useState } from 'react';

const OrderContext = React.createContext();

const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState('');

  const defaultValues = {
    orderDetails,
    setOrderDetails,
    resetOrderDetails() {
      return setOrderDetails('');
    },
  };

  return (
    <OrderContext.Provider value={defaultValues}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
