import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LatestVisas = () => {
  const [latestVisas, setLatestVisas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://server-liard-phi-11.vercel.app/latest-visas")
      .then((res) => res.json())
      .then((data) => setLatestVisas(data))
      .catch((err) => console.error("Error fetching latest visas:", err));
  }, []);

  return (
    <div className="latest-visas-section w-[80%] mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">Latest Visas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestVisas.map((visa) => (
          <div key={visa._id} className="visa-card p-4 border shadow-lg rounded">
            <img
              src={visa.countryImage}
              alt={visa.countryName}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-2">{visa.countryName}</h3>
            <p><strong>Visa Type:</strong> {visa.visaType}</p>
            <p><strong>Processing Time:</strong> {visa.processingTime}</p>
            <p><strong>Fee:</strong> ${visa.fee}</p>
            <p><strong>Validity:</strong> {visa.validity}</p>
            <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
            <button
              onClick={() => navigate(`/visa-details/${visa._id}`)}
              className="btn btn-primary bg-[#4E6BFF] text-white mt-4"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/all-visas")}
          className="btn btn-primary bg-[#4E6BFF] text-white"
        >
          See All Visas
        </button>
      </div>
    </div>
  );
};

export default LatestVisas;