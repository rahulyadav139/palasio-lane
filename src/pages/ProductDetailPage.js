import './ProductDetailPage.css';
import {
  Header,
  Footer,
  SingleProductCard,
  ProductDescription,
} from '../components';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = props => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  const prodId = params.prodId;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/product/${prodId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [prodId]);
  return (
    <Fragment>
      {product && (
        <Fragment>
          <Header />
          <main className="main">
            <SingleProductCard product={product} />
            <ProductDescription product={product} />
          </main>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetailPage;
