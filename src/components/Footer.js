import './Footer.css';

const Footer = props => {
  return (
    <footer class="footer">
      <div class="footer-col">
        <h3>Policy Info</h3>
        <p>Privacy policy</p>
        <p>Terms of Sale</p>
        <p>Cancellation Policy</p>
        <p>Return Policy</p>
        <p>Shipping Policy</p>
      </div>
      <div class="footer-col">
        <h3>Company</h3>
        <p>About Us</p>
        <p>In the News</p>
        <p>Career</p>
        <p>Blog</p>
        <p>Contact us</p>
      </div>
      <div class="footer-col">
        <h3>Business</h3>
        <p>Affiliate Partners</p>
        <p>EMI</p>
        <p>Bulk Order</p>
        <p>Become a Distributor</p>
      </div>
      <div class="footer-col">
        <h3>Help</h3>
        <p>Claim Warranty</p>
        <p>Payment Options</p>
        <p>Sitemap</p>
      </div>
      <div class="flex col gap footer-col">
        <h3>Newsletter & Subscription</h3>
        <p>
          Subscription to our newsletter and get information about our latest
          offers and prices.
        </p>

        <div class="flex">
          <div class="input-field-icon">
            <label>
              <span class="icon small">
                <i class="fas fa-envelope"></i>
              </span>
              <input placeholder="E-mail" type="text" />
            </label>
          </div>
          <button class="btn primary">
            <i class="bi bi-arrow-right-short"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
