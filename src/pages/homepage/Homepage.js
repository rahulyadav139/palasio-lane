import './Homepage.css';
import { Fragment } from 'react';
import {
  Header,
  Carousel,
  Categories,
  Testimonies,
  Footer,
  Banner,
  ScrollTopButton,
} from '../../components';

const Homepage = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-homepage">
        <Carousel />
        <Categories />
        <Banner />
        <Testimonies />
      </main>
      <Footer />
      <ScrollTopButton />
    </Fragment>
  );
};
export { Homepage };
