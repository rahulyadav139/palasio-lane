import './Homepage.css';
import { Carousel, Categories, Testimonies, Banner } from '../../components';

const Homepage = props => {
  return (
    <main className="main-homepage">
      <Carousel />
      <Categories />
      <Banner />
      <Testimonies />
    </main>
  );
};
export { Homepage };
