import { Fragment } from 'react';
import './Categories.css';

const categoriesData = [
  {
    category: 'interior',
    id: 'cat-01',
    subCategory: [
      {
        name: '',
        id: 'cat-01-01',
        image: require(''),
      },
    ],
  },
];

const Categories = props => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
export default Categories;
