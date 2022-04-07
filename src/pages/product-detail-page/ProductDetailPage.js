import './ProductDetailPage.css';
import {
  Header,
  Footer,
  SingleProductCard,
  ProductDescription,
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
        `https://palasio-lane.herokuapp.com/product/${prodId}`,
        false
      );

      if (error) return;
      setProduct(data);
    })();
  }, [prodId, getData]);
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
export { ProductDetailPage };
