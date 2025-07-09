import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import 'animate.css'
import BannerSlider from './Components/BannerSlider';
import OrderSection from './Components/OrderSection';
import SpecialitySection from './Components/SpecialitySection';
import SpecialMenu from './Components/SpecialMenu'
import Reservation from './Components/Reservation';
import BestChef from './Components/BestChef';
import NewsSection from './Components/NewsSection';
import AboutSection from './Components/About';
import CustomerReviews from './Components/CustomerReviews'
import ScrollToTop from './Components/ScrollToTop'
import Loder from './Components/Loder';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  const [isloading, setISloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setISloading(false);
    }, 5000);
  }, []);

  return (
    <>
      {isloading ? (
        <Loder />
      ) : (
        <>
          <Header />
          <BannerSlider />
          <OrderSection />
          <SpecialitySection />
          <SpecialMenu />
          <Reservation />
          <BestChef /> 
          <NewsSection />
          <CustomerReviews />
          <AboutSection />
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;

