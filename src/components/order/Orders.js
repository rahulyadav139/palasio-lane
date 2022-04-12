import './Orders.css';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks';
import { OrderProductCard } from './OrderProductCard';
import { OrderDetailsModal } from './OrderDetailsModal';
import { dateFormatter, priceFormatter } from '../../utils';

const Orders = props => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const { getData } = useFetch();

  useEffect(() => {
    (async () => {
      const { data } = await getData(
        `${process.env.REACT_APP_BACKEND_URL}/admin/order`,
        true
      );

      setOrders(data.reverse());
    })();
  }, []);

  return (
    <>
      {orders.length !== 0
        ? orders.map(order => (
            <div className="order-card shadow">
              <div className="order-card__header">
                <div>
                  <p className="text-bold">ORDER PLACED</p>
                  <p>{dateFormatter(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-bold">TOTAL</p>
                  <p>{priceFormatter(order.priceBreakout.orderValue)}</p>
                </div>

                <div>
                  <p className="text-bold">{`ORDER # ${order.razorPayOrderId}`}</p>
                  <p
                    onClick={() =>
                      setOrderDetails({
                        deliveryAddress: order.deliveryAddress,
                        priceBreakout: order.priceBreakout,
                      })
                    }
                    className="text-primary"
                  >
                    View Order Details
                  </p>
                </div>
              </div>
              <div className="hr-line solid thin grey "></div>
              <div className="ordered-products-container">
                {order.productDetails.map(productData => (
                  <OrderProductCard
                    key={productData._id}
                    productData={productData}
                  />
                ))}
              </div>
            </div>
          ))
        : ''}

      {orderDetails && (
        <OrderDetailsModal
          onReset={() => setOrderDetails(null)}
          deliveryAddress={orderDetails.deliveryAddress}
          priceBreakout={orderDetails.priceBreakout}
        />
      )}
    </>
  );
};
export { Orders };
