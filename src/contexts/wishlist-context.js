import React, { useState } from 'react';

import { useFetch } from '../hooks';

const WishlistContext = React.createContext();

let updatedWishlist, isExist;
let addToWishlistIsReady = true;
let removeFromWishlistIsReady = true;

const WishlistProvider = props => {
  const [wishlist, setWishlist] = useState([]);

  const { sendData } = useFetch();

  const addToWishlist = async product => {
    const prodId = product._id;

    isExist = wishlist.includes(prodId);

    if (isExist) return wishlist;

    if (addToWishlistIsReady) {
      addToWishlistIsReady = false;

      updatedWishlist = [...wishlist, product];

      const { error } = await sendData(
        'https://palasio-lane.herokuapp.com/admin/wishlist',
        'PUT',
        updatedWishlist,
        true
      );

      if (!error) setWishlist(updatedWishlist);
      addToWishlistIsReady = true;
    }
  };
  const removeFromWishlist = async prodId => {
    if (removeFromWishlistIsReady) {
      removeFromWishlistIsReady = false;

      updatedWishlist = wishlist.filter(el => el._id !== prodId);

      const { error } = await sendData(
        'https://palasio-lane.herokuapp.com/admin/wishlist',
        'PUT',
        updatedWishlist,
        true
      );

      if (!error) setWishlist(updatedWishlist);
      removeFromWishlistIsReady = true;
    }
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
