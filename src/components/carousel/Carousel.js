import './Carousel.css';
import { useEffect, useState } from 'react';
import carouselData from '../../data/carousel-data.json';
import { v4 as uuid } from 'uuid';

const Carousel = props => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (index === carouselData.length - 1) {
        return setIndex(0);
      }

      setIndex(prev => prev + 1);
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
        <div key={uuid()} className="slide">
          <img
            style={{ width: '100%' }}
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
            key={uuid()}
            onClick={goToSlideHandler.bind(null, i)}
            className={i === index ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
};
export { Carousel };
