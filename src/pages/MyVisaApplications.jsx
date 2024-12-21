import { useEffect, useState, useContext } from "react";
import { authContext } from "../components/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; 

const MyVisaApplications = () => {
  const { user } = useContext(authContext);
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchApplications = async () => {
        setLoading(true); 
        try {
          const response = await fetch(
            `https://server-liard-phi-11.vercel.app/my-visa-applications?email=${user.email}`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            setApplications(data);
            setFilteredApplications(data);
          } else {
            console.error("Invalid data format:", data);
          }
        } catch (error) {
          console.error("Error fetching applications:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchApplications();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleCancelApplication = async (applicationId) => {
    setLoading(true); 
    try {
      const response = await fetch(
        "https://server-liard-phi-11.vercel.app/cancel-visa-application",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationId }),
        }
      );
      const data = await response.json();
      if (data.message === "Application canceled successfully") {
        setApplications((prevApplications) =>
          prevApplications.filter((app) => app._id !== applicationId)
        );
        setFilteredApplications((prevApplications) =>
          prevApplications.filter((app) => app._id !== applicationId)
        );
      } else {
        alert("Failed to cancel application");
      }
    } catch (error) {
      console.error("Error canceling application:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter((application) =>
        application.visaDetails.countryName
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredApplications(filtered);
    }
  };

  return (
    <div className="w-[80%] mx-auto min-h-screen py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Visa Applications</h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by country name..."
          className="border p-2 bg-gray-200 dark:bg-gray-900 rounded-md w-1/2"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader color="#4E6BFF" loading={loading} size={50} />
        </div>
      ) : filteredApplications.length === 0 ? (
        <p className="text-center text-gray-600">No applications found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <div
              key={application._id}
              className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
            >
              <img
                src={application.visaDetails.countryImage}
                alt={application.visaDetails.countryName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {application.visaDetails.countryName}
                </h3>
                <p className="text-sm mt-1">
                  <strong>Visa Type:</strong> {application.visaDetails.visaType}
                </p>
                <p className="text-sm mt-1">
                  <strong>Processing Time:</strong>{" "}
                  {application.visaDetails.processingTime}
                </p>
                <p className="text-sm mt-1">
                  <strong>Fee:</strong> ${application.fee}
                </p>
                <p className="text-sm mt-1">
                  <strong>Validity:</strong> {application.visaDetails.validity}
                </p>
                <p className="text-sm mt-1">
                  <strong>Application Method:</strong>{" "}
                  {application.visaDetails.applicationMethod}
                </p>
                <p className="text-sm mt-1">
                  <strong>Applied Date:</strong>{" "}
                  {new Date(application.appliedDate).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1">
                  <strong>Applicant:</strong> {application.firstName}{" "}
                  {application.lastName}
                </p>
                <p className="text-sm mt-1">
                  <strong>Email:</strong> {application.email}
                </p>
                <button
                  onClick={() => handleCancelApplication(application._id)}
                  className="mt-4 w-full bg-[#F36A8D] text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                >
                  Cancel Application
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVisaApplications;