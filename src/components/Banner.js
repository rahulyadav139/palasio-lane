import './Banner.css'
import bannerData from '../assets/banner-data.json'

const Banner = props => {
return (
  <div class="banner-container">
    {bannerData.map(el => (
      <div class="banner">
        <img
          class="img-responsive"
          src={el.image}
          alt="banner-1"
        />
      </div>
    ))}
  </div>
);
}
 export default Banner;