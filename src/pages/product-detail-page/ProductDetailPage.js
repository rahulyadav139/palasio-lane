import './ProductDetailPage.css';
import {
  SingleProductCard,
  ProductDescription,
  Header,
} from '../../components';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks';

const ProductDetailPage = props => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { getData } = useFetch();
  const prodId = params.prodId;

  useEffect(() => {
    (async () => {
      const { data, error } = await getData(
        `${process.env.REACT_APP_BACKEND_URL}/product/${prodId}`,
        false
      );

      if (error) return;

      setProduct(data);
    })();
  }, [prodId, getData]);
  return (
    <Fragment>
      <Header />
      {product && (
        <main className="main">
          <SingleProductCard product={product} />
          <ProductDescription product={product} />
        </main>
      )}
    </Fragment>
  );
};
export { ProductDetailPage };
