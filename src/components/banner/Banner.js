import './Banner.css';
import bannerData from '../../data/banner-data.json';
import { v4 as uuid } from 'uuid';

const Banner = props => {
  return (
    <div className="banner-container">
      {bannerData.map(el => (
        <div key={uuid()} className="banner">
          <img className="img-responsive" src={el.image} alt="banner-1" />
        </div>
      ))}
    </div>
  );
};
export { Banner };
