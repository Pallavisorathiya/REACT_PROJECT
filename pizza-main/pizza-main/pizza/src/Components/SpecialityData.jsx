import speciality1 from '../assets/speciality-1.jpg';
import speciality2 from '../assets/speciality-2.jpg';
import speciality3 from '../assets/speciality-3.jpg';

const titles = [
  'Mexican Green Wave',
  'Double Cheese Pizza',
  'Margherita Pizza',
];

const images = [speciality1, speciality2, speciality3];

export const specialities = titles.map((title, i) => ({
  title,
  image: images[i],
  link: 'shop-detail.html',
  imgClass: `images ${i + 1}`,
}));