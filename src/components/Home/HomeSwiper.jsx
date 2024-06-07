import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// Import Swiper core and required modules
import { Pagination, Autoplay } from 'swiper/modules';
import HomeCard from './HomeCard';

const imageUrls = [
  'https://i.ibb.co/f92yZtf/photo-2023-09-13-08-51-46-2.jpg',
  'https://i.ibb.co/yXR4RHY/photo-2023-09-13-08-51-46.jpg',
  'https://i.ibb.co/HB1dNV1/photo-2023-09-13-08-51-47-2.jpg',
  'https://i.ibb.co/T0y9WRZ/photo-2023-09-13-08-51-47.jpg',
  // Add more image URLs as needed
];

const HomeSwiper = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8'>
      <div className="w-full mx-auto px-2 lg:px-0">
      <h1 className='lg:text-2xl text-lg md:text-xl font-semibold text-center text-orange-600 py-2 font-PTSans'>
      Snapshots from Our Recent Events
    </h1>
        <div className="h-96"> {/* Set the desired height using Tailwind CSS */}
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10} // Adjust spacing between slides
            slidesPerView={1} // Number of slides per view for mobile
            pagination={{ clickable: true }}
            loop={true} // Optional: Loop the slides
            autoplay={{ delay: 2000 }} // Optional: Set autoplay delay
          >
            {imageUrls.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[400px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div>
        <HomeCard></HomeCard>
      </div>


    </div>
  );
};

export default HomeSwiper;