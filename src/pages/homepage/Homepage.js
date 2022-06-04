import './Homepage.css';
import {
  Carousel,
  Categories,
  Testimonies,
  Banner,
  Header,
} from '../../components';

const Homepage = props => {
  return (
    <>
      <Header />
      <main className="main-homepage">
        <Carousel />
        <Categories />
        <Banner />
        <Testimonies />
      </main>
    </>
  );
};
export { Homepage };
