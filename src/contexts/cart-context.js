import React, { useState } from 'react';
import { useFetch, useToast } from '../hooks';

const CartContext = React.createContext();

let prodIndex, updatedCart;
let addToCartIsReady = true;
let removeFromCartIsReady = true;
let removeSingleProductIsReady = true;

const CartProvider = props => {
  const { setToast } = useToast();

  const [cart, setCart] = useState([]);

  const { sendData } = useFetch();

  const addToCartHandler = async prodId => {
    // const { _id: prodId } = product;

    // console.log(prodId);

    // prodIndex = cart.findIndex(el => el.product === prodId);

    // if (prodIndex >= 0) {
    //   if (cart[prodIndex].product.inStock <= cart[prodIndex].quantity) {
    //     addToCartIsReady = true;
    //     return setToast({
    //       status: true,
    //       message: 'All instock products are added to the cart!',
    //       type: 'loading',
    //     });
    //   }
    //   updatedCart = cart.slice();

    //   updatedCart[prodIndex].quantity += 1;
    // } else {
    //   updatedCart = [...cart, { product, quantity: 1 }];
    // }

    const { error, status } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/cart/add-to-cart`,
      'POST',
      { prodId },
      true
    );

    if (status === 400) {
      return setToast({
        status: true,
        message: 'All in-stock products are added to the cart!',
        type: 'loading',
      });
    }

    if (!error) {
      prodIndex = cart.findIndex(el => el.product === prodId);

      if (prodIndex >= 0) {
        updatedCart = [...cart];

        updatedCart[prodIndex].quantity += 1;
      } else {
        updatedCart = [...cart, { product: prodId, quantity: 1 }];
      }

      setCart(updatedCart);
    }
  };
  const decreaseCartItemQuantityHandler = async prodId => {
    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/cart/decrease-quantity`,
      'POST',
      { prodId },
      true
    );

    if (!error) {
      prodIndex = cart.findIndex(el => el.product === prodId);
      if (prodIndex < 0) return;
      if (cart[prodIndex].quantity === 1) {
        updatedCart = cart.filter(el => el.product !== prodId);
      } else {
        updatedCart = [...cart];
        updatedCart[prodIndex].quantity -= 1;
      }
      setCart(updatedCart);
    }

    //   prodIndex = cart.findIndex(el => el.product._id === prodId);

    //   if (prodIndex < 0) return;

    //   if (cart[prodIndex].quantity === 1) {
    //     updatedCart = cart.filter(el => el.product._id !== prodId);
    //   } else {
    //     updatedCart = cart.slice();

    //     updatedCart[prodIndex].quantity -= 1;
    //   }

    //   const { error } = await sendData(
    //     `${process.env.REACT_APP_BACKEND_URL}/admin/cart`,
    //     'PUT',
    //     updatedCart,
    //     true
    //   );

    //   if (!error) {
    //     setCart(updatedCart);
    //   }
    //   removeFromCartIsReady = true;
    // }
  };

  const removeProductHandler = async prodId => {
    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/cart/remove-product`,
      'POST',
      { prodId },
      true
    );

    if (!error) {
      updatedCart = cart.filter(el => el.product !== prodId);
      setCart(updatedCart);
    }
  };

  const getUpdatedCart = updatedCart => {
    setCart(updatedCart);
  };

  const defaultValue = {
    cart,
    addToCart: addToCartHandler,
    decreaseCartItemQuantity: decreaseCartItemQuantityHandler,
    getUpdatedCart,
    removeProduct: removeProductHandler,
  };

  return (
    <CartContext.Provider value={defaultValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
