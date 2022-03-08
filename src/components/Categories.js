import { Fragment } from 'react';
import './Categories.css';
import collectionData from '../assets/collection-data.json';

const Categories = props => {
  return (
    <div className="categories-container">
      {collectionData.map(el => (
        <Fragment>
          <div className=" collection-title">
            <div className="text-center collection-name ">{el.collection}</div>
            <button className="btn primary">View All</button>
          </div>

          <div key={el.id} className="categories-tab">
            {el.categories.map(el => (
              <div key={el.id} className="image-card shadow">
                <img className="image" src={el.imageRef} alt="" />
                <p className="">{el.categoryName}</p>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
export default Categories;
