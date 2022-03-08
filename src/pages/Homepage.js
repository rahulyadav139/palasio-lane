import './Homepage.css';
import { Fragment } from 'react';
import Header from '../components/Header';
import Carousel from '../components/ui/Carousel';
import Categories from '../components/Categories';
import Testimonies from '../components/Testimony';
import Footer from '../components/Footer';

import ScrollTopButton from '../components/ScrollTopButton';
const Homepage = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-homepage">
        <Carousel />
        <Categories />
        <Testimonies />
      </main>
      <Footer />
      <ScrollTopButton />
    </Fragment>
  );
};
export default Homepage;
