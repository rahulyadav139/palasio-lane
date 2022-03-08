import { Fragment } from 'react';
import './Categories.css';
import collectionData from '../assets/collection-data.json';

const Categories = props => {
  return (
    <div class="categories-container">
      {collectionData.map(el => (
        <div key={el.id} class="categories-tab">
          {el.categories.map(el => (
            <div key={el.id} class="image-card shadow">
              <img class="image" src={el.imageRef} alt="" />
              <p class="text-small">{el.categoryName}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Categories;
