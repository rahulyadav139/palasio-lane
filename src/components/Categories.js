import { Fragment } from 'react';
import './Categories.css';

const categoriesData = [
  {
    category: 'interior',
    id: 'cat-01',
    subCategory: [
      {
        name: 'Car Armrest',
        id: 'cat-01-01',
        image: require('../assets/categories/interior/car-armrest-4-400x400.webp'),
      },
      {
        name: 'Car Armrest',
        id: 'cat-01-01',
        image: require('../assets/categories/interior/car-armrest-4-400x400.webp'),
      },
      {
        name: 'Car Armrest',
        id: 'cat-01-01',
        image: require('../assets/categories/interior/car-armrest-4-400x400.webp'),
      },
      {
        name: 'Car Armrest',
        id: 'cat-01-01',
        image: require('../assets/categories/interior/car-armrest-4-400x400.webp'),
      },
    ],
  },
];

const Categories = props => {
  return (
    <div class="categories-container">
      {categoriesData.map(el => (
        <div key={el.id} class="categories-tab">
          {el.subCategory.map(el => (
            <div key={el.id} class="image-card shadow">
              <img class="image" src={el.image} alt="" />
              <p class="text-small">{el.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Categories;
