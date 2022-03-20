import './ProductListingPage.css';
import { Fragment, useEffect, useState } from 'react';
import { Footer, Header, Filters, Listing } from '../../components';
import { useParams } from 'react-router-dom';
import { getFilteredProducts } from '../../utils';
import { useFetch } from '../../hooks';

const ProductListingPage = props => {
  const [price, setPrice] = useState('');
  const [carModels, setCarModels] = useState([]);
  const [star, setStar] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getData } = useFetch();

  const params = useParams();
  const category = params.category;
  const collection = params.collection;

  useEffect(() => {
    const filterBy = category ? category : collection;

    (async () => {
      setLoading(true);

      const { data, error } = await getData(
        `http://localhost:8080/products?filterBy=${filterBy}`,
        false
      );

      if (error) return;

      setProducts(data);

      setLoading(false);
    })();
  }, [category, collection]);

  const getPriceHandler = price => {
    setPrice(price);
  };

  const getStarHandler = star => {
    setStar(star);
  };

  const getCarModelsHandler = models => {
    setCarModels(models);
  };

  const getSortByHandler = sort => {
    setSortBy(sort);
  };

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <Header />
          <main className="main-section">
            <Filters
              onGetPrice={getPriceHandler}
              onGetStar={getStarHandler}
              onGetCarModels={getCarModelsHandler}
              products={products}
              price={price}
              star={star}
              carModels={carModels}
            />
            <Listing
              products={getFilteredProducts(products)(price)(carModels)(star)(
                sortBy
              )}
              onGetSortBy={getSortByHandler}
              sort={sortBy}
            />
          </main>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
export { ProductListingPage };
