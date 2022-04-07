import React, { useReducer } from 'react';

const WishlistContext = React.createContext();

const defaultState = {
  items: [],
  quantity: 0,
};

let oldState;

const wishlistReducer = (state, action) => {
  let updatedItems, updatedWishlist;

  switch (action.type) {
    case 'ADD':
      const alreadyExists = state.items.includes(action.prodId);

      if (alreadyExists) return state;
      updatedItems = [...state.items, action.prodId];
      updatedWishlist = { items: updatedItems, quantity: state.quantity + 1 };

      oldState = state;

      return updatedWishlist;

    case 'REMOVE':
      const isExist = state.items.includes(action.prodId);

      if (!isExist) return state;
      updatedItems = state.items.filter(el => el !== action.prodId);

      oldState = state;

      return { items: updatedItems, quantity: state.quantity - 1 };

    case 'GET':
      return action.wishlist;

    case 'Error':
      return oldState;
  }
};

const WishlistProvider = props => {
  const [state, dispatch] = useReducer(wishlistReducer, defaultState);

  const addToWishlist = async prodId => {
    dispatch({ type: 'ADD', prodId });
  };
  const removeFromWishlist = prodId => {
    dispatch({ type: 'REMOVE', prodId });
  };

  const getUpdatedWishlist = wishlist => {
    dispatch({ type: 'GET', wishlist });
  };

  const errorToUpdateWishlist = () => {
    dispatch({ type: 'ERROR' });
  };

  const defaultValues = {
    wishlist: state,
    addToWishlist,
    removeFromWishlist,
    getUpdatedWishlist,
    errorToUpdateWishlist,
  };
  return (
    <WishlistContext.Provider value={defaultValues}>
      {props.children}
    </WishlistContext.Provider>
  );
};

export { WishlistProvider, WishlistContext };
