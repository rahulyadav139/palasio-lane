import './SearchInput.css';
import { useState } from 'react';
import { textFormatter } from '../../utils';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

let searchTimer;
const SearchInput = props => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const searchDebounceHandler = (text, delay) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      (async () => {
        try {
          const res = await fetch(
            process.env.REACT_APP_BACKEND_URL +
              '/search-products?searchKeyword=' +
              text
          );

          const data = await res.json();

          setSearchResult(data);
        } catch (err) {
          console.log(err);
        }
      })();
    }, delay);
  };

  const getSearchInputHandler = e => {
    searchDebounceHandler(e.target.value, 1000);
    setSearchInput(e.target.value);
  };

  return (
    <div className="input-field-icon">
      <label>
        <span className="icon small">
          <i className="bi bi-search"></i>
        </span>
        <input
          value={searchInput}
          onChange={getSearchInputHandler}
          placeholder="Search"
          type="search"
        />
      </label>

      {searchInput && searchResult && (
        <div className="search-result">
          {searchResult.product && (
            <>
              <h4>Product</h4>
              <Link to={`/product/${searchResult.product?._id}`}>
                <div className="search-result__product">
                  <div className="product-image">
                    <img
                      className="img-responsive"
                      src={searchResult.product?.imageUrl}
                      alt="searched-product-image"
                    />
                  </div>
                  <div className="product-details">
                    <p>{searchResult?.product?.title}</p>
                    <p className="text-grey">{searchResult?.product?.brand}</p>
                  </div>
                </div>
              </Link>
            </>
          )}
          {searchResult?.collections?.length !== 0 && <h4>Collection</h4>}
          {searchResult?.collections?.slice(0, 2).map(collection => (
            <Link key={uuid()} to={`/products/${collection}`}>
              <p>{textFormatter(collection)}</p>
            </Link>
          ))}
          {searchResult?.categories?.length !== 0 && <h4>Category</h4>}
          {searchResult?.categories?.slice(0, 2).map(category => (
            <Link key={uuid()} to={`/products/${category.path}`}>
              <p key={uuid()}>{textFormatter(category.category)}</p>
            </Link>
          ))}

          {!searchResult.product &&
            searchResult?.collections?.length === 0 &&
            searchResult?.categories?.length === 0 && (
              <p className="text-center text-bold">No Results Found!</p>
            )}
        </div>
      )}
    </div>
  );
};
export default SearchInput;
