import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { authContext } from "../components/AuthProvider/AuthProvider";

const AddVisa = () => {
  const [visaData, setVisaData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  const { user } = useContext(authContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisaData({
      ...visaData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setVisaData((prevData) => {
      const newDocs = prevData.requiredDocuments.includes(value)
        ? prevData.requiredDocuments.filter((doc) => doc !== value)
        : [...prevData.requiredDocuments, value];
      return { ...prevData, requiredDocuments: newDocs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVisa = {
      ...visaData,
      userEmail: user?.email || "",
    };

    fetch("https://server-liard-phi-11.vercel.app/visa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-email": user?.email || "",
      },
      body: JSON.stringify(newVisa),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Visa added successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          setVisaData({
            countryImage: "",
            countryName: "",
            visaType: "",
            processingTime: "",
            requiredDocuments: [],
            description: "",
            ageRestriction: "",
            fee: "",
            validity: "",
            applicationMethod: "",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add visa",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add visa",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="lg:w-3/4 mx-auto w-11/12">
      <div className="text-center p-10">
        <h1 className="text-5xl font-bold">Add Visa!</h1>
        <p className="py-6">
          Provide the required details to add a new visa to the database.
        </p>
      </div>
      <div className="card bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-100 w-full shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Country Image URL</span>
            </label>
            <input
              type="text"
              name="countryImage"
              value={visaData.countryImage}
              onChange={handleInputChange}
              placeholder="Enter the image URL"
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Country Name</span>
            </label>
            <input
              type="text"
              name="countryName"
              value={visaData.countryName}
              onChange={handleInputChange}
              placeholder="Enter the country name"
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Visa Type</span>
            </label>
            <select
              name="visaType"
              value={visaData.visaType}
              onChange={handleInputChange}
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            >
              <option value="">Select Visa Type</option>
              <option value="Tourist visa">Tourist visa</option>
              <option value="Student visa">Student visa</option>
              <option value="Official visa">Official visa</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Processing Time</span>
            </label>
            <input
              type="text"
              name="processingTime"
              value={visaData.processingTime}
              onChange={handleInputChange}
              placeholder="Enter processing time"
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Required Documents</span>
            </label>
            <div>
              <label>
                <input
                  type="checkbox" 
                  value="Valid passport"
                  checked={visaData.requiredDocuments.includes("Valid passport")}
                  onChange={handleCheckboxChange}
                />
                Valid passport
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Visa application form"
                  checked={visaData.requiredDocuments.includes("Visa application form")}
                  onChange={handleCheckboxChange}
                />
                Visa application form
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Recent passport-sized photograph"
                  checked={visaData.requiredDocuments.includes(
                    "Recent passport-sized photograph"
                  )}
                  onChange={handleCheckboxChange}
                />
                Recent passport-sized photograph
              </label>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Description</span>
            </label>
            <textarea
              name="description"
              value={visaData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="textarea textarea-bordered bg-gray-200 dark:bg-gray-900"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Age Restriction</span>
            </label>
            <input
              type="number"
              name="ageRestriction"
              value={visaData.ageRestriction}
              onChange={handleInputChange}
              placeholder="Enter age restriction"
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Fee</span>
            </label>
            <input
              type="number"
              name="fee"
              value={visaData.fee}
              onChange={handleInputChange}
              placeholder="Enter fee"
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Validity</span>
            </label>
            <input
              type="text"
              name="validity"
              value={visaData.validity}
              onChange={handleInputChange}
              placeholder="Enter validity period"
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-100">Application Method</span>
            </label>
            <select
              name="applicationMethod"
              value={visaData.applicationMethod}
              onChange={handleInputChange}
              className="input input-bordered bg-gray-200 dark:bg-gray-900"
              required
            >
              <option value="">Select Application Method</option>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
              <option value="Mail">Mail</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary bg-[#4E6BFF] text-white">Add Visa</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisa;