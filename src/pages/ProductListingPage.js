import './ProductListingPage.css';
import { Fragment, useEffect } from 'react';
import { Footer, Header, Filters, Listing } from '../components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ProductListingPage = props => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const category = params.category;
  const collection = params.collection;

  useEffect(() => {
    let filterBy;

    if (category) {
      filterBy = category;
    } else {
      filterBy = collection;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8080/products?filterBy=${filterBy}`
        );
        const data = await res.json();
        // console.log(data[0]);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category, collection]);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <Header />
          <main class="main-section">
            <Filters products={products} />
            <Listing products={products} />
          </main>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductListingPage;
