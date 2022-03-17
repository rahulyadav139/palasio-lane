import './ProductListingPage.css';
import { Fragment, useEffect } from 'react';
import { Footer, Header, Filters, Listing } from '../components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ProductListingPage = props => {
  const [price, setPrice] = useState('');
  const [carModels, setCarModels] = useState([]);
  const [star, setStar] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
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

        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category, collection]);

  const getFilteredProducts = products => {
    return price => {
      const firstFiltered = !price
        ? products
        : products.filter(
            product => price >= product.price * ((100 - product.discount) / 100)
          );
      return models => {
        const secondFiltered = !models.length
          ? firstFiltered
          : firstFiltered.filter(product => models.includes(product.car.model));
        return rating => {
          const thirdFiltered = !rating
            ? secondFiltered
            : secondFiltered.filter(product => rating >= product.rating);
          return sortBy => {
            switch (sortBy) {
              case 'low-to-high':
                console.log(sortBy);
                return thirdFiltered
                  .slice()
                  .sort(
                    (a, b) =>
                      a.price * ((100 - a.discount) / 100) -
                      b.price * ((100 - b.discount) / 100)
                  );
              case 'high-to-low':
                return thirdFiltered
                  .slice()
                  .sort(
                    (a, b) =>
                      b.price * ((100 - a.discount) / 100) -
                      a.price * ((100 - a.discount) / 100)
                  );
              default:
                return thirdFiltered;
            }
          };
        };
      };
    };
  };

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
export default ProductListingPage;
