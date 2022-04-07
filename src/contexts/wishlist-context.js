import React, { useState } from 'react';

import { useFetch, useToast } from '../hooks';

const WishlistContext = React.createContext();

let updatedWishlist, isExist;
let addToWishlistIsReady = true;
let removeFromWishlistIsReady = true;

const WishlistProvider = props => {
  const { setToast } = useToast();
  const [wishlist, setWishlist] = useState([]);

  const { sendData } = useFetch();

  const addToWishlist = async prodId => {
    // const prodId = product._id;

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

    // if(!error) {

    //   setWishlist(prev=> prev.concat(prodId))

    //   // updatedWishlist = [...wishlist, product];

    // }

    // if (addToWishlistIsReady) {
    //   addToWishlistIsReady = false;

    //   updatedWishlist = [...wishlist, product];

    //   const { error } = await sendData(
    //     `${process.env.REACT_APP_BACKEND_URL}/admin/wishlist`,
    //     'PUT',
    //     updatedWishlist,
    //     true
    //   );

    //   if (!error) setWishlist(updatedWishlist);
    //   addToWishlistIsReady = true;
    // }
  };
  const removeFromWishlist = async prodId => {
    // updatedWishlist = wishlist.filter(el => el._id !== prodId);

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

    // if (!error) setWishlist(updatedWishlist);
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
