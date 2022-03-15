import './PriceBreakoutCard.css';

const PriceBreakoutCard = props => {
  return (
    <div class="price-breakout card shadow flex col">
      <div class="heading-5">PRICE DETAILS</div>
      <div class="hr-line solid grey"></div>
      <div class="flex space-between">
        <p class="text-small">Price (2 items)</p>
        <p class="text-small">Rs 4999</p>
      </div>
      <div class="flex space-between">
        <p class="text-small">Discount</p>
        <p class="text-small">- Rs 4999</p>
      </div>
      <div class="flex space-between">
        <p class="text-small">Delivery Charges</p>
        <p class="text-small">Rs 4999</p>
      </div>
      <div class="hr-line solid grey"></div>
      <div class="flex space-between align-center">
        <p class="text-bold">TOTAL AMOUNT</p>
        <p class="text-bold">Rs 4999</p>
      </div>
      <div class="hr-line solid grey"></div>
      <p>You will save Rs 1999 on this order</p>
      <button class="btn primary">Place Order</button>
    </div>
  );
};
export { PriceBreakoutCard };
