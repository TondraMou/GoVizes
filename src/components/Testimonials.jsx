
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const Testimonials = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
    };

    return (
        <section className="py-16 w-[80%] mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Client’s Testimonials</h2>
            <Slider {...settings} className="testimonial-slider mx-auto max-w-4xl">
                
                <div className="testimonial p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <p className="text-lg italic mb-4">
                        "I had a great experience using this visa platform. The process was straightforward, and I received all the information I needed to successfully apply for my visa. Highly recommended!"
                    </p>
                    <h3 className="font-semibold text-xl text-[#4E6BFF]">Amira Khan</h3>
                    <p className="text-gray-400">Traveler to Europe</p>
                </div>

               
                <div className="testimonial p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <p className="text-lg italic mb-4">
                        "The visa application process was so easy and fast. I got all my documents and instructions in one place. Their customer support team was also really helpful when I had questions."
                    </p>
                    <h3 className="font-semibold text-xl text-[#4E6BFF]">Ravi Patel</h3>
                    <p className="text-gray-400">Student Visa Applicant</p>
                </div>

                
                <div className="testimonial p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <p className="text-lg italic mb-4">
                        "As a business professional, I travel often. This platform made applying for my business visas a breeze. I didn't have to worry about missing documents or complicated forms."
                    </p>
                    <h3 className="font-semibold text-xl text-[#4E6BFF]">John Miller</h3>
                    <p className="text-gray-400">Business Traveler</p>
                </div>

                
                <div className="testimonial p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <p className="text-lg italic mb-4">
                        "The process was very smooth and straightforward. I appreciate the clear steps provided by the visa service, making my application process stress-free. Thanks for the great support!"
                    </p>
                    <h3 className="font-semibold text-xl text-[#4E6BFF]">Maria Lopez</h3>
                    <p className="text-gray-400">Tourist Visa Applicant</p>
                </div>

               
                <div className="testimonial p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <p className="text-lg italic mb-4">
                        "I was so worried about the visa paperwork, but this platform gave me everything I needed. The step-by-step guide and document checklist made it so easy to apply for my visa."
                    </p>
                    <h3 className="font-semibold text-xl text-[#4E6BFF]">James Brown</h3>
                    <p className="text-gray-400">Student Visa Applicant</p>
                </div>

                
                <div className="testimonial p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <p className="text-lg italic mb-4">
                        "This platform made my business visa application a breeze. They provided all the necessary information and the process was completed faster than I expected. I highly recommend it!"
                    </p>
                    <h3 className="font-semibold text-xl text-[#4E6BFF]">Emily White</h3>
                    <p className="text-gray-400">Business Traveler</p>
                </div>
            </Slider>

        </section>
    );
};

export default Testimonials;