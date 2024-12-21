import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch('https://server-liard-phi-11.vercel.app/visa');
        const data = await response.json();
        setVisas(data);
        setFilteredVisas(data); 

        
        const types = Array.from(new Set(data.map((visa) => visa.visaType)));
        setVisaTypes(["All", ...types]); 
      } catch (error) {
        console.error('Error fetching visas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisas();
  }, []);

  
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    setFilteredVisas(
      type === "All" ? visas : visas.filter((visa) => visa.visaType === type)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  return (
    <section className="py-16 w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">All Visas</h2>

      
      <div className="mb-8 text-center">
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="border bg-gray-200 dark:bg-gray-900 rounded-md px-4 py-2"
        >
          {visaTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredVisas.map((visa) => (
          <div key={visa._id} className="visa-card bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white p-6 rounded-lg shadow-lg">
            <img
              src={visa.countryImage}
              alt={visa.country}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">{visa.countryName}</h3>
            <p className=" mb-2">
              <strong>Visa Type:</strong> {visa.visaType}
            </p>
            <p className=" mb-2">
              <strong>Processing Time:</strong> {visa.processingTime}
            </p>
            <p className=" mb-2">
              <strong>Fee:</strong> {visa.fee}
            </p>
            <button
              className="mt-4 bg-[#4E6BFF] text-white py-2 px-6 rounded-md"
              onClick={() => window.location.href = `/visa-details/${visa._id}`}
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllVisas;