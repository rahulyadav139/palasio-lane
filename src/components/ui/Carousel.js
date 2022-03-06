import './Carousel.css';
import { useEffect, useState } from 'react';

const carouselData = [
  {
    image: require('../../assets/carousel-images/bike-body-covers.webp'),
    id: 'slide-1',
  },
  {
    image: require('../../assets/carousel-images/car-body-covers.webp'),
    id: 'slide-2',
  },
  {
    image: require('../../assets/carousel-images/car-organizers.webp'),
    id: 'slide-3',
  },
  {
    image: require('../../assets/carousel-images/car-seat-covers.webp'),
    id: 'slide-4',
  },
];

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
    <div class="slides">
      {carouselData.map((el, i) => (
        <div key={el.id} class="slide">
          <img
            class={i === index ? 'img-responsive' : 'img-responsive hidden'}
            src={el.image}
            alt={el.id}
          />
        </div>
      ))}

      <button onClick={nextSlideHandler} class="icon medium btn-right">
        <i class="bi bi-chevron-right"></i>
      </button>
      <button onClick={prevSlideHandler} class="icon medium btn-left">
        <i class="bi bi-chevron-left"></i>
      </button>
      <div class="dot-container">
        {carouselData.map((el, i) => (
          <div
            onClick={goToSlideHandler.bind(null, i)}
            class={i === index ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
