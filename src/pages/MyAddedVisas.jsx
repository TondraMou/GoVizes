import { useEffect, useState, useContext } from "react";
import { authContext } from "../components/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { ClipLoader } from "react-spinners";

const MyAddedVisas = () => {
  const { user } = useContext(authContext);
  const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserVisas = async () => {
        setLoading(true); 
        try {
          const response = await fetch(
            `https://server-liard-phi-11.vercel.app/my-added-visas?email=${user.email}`
          );
          const data = await response.json();
          setVisas(data);
        } catch (error) {
          console.error("Error fetching visas:", error);
        } finally {
          setLoading(false); 
        }
      };
      fetchUserVisas();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleDelete = async (visaId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this visa? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed.isConfirmed) return;

    setLoading(true); 
    try {
      const response = await fetch(
        `https://server-liard-phi-11.vercel.app/delete-visa/${visaId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (result.message === "Visa deleted successfully") {
        setVisas(visas.filter((visa) => visa._id !== visaId));
        Swal.fire("Deleted!", "Visa has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete visa. Try again.", "error");
      }
    } catch (error) {
      console.error("Error deleting visa:", error);
    } finally {
      setLoading(false); 
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { _id, ...updatedVisaData } = selectedVisa;

    setLoading(true); 
    try {
      const response = await fetch(
        `https://server-liard-phi-11.vercel.app/update-visa/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVisaData),
        }
      );

      const result = await response.json();

      if (result.message === "Visa updated successfully") {
        setVisas(
          visas.map((visa) =>
            visa._id === _id ? { ...visa, ...updatedVisaData } : visa
          )
        );
        setSelectedVisa(null);
        Swal.fire("Updated!", "Visa has been updated successfully.", "success");
      } else {
        Swal.fire("Error!", "Failed to update visa. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating visa:", error);
    } finally {
      setLoading(false); 
    }
  };

  const openModal = (visa) => {
    setSelectedVisa(visa);
  };

  const closeModal = () => {
    setSelectedVisa(null);
  };

  const handleInputChange = (e) => {
    setSelectedVisa({ ...selectedVisa, [e.target.name]: e.target.value });
  };

  return (
    <div className=" min-h-screen w-11/12 mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Added Visas</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader color="#4E6BFF" loading={loading} size={50} />
        </div>
      ) : visas.length === 0 ? (
        <p className="text-center text-gray-600">No visas found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
            >
              <img
                src={visa.countryImage}
                alt={visa.country}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{visa.countryName}</h3>
                <p className="text-sm mt-1">
                  <strong>Visa Type:</strong> {visa.visaType}
                </p>
                <p className="text-sm mt-1">
                  <strong>Processing Time:</strong> {visa.processingTime}
                </p>
                <p className="text-sm mt-1">
                  <strong>Fee:</strong> ${visa.fee}
                </p>
                <p className="text-sm mt-1">
                  <strong>Validity:</strong> {visa.validity}
                </p>
                <p className="text-sm mt-1">
                  <strong>Application Method:</strong> {visa.applicationMethod}
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openModal(visa)}
                    className="bg-[#4E6BFF] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-300 transition w-full"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(visa._id)}
                    className="bg-[#F36A8D] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-600 transition w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {selectedVisa && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md overflow-y-auto max-h-[80vh] w-full">
            <h2 className="text-2xl mb-2 text-gray-700">Update Visa Information</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <label className="block text-gray-700">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={selectedVisa.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country Image URL:</label>
                <input
                  type="text"
                  name="countryImage"
                  value={selectedVisa.countryImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Visa Type:</label>
                <input
                  type="text"
                  name="visaType"
                  value={selectedVisa.visaType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-transparent border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Processing Time:</label>
                <input
                  type="text"
                  name="processingTime"
                  value={selectedVisa.processingTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Required Documents:</label>
                <input
                  type="text"
                  name="requiredDocuments"
                  value={selectedVisa.requiredDocuments.join(", ")}
                  onChange={(e) =>
                    setSelectedVisa({
                      ...selectedVisa,
                      requiredDocuments: e.target.value.split(",").map((item) => item.trim()),
                    })
                  }
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={selectedVisa.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Age Restriction:</label>
                <input
                  type="text"
                  name="ageRestriction"
                  value={selectedVisa.ageRestriction}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fee:</label>
                <input
                  type="number"
                  name="fee"
                  value={selectedVisa.fee}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Validity:</label>
                <input
                  type="text"
                  name="validity"
                  value={selectedVisa.validity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Application Method:</label>
                <input
                  type="text"
                  name="applicationMethod"
                  value={selectedVisa.applicationMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-transparent rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#4E6BFF] text-white py-2 rounded-full w-full hover:bg-blue-300"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                className="mt-4 bg-[#F36A8D] text-white py-2 rounded-full w-full hover:bg-red-600"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedVisas;