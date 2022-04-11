import './OrderProductCard.css';
import { priceFormatter } from '../../utils';

const OrderProductCard = ({ productData }) => {
  const {
    product: { imageUrl, title, brand },
    priceAtPurchased,
    discountAtPurchased,
    quantity,
  } = productData;

  const priceAfterDiscount = priceAtPurchased * (1 - discountAtPurchased / 100);

  const totalPrice = priceAfterDiscount * quantity;

  return (
    <>
      <div className="order-card__product">
        <div className="order-card__product-image">
          <img className="img-responsive" src={imageUrl} alt={title} />
        </div>
        <div className="order-card__product-details">
          <h3>{title}</h3>
          <h4 className="text-grey">{brand}</h4>
          <p>{`Quantity: ${quantity}`}</p>
          <p>{`Price: ${priceFormatter(priceAfterDiscount)}`}</p>

          {/* <p>{`${quantity} x ${priceFormatter(
            priceAfterDiscount
          )} = ${priceFormatter(totalPrice)}`}</p> */}
        </div>
      </div>
      <div className="hr-line thin fad"></div>
    </>
  );
};
export { OrderProductCard };
