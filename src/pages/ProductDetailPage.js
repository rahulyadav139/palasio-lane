import './ProductDetailPage.css';
import {
  Header,
  Footer,
  SingleProductCard,
  ProductDescription,
} from '../components';
import { Fragment } from 'react';

const ProductDetailPage = props => {
  return (
    <Fragment>
      <Header />
      <main class="main">
        <SingleProductCard />
        <ProductDescription />
      </main>
      <Footer />
    </Fragment>
  );
};
export default ProductDetailPage;
