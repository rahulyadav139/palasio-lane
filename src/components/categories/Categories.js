import { Fragment } from 'react';
import './Categories.css';
import collectionData from '../../data/collection-data.json';
import { Link } from 'react-router-dom';

const Categories = props => {
  return (
    <div className="categories-container">
      {collectionData.map(collection => (
        <Fragment key={collection.id}>
          <div className=" collection-title">
            <div className="text-center collection-name ">
              {collection.collection}
            </div>

            <Link to={`/products/${collection.param}`}>
              <button className="btn primary">View All</button>
            </Link>
          </div>

          <div className="categories-tab">
            {collection.categories.map(category => (
              <Link to={`/products/${collection.param}/${category.param}`}>
                <div key={category.id} className="image-card shadow">
                  <img className="image" src={category.imageRef} alt="" />
                  <p className="">{category.categoryName}</p>
                </div>
              </Link>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
export { Categories };
