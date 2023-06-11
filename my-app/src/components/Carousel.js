import React from 'react'
import "slick-carousel/slick/slick.css";
import pic1 from './pics/pic1.jpeg';
import pic2 from './pics/pic2.jpeg'
import pic3 from './pics/pic3.jpeg'
import pic4 from './pics/pic4.jpeg'
import './style.css'
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };
  return (
    <div className='bg-transparent p-4 mt-7'>
    
    <Slider {...settings}>
      <div className='component'>
        <img src={pic1}/>
      </div>
      <div className='component'>
        <img src={pic2}/>
      </div>
      <div className='component'>
        <img src={pic3}/>
      </div>
      <div className='component'>
        <img src={pic4}/>
      </div>
      <div className='component'>
        <img src={pic1}/>
      </div>
      <div className='component'>
        <img src={pic2}/>
      </div>
    </Slider>
  </div>
  )
}

export default Carousel