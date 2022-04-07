import { Fragment } from 'react';
import './ProductDescription.css';
import { v4 as uuid } from 'uuid';

const ProductDescription = props => {
  const { description, warranty, shipping } = props.product;
  return (
    <Fragment>
      <h3>Product Highlights</h3>
      <ul className="description-items">
        {description.map(el => (
          <li key={uuid()}>{el}</li>
        ))}
      </ul>
      <h3 className="product-detail-title">Warranty Details</h3>
      <p>{warranty}</p>
      <h3 className="product-detail-title">Shipping Details</h3>
      <p>{shipping}</p>
    </Fragment>
  );
};
export { ProductDescription };
