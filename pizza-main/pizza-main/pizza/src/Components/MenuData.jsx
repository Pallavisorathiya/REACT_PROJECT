// menuData.js
import menu1 from '../assets/menu-1.png';
import menu2 from '../assets/menu-2.png';
import menu3 from '../assets/menu-3.png';
import menu4 from '../assets/menu-4.png';
import menu5 from '../assets/menu-5.png';
import menu6 from '../assets/menu-6.png';
import menu7 from '../assets/menu-7.png';
import menu8 from '../assets/menu-8.png';

export const menuItems = {
  all: [
    { img: menu1, title: 'Margherita Pizza' },
    { img: menu2, title: 'Rum With Soda' },
    { img: menu3, title: 'Ceaser Salad' },
    { img: menu4, title: 'Sea Food Pasta' },
    { img: menu5, title: 'Chocolate Cookies' },
    { img: menu6, title: 'Pepperoni Pizza' },
    { img: menu7, title: 'Bismarck Pizza' },
    { img: menu8, title: 'Valdostana Pizza' },
  ],
  drinks: [{ img: menu2, title: 'Rum With Soda' }],
  salads: [{ img: menu3, title: 'Ceaser Salad' }],
  pasta: [{ img: menu4, title: 'Sea Food Pasta' }],
  burgers: [
    { img: menu8, title: 'Valdostana Pizza' },
    { img: menu7, title: 'Bismarck Pizza' },
    { img: menu6, title: 'Pepperoni Pizza' },
    { img: menu7, title: 'Oriental Pizza' },
    { img: menu8, title: 'Barbecue Pizza' },
  ],
  deserts: [
    { img: menu5, title: 'Chocolate Cookies' },
    { img: menu2, title: 'Rum With Soda' },
  ],
  pizzas: [
    { img: menu1, title: 'Vegetarian' },
    { img: menu6, title: 'Margherita Pizza' },
    { img: menu7, title: 'Four Cheese' },
    { img: menu8, title: 'Valdostana Pizza' },
  ],
};