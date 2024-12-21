import { FaRegClock, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const FeatureSection = () => {
  return (
    <div className="w-[80%] mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div>
          <Fade direction="up" triggerOnce>
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-[#F36A8D] text-4xl mb-4">
                <FaRegClock />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Visa Support</h3>
              <p className="text-gray-400">
                Our support team is available around the clock to assist you with any visa-related queries or concerns.
              </p>
            </div>
          </Fade>
        </div>

        
        <div>
          <Fade direction="down" triggerOnce delay={400}>
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-green-600 text-4xl mb-4">
                <FaHandHoldingHeart />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Assistance</h3>
              <p className="text-gray-400">
              Take charge of visa application journey with personalized assistance to support you at every stage.
              </p>
            </div>
          </Fade>
        </div>

        
        <div>
          <Fade direction="up" triggerOnce delay={400}>
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-orange-500 text-4xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Teamwork</h3>
              <p className="text-gray-400">
                Our expert team collaborates to ensure your visa application is processed smoothly and efficiently.
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
