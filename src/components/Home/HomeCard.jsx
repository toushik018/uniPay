import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Add navigation styles
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";

const HomeCard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/announcements')
      .then(res => res.json())
      .then(data => {
        setCards(data);
      })
  }, [])

  return (
    <div className="">
      <div className="w-full mx-auto px-2 lg:px-0">
        <h1 className='lg:text-2xl text-lg md:text-xl font-semibold text-center text-orange-600 py-2 font-PTSans'>Recent Announcements</h1>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1} // Default: Show 1 card
          spaceBetween={30} // Adjust spacing between slides
          pagination={{ clickable: true }}
          className="mySwiper"
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            // Customize slidesPerView for different screen sizes
            640: {
              slidesPerView: 1, // Show 1 card on screens less than 640px wide (mobile)
            },
            768: {
              slidesPerView: 1, // Show 2 cards on screens between 640px and 767px wide (tablet)
            },
            1024: {
              slidesPerView: 2, // Show 2 cards on screens between 768px and 1023px wide (small desktop)
            },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <Link to={`/announcements/${card._id}`}>
                <div className="bg-gray-100 border h-[400px] rounded-t-md">
                  <img
                    src={card.imageUrl}
                    alt={`Card ${index + 1}`}
                    className="w-full h-44 object-cover rounded-t-md hover:scale-105 transition-transform duration-500"
                  />
                  <div className="relative group">
                    <h2 className="text-xl font-bold mt-2 px-2  uppercase">
                      {card.title}
                      <span className="text-orange-400 text-base absolute transform scale-100 transition-transform group-hover:scale-125 flex-row mx-2 items-center justify-evenly mt-1">
                        <FaExternalLinkAlt />
                      </span>
                    </h2>
                    <p className="text-base text-gray-500 px-2 mt-3 text-start hover:text-gray-600">
                      {card.description.split(' ').slice(0, 25).join(' ')}...
                      <span className='text-blue-400 ml-1'>read more</span>
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCard;
