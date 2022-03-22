import './Banner.css';
import bannerData from '../../data/banner-data.json';

const Banner = props => {
  return (
    <div className="banner-container">
      {bannerData.map(el => (
        <div className="banner">
          <img className="img-responsive" src={el.image} alt="banner-1" />
        </div>
      ))}
    </div>
  );
};
export { Banner };
