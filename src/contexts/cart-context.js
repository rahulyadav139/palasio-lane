import React, { useState } from 'react';
import { useFetch } from '../hooks';

const CartContext = React.createContext();

let updatedCartItems, updatedTotalQuantity, prodIndex, updatedCart;

const CartProvider = props => {
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
  });

  const { sendData } = useFetch();

  const addToCartHandler = async product => {
    const { _id: prodId } = product;
    prodIndex = cart.items.findIndex(el => el.product._id === prodId);

    if (prodIndex >= 0) {
      if (cart.items[prodIndex].inStock > product.quantity) return;

      updatedCartItems = cart.items.slice();

      updatedCartItems[prodIndex].quantity += 1;

      updatedTotalQuantity = cart.totalQuantity + 1;
    } else {
      updatedCartItems = [...cart.items, { product: product, quantity: 1 }];

      updatedTotalQuantity = cart.totalQuantity + 1;
    }

    updatedCart = {
      items: updatedCartItems,
      totalQuantity: updatedTotalQuantity,
    };

    const { error } = await sendData(
      'https://palasio-lane.herokuapp.com/admin/cart',
      'PUT',
      updatedCart,
      true
    );

    if (!error) {
      setCart(updatedCart);
    }
  };
  const removeFromCartHandler = async prodId => {
    prodIndex = cart.items.findIndex(el => el.product._id === prodId);

    if (prodIndex < 0) return;

    if (cart.items[prodIndex].quantity === 1) {
      updatedCartItems = cart.items.filter(el => el.product._id !== prodId);
      updatedTotalQuantity = cart.totalQuantity -= 1;
    } else {
      updatedCartItems = cart.items.slice();

      updatedCartItems[prodIndex].quantity -= 1;

      updatedTotalQuantity = cart.totalQuantity - 1;
    }

    updatedCart = {
      items: updatedCartItems,
      totalQuantity: updatedTotalQuantity,
    };

    const { error } = await sendData(
      'https://palasio-lane.herokuapp.com/admin/cart',
      'PUT',
      updatedCart,
      true
    );

    if (!error) {
      setCart(updatedCart);
    }
  };

  const removeSingleProductHandler = async prodId => {
    prodIndex = cart.items.findIndex(el => el.product._id === prodId);

    updatedCartItems = cart.items.filter(el => el.product._id !== prodId);
    updatedTotalQuantity = cart.totalQuantity -= cart.items[prodIndex].quantity;

    updatedCart = {
      items: updatedCartItems,
      totalQuantity: updatedTotalQuantity,
    };

    const { error } = await sendData(
      'https://palasio-lane.herokuapp.com/admin/cart',
      'PUT',
      updatedCart,
      true
    );

    if (!error) {
      setCart(updatedCart);
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
