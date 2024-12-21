import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { authContext } from '../components/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader'; 

const VisaDetails = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [submitting, setSubmitting] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    appliedDate: '',
    fee: '',
  });

  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        const response = await fetch(`https://server-liard-phi-11.vercel.app/visa/${id}`);
        const data = await response.json();
        setVisa(data);
      } catch (error) {
        console.error('Failed to fetch visa details:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchVisaDetails();
  }, [id]);

  const handleChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); 
    try {
      const response = await fetch('https://server-liard-phi-11.vercel.app/apply-visa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...applicationData, visaId: id }),
      });
      const result = await response.json();

      if (result.message === 'Application submitted successfully') {
        Swal.fire({
          title: 'Success!',
          text: 'Your visa application has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setShowModal(false);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while submitting your application.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue processing your request. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setSubmitting(false); 
    }
  };

  const openModal = () => {
    if (user) {
      setShowModal(true);
      setApplicationData((prevState) => ({
        ...prevState,
        email: user.email,
        appliedDate: new Date().toISOString().split('T')[0],
        fee: visa?.fee || '',
      }));
    } else {
      alert('You must be logged in to apply for the visa');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#4E6BFF" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-100 shadow-lg rounded-lg overflow-hidden">
        <img
          src={visa.countryImage}
          alt={`Image of ${visa.countryName}`}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold">{visa.countryName}</h2>
          <p className="text-lg text-gray-400">{visa.visaType}</p>
          <p className="mt-2">
            <strong>Processing Time:</strong> {visa.processingTime}
          </p>
          <p className="mt-2">
            <strong>Age Restriction:</strong> {visa.ageRestriction}
          </p>
          <p className="mt-2">
            <strong>Fee:</strong> ${visa.fee}
          </p>
          <p className="mt-2">
            <strong>Validity:</strong> {visa.validity}
          </p>
          <p className="mt-2">
            <strong>Application Method:</strong> {visa.applicationMethod}
          </p>

          <div className="mt-4">
            <strong>Required Documents:</strong>
            <ul className="list-disc pl-6 mt-2">
              {visa.requiredDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4">{visa.description}</p>

          <button
            onClick={openModal}
            className="mt-6 bg-[#4E6BFF] text-white py-2 px-6 rounded-full"
          >
            Apply for the Visa
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl mb-4">Apply for {visa.countryName} Visa</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={applicationData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent text-black border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={applicationData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent text-black border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={applicationData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent text-black border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Applied Date:</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={applicationData.appliedDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border bg-transparent text-black rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fee:</label>
                <input
                  type="number"
                  name="fee"
                  value={applicationData.fee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent text-black border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4E6BFF] text-white py-2 rounded-full"
              >
                {submitting ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  'Apply'
                )}
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 bg-[#F36A8D] text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;