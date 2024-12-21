import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FaCheckCircle, FaPaperPlane, FaClipboardList } from "react-icons/fa"; 
import { Typewriter } from "react-simple-typewriter"; 
import banner1 from '../assets/destination.jpg';
import banner2 from '../assets/completed.jpg';
import banner3 from '../assets/tracking.jpg';

const Banner = () => {
  return (
    <div className="w-[80%] mx-auto h-auto relative">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]} 
        className="h-full"
      >
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full gap-4">
           
            <div className="w-full lg:w-1/2 h-56 lg:h-full">
              <img src={banner1} alt="Destination" className="w-full h-full lg:rounded-full object-cover" />
            </div>
           
            <div className="w-full lg:w-1/2 p-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-[#4E6BFF] mb-4">
                <Typewriter
                  words={['Check Your Visa Requirements', 'Easily Find Your Destination Info']}
                  loop={5}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000}
                />
              </h2>
              <p className="text-lg mb-4">
                Easily find the visa requirements for your destination country.
              </p>
              <button className="px-4 py-2 bg-[#4E6BFF] text-white rounded-full hover:bg-blue-400 transition">
                Learn More <FaCheckCircle className="inline ml-2" />
              </button>
            </div>
          </div>
        </SwiperSlide>

        
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full gap-4">
            
            <div className="w-full lg:w-1/2 h-56 lg:h-full">
              <img src={banner2} alt="Completed" className="w-full h-full lg:rounded-full object-cover" />
            </div>
            
            <div className="w-full lg:w-1/2 p-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-[#4E6BFF] mb-4">
                <Typewriter
                  words={['Apply for Your Visa Online', 'Quick and Hassle-Free']}
                  loop={5}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000}
                />
              </h2>
              <p className="text-lg mb-4">
                Submit your visa application easily and track the status online.
              </p>
              <button className="px-4 py-2 bg-[#4E6BFF] text-white rounded-full hover:bg-blue-400 transition">
                Apply Now <FaPaperPlane className="inline ml-2" />
              </button>
            </div>
          </div>
        </SwiperSlide>

       
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full gap-4">
            
            <div className="w-full lg:w-1/2 h-56 lg:h-full">
              <img src={banner3} alt="Tracking" className="w-full h-full lg:rounded-full object-cover" />
            </div>
           
            <div className="w-full lg:w-1/2 p-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-[#4E6BFF] mb-4">
                <Typewriter
                  words={['Track Your Visa Application', 'Stay Updated Every Step']}
                  loop={5}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000}
                />
              </h2>
              <p className="text-lg mb-4">
                Stay updated with the status of your visa application and its progress.
              </p>
              <button className="px-4 py-2 bg-[#4E6BFF] text-white rounded-full hover:bg-blue-400 transition">
                Track Now <FaClipboardList className="inline ml-2" />
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;