import { useState, useEffect } from 'react';
import styles from './ImageCarousel.module.css';

const ImageCarousel = () => {
  const images = [
    'https://bookbuy.vn/Res/Images/Album/a068832a-36e5-42f0-9904-cfb3985bf954.jpg?w=880&scale=both&h=320&mode=crop',
    'https://bookbuy.vn/Res/Images/Album/ae6cc50a-1a78-4e6a-912b-fb52b4edab70.jpg?w=880&scale=both&h=320&mode=crop',
    'https://bookbuy.vn/Res/Images/Album/8aee647d-753c-47c4-9c0e-c591563ea3d5.jpg?w=880&scale=both&h=320&mode=crop',
    'https://bookbuy.vn/Res/Images/Album/1b3b3268-841f-4364-83e9-708f1d321735.jpg?w=880&scale=both&h=320&mode=crop'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} className={styles.carouselImage} alt={`slide-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
