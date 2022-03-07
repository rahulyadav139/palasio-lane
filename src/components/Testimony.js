import './Testimony.css';
import { useState, useEffect } from 'react';

const testimoniesData = [
  {
    id: 'testimony-01',
    content:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    avatar: 'https://picsum.photos/536/354',
    testimonyName: 'Rohan Kapoor',
    designation: 'CEO, Omega Auto',
  },
  {
    id: 'testimony-01',
    content:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    avatar: 'https://picsum.photos/536/354',
    testimonyName: 'Mohan Kapoor',
    designation: 'COO, Balaji Auto',
  },
  {
    id: 'testimony-01',
    content:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    avatar: 'https://picsum.photos/536/354',
    testimonyName: 'Sohan Kapoor',
    designation: 'MD, Hero Automobiles',
  },
  {
    id: 'testimony-01',
    content:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    avatar: 'https://picsum.photos/536/354',
    testimonyName: 'Lakhan Kapoor',
    designation: 'CEO, Torque Machines',
  },
];

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
    <div class="testimonial-container">
      {testimoniesData.map((el, i) => (
        <div
          key={el.id}
          className={
            i === index ? 'testimonial shadow' : 'testimonial hidden shadow'
          }
        >
          <p class="testimonial__text">{el.content}</p>
          <div class="avatar medium">
            <img src={el.avatar} alt={el.id} />
          </div>
          <p class="heading-5">{el.testimonyName}</p>
          <p class="text-grey">{el.designation}</p>
        </div>
      ))}

      <div class="dot-container">
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
export default Testimonies;
