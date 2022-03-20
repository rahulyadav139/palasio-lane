import React, { useState } from 'react';

import { useFetch } from '../hooks';

const WishlistContext = React.createContext();

let updatedItems, updatedWishlist, isExist;

const WishlistProvider = props => {
  const [wishlist, setWishlist] = useState({
    items: [],
    totalQuantity: 0,
  });

  const { sendData } = useFetch();

  const addToWishlist = async product => {
    const prodId = product._id;

    isExist = wishlist.items.includes(prodId);

    if (isExist) return wishlist;
    updatedItems = [...wishlist.items, product];
    updatedWishlist = {
      items: updatedItems,
      totalQuantity: wishlist.totalQuantity + 1,
    };

    const { error } = await sendData(
      'https://palasio-lane.herokuapp.com/admin/wishlist',
      'PUT',
      updatedWishlist,
      true
    );

    if (!error) setWishlist(updatedWishlist);
  };
  const removeFromWishlist = async prodId => {
    updatedItems = wishlist.items.filter(el => el._id !== prodId);

    updatedWishlist = {
      items: updatedItems,
      totalQuantity: wishlist.totalQuantity - 1,
    };

    const { error } = await sendData(
      'https://palasio-lane.herokuapp.com/admin/wishlist',
      'PUT',
      updatedWishlist,
      true
    );

    if (!error) setWishlist(updatedWishlist);
  };

  const getUpdatedWishlist = wishlist => {
    setWishlist(wishlist);
  };

  const defaultValues = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    getUpdatedWishlist,
  };
  return (
    <WishlistContext.Provider value={defaultValues}>
      {props.children}
    </WishlistContext.Provider>
  );
};

export { WishlistProvider, WishlistContext };
