import './ProductListingPage.css';
import { Fragment, useEffect } from 'react';
import { Footer, Header, Filters, Listing } from '../components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ProductListingPage = props => {
  const [price, setPrice] = useState('');
  const [carModels, setCarModels] = useState([]);
  const [star, setStar] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // console.log(star);
  // console.log(carModels);
  // console.log(price);

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
      let firstFiltered;
      if (!price) {
        firstFiltered = products;
      } else {
        firstFiltered = products.filter(
          product => price >= (product.price * (100 - product.discount)) / 100
        );
      }
      return model => {
        let secondFiltered;
        if (!model) {
          secondFiltered = firstFiltered;
        } else {
          secondFiltered = firstFiltered.filter(
            product => product.car.model === model
          );
        }
        return rating => {
          let thirdFiltered;
          if (!rating) {
            thirdFiltered = secondFiltered;
          } else {
            thirdFiltered = secondFiltered.filter(
              product => rating >= product.rating
            );
          }
          return thirdFiltered;
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
            <Listing products={products} />
          </main>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductListingPage;
