import './ProductListingPage.css';
import { Fragment, useEffect, useState } from 'react';
import { FilterTable, Header, Listing } from '../../components';
import { useParams } from 'react-router-dom';
import { getFilteredProducts } from '../../utils';
import { useFetch } from '../../hooks';

const ProductListingPage = props => {
  const [showFilters, setShowFilters] = useState(false);
  const [price, setPrice] = useState('');
  const [carModels, setCarModels] = useState([]);
  const [star, setStar] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
  console.log(sortBy);
  const [outOfStock, setOutOfStock] = useState(false);
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
        `${process.env.REACT_APP_BACKEND_URL}/products?filterBy=${filterBy}`,
        false
      );

      if (error) return;

      setProducts(data);

      setLoading(false);
    })();
  }, [category, collection, getData]);

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

  const showFiltersHandler = () => {
    setShowFilters(prev => !prev);
  };

  const getOutOfStockHandler = boolean => {
    setOutOfStock(boolean);
  };
  return (
    <Fragment>
      <Header />
      {!loading && (
        <main className="main-section">
          <FilterTable
            onGetPrice={getPriceHandler}
            onGetStar={getStarHandler}
            onGetCarModels={getCarModelsHandler}
            onGetOutOfStock={getOutOfStockHandler}
            products={getFilteredProducts(products)(outOfStock)()()()()}
            price={price}
            star={star}
            carModels={carModels}
            onFilters={showFiltersHandler}
            filterStatus={showFilters}
          />

          <Listing
            products={getFilteredProducts(products)(outOfStock)(price)(
              carModels
            )(star)(sortBy)}
            onGetSortBy={getSortByHandler}
            sort={sortBy}
            onFilters={showFiltersHandler}
            filterStatus={showFilters}
          />
        </main>
      )}
    </Fragment>
  );
};
export { ProductListingPage };
