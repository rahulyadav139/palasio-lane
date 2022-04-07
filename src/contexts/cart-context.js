import React, { useState } from 'react';
import { useFetch } from '../hooks';

const CartContext = React.createContext();

let prodIndex, updatedCart;
let addToCartIsReady = true;
let removeFromCartIsReady = true;
let removeSingleProductIsReady = true;

const CartProvider = props => {
  const [cart, setCart] = useState([]);

  console.log(cart);

  const { sendData } = useFetch();

  const addToCartHandler = async product => {
    const { _id: prodId } = product;

    console.log('test');

    console.log(addToCartIsReady);

    if (addToCartIsReady) {
      addToCartIsReady = false;

      prodIndex = cart.findIndex(el => el.product._id === prodId);

      if (prodIndex >= 0) {
        if (cart[prodIndex].product.inStock <= cart[prodIndex].quantity) {
          addToCartIsReady = true;
          return console.log('all instock products are added to the cart');
        }
        updatedCart = cart.slice();

        updatedCart[prodIndex].quantity += 1;
      } else {
        updatedCart = [...cart, { product, quantity: 1 }];
      }

      const { error } = await sendData(
        'https://palasio-lane.herokuapp.com/admin/cart',
        'PUT',
        updatedCart,
        true
      );

      if (!error) {
        setCart(updatedCart);
      }

      addToCartIsReady = true;
    }
  };
  const removeFromCartHandler = async prodId => {
    if (removeFromCartIsReady) {
      removeFromCartIsReady = false;
      prodIndex = cart.findIndex(el => el.product._id === prodId);

      if (prodIndex < 0) return;

      if (cart[prodIndex].quantity === 1) {
        updatedCart = cart.filter(el => el.product._id !== prodId);
      } else {
        updatedCart = cart.slice();

        updatedCart[prodIndex].quantity -= 1;
      }

      const { error } = await sendData(
        'https://palasio-lane.herokuapp.com/admin/cart',
        'PUT',
        updatedCart,
        true
      );

      if (!error) {
        setCart(updatedCart);
      }
      removeFromCartIsReady = true;
    }
  };

  const removeSingleProductHandler = async prodId => {
    if (removeSingleProductIsReady) {
      removeSingleProductIsReady = false;

      updatedCart = cart.filter(el => el.product._id !== prodId);

      const { error } = await sendData(
        'https://palasio-lane.herokuapp.com/admin/cart',
        'PUT',
        updatedCart,
        true
      );

      if (!error) {
        setCart(updatedCart);
      }
      removeSingleProductIsReady = true;
    }
  };

  const getUpdatedCart = updatedCart => {
    setCart(updatedCart);
  };

  const defaultValue = {
    cart,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    getUpdatedCart,
    removeSingleProduct: removeSingleProductHandler,
  };

  return (
    <CartContext.Provider value={defaultValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
