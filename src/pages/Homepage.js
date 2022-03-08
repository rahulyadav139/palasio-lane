import './Homepage.css';
import { Fragment } from 'react';
import Header from '../components/Header';
import Carousel from '../components/ui/Carousel';
import Categories from '../components/Categories';
import Testimonies from '../components/Testimony';
import Footer from '../components/Footer';
import Link from 'react-router-dom';
import ScrollTopButton from '../components/ScrollTopButton';
const Homepage = props => {
  return (
    <Fragment>
      <Header />
      <Carousel />
      <main className="main-homepage">
        <Categories />
        <Testimonies />
      </main>
      <Footer />
      <ScrollTopButton />
    </Fragment>
  );
};
export default Homepage;
