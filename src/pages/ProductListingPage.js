import './ProductListingPage.css';
import { Fragment } from 'react';
import { Footer, Header, Filters, Listing } from '../components';
import products from '../data/inventory.json';

const ProductListingPage = props => {
  return (
    <Fragment>
      <Header />
      <main class="main-section">
        <Filters products={products} />
        <Listing products={products} />
      </main>
      <Footer />
    </Fragment>
  );
};
export default ProductListingPage;
