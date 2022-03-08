import './Carousel.css';
import { useEffect, useState } from 'react';
import carouselData from '../../assets/carousel-data.json';

const Carousel = props => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlideHandler(index);
    }, 4000);

    return () => clearInterval(timer);
  }, [index]);

  const nextSlideHandler = () => {
    if (index === carouselData.length - 1) {
      return setIndex(0);
    }

    setIndex(prev => prev + 1);
  };

  const prevSlideHandler = () => {
    if (index === 0) {
      return setIndex(carouselData.length - 1);
    }

    setIndex(prev => prev - 1);
  };

  const goToSlideHandler = i => {
    setIndex(i);
  };

  return (
    <div className="slides">
      {carouselData.map((el, i) => (
        <div key={el.id} className="slide">
          <img
            className={i === index ? 'img-responsive' : 'img-responsive hidden'}
            src={el.image}
            alt={el.id}
          />
        </div>
      ))}

      <button onClick={nextSlideHandler} className="icon medium btn-right">
        <i className="bi bi-chevron-right"></i>
      </button>
      <button onClick={prevSlideHandler} className="icon medium btn-left">
        <i className="bi bi-chevron-left"></i>
      </button>
      <div className="dot-container">
        {carouselData.map((el, i) => (
          <div
            onClick={goToSlideHandler.bind(null, i)}
            className={i === index ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
