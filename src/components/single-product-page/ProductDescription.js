import { Fragment } from 'react';
import './ProductDescription.css';

const ProductDescription = props => {
  const { description, warranty, shipping } = props.product;
  return (
    <Fragment>
      <h3>Product Highlights</h3>
      <ul>
        {description.map(el => (
          <li>{el}</li>
        ))}
        {/* <li>
          Clever design – Made of Heavy-duty rubber elastic and the high-quality
          spandex mesh. It is a double mesh layer car sunshade which protects
          passengers from glare and sunburn.
        </li>
        <li>
          Windows can be raised and lowered when sunshades are in use without
          any interruption.
        </li>
        <li>
          UV Sun protection - Protect your loved ones from UV rays, heat, bugs
          and dust, all year around with noticeable heat reduction in cabin.
        </li>
        <li>
          Covers all window surface - No sunlight leaks, unlike other car
          shades. It is a total sun blocker with a double layer mesh, though
          person seating on back seat can see through the window shade from the
          inside out.
        </li>
        <li>
          Quick and Easy Installation - Open the Car rear window, stretch the
          car Sun shades and roll over the window.
        </li>
        <li>
          Only for Rear Window – We only provide 2 units in one set of sunshades
          which fits only for the rear windows and are not compactable for
          driver and passenger seat windows.
        </li> */}
      </ul>
      <h3>Warranty Details</h3>
      <p>{warranty}</p>
      <h3>Shipping Details</h3>
      <p>{shipping}</p>
    </Fragment>
  );
};
export { ProductDescription };
