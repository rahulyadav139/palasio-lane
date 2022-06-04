import React, { useState } from 'react';

import { useFetch, useToast } from '../hooks';

const WishlistContext = React.createContext();

let isExist;

const WishlistProvider = props => {
  const { setToast } = useToast();
  const [wishlist, setWishlist] = useState([]);

  const { sendData } = useFetch();

  const addToWishlist = async prodId => {
    isExist = wishlist.includes(prodId);

    if (isExist) return wishlist;

    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/wishlist/add-new-product`,
      'POST',
      { prodId },
      true
    );

    error
      ? setToast({
          type: 'danger',
          status: true,
          message: 'Something went wrong!',
        })
      : setWishlist(prev => prev.concat(prodId));
  };
  const removeFromWishlist = async prodId => {
    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/wishlist/remove-product`,
      'POST',
      { prodId },
      true
    );

    error
      ? setToast({
          type: 'danger',
          status: true,
          message: 'Something went wrong!',
        })
      : setWishlist(prev => prev.filter(id => id !== prodId));
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
