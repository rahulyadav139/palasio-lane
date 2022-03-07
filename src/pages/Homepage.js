import './Homepage.css';
import { Fragment } from 'react';
import Header from '../components/Header';
import Carousel from '../components/ui/Carousel';
// import Categories from '../components/Categories';
import Testimonies from '../components/Testimony';
import Footer from '../components/Footer';
const Homepage = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-homepage">
        <Carousel />
        <Testimonies />
      </main>
      <Footer />
    </Fragment>
  );
};
export default Homepage;
