import './Testimonies.css';
import { useState, useEffect } from 'react';
import testimoniesData from '../../data/testimonies-data.json';

const Testimonies = props => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (index === testimoniesData.length - 1) {
        return setIndex(0);
      }
      setIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [index]);

  const goToTestimony = i => {
    setIndex(i);
  };
  return (
    <div className="testimonial-container">
      {testimoniesData.map((el, i) => (
        <div
          key={el.id}
          className={
            i === index ? 'testimonial shadow' : 'testimonial hidden shadow'
          }
        >
          <p className="testimonial__text">{el.content}</p>
          <div className="avatar medium">
            <img src={el.avatar} alt={el.id} />
          </div>
          <p className="heading-5">{el.testimonyName}</p>
          <p className="text-grey">{el.designation}</p>
        </div>
      ))}

      <div className="dot-container">
        {testimoniesData.map((el, i) => (
          <div
            key={i + 1}
            onClick={goToTestimony.bind(null, i)}
            className={i === index ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
};
export { Testimonies };
