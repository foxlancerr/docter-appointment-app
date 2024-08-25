import Layout from "@/components/dashboard/DashboardLayout";
import InputBox from "@/components/dashboard/InputBox";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AfterSignInForm() {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state?.userInfo?.user);

  const fetchData = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/doctor/basic-info/${loginUser._id}`, // Assuming `loginUser` is available
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );

      const result = await response.json();

      if (!result?.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        navigate("/dashboard"); // Navigate after successful form submission
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete profile.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("complete-profile"));
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    fetchData(formData); // Call fetchData and handle navigation inside it
  };

  const renderPatientForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputBox _name="firstname" type="text" label="First Name" />
      <InputBox _name="lastname" type="text" label="Last Name" />
      <InputBox _name="phone" type="tel" label="Phone Number" />
      <InputBox _name="address" type="text" label="Address" />
    </div>
  );

  const renderDoctorForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputBox _name="firstname" type="text" label="First Name" />
      <InputBox _name="lastname" type="text" label="Last Name" />
      <InputBox _name="phone" type="tel" label="Phone Number" />
      <InputBox _name="description" type="text" label="Description" />
      <InputBox _name="address" type="text" label="Clinic Address" />
    </div>
  );

  const renderAdminForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputBox _name="firstname" type="text" label="First Name" />
      <InputBox _name="lastname" type="text" label="Last Name" />
      <InputBox _name="phone" type="tel" label="Phone Number" />
      <InputBox _name="department" type="text" label="Department" />
      <InputBox _name="address" type="text" label="Office Address" />
    </div>
  );

  const renderFormByUserType = () => {
    switch (loginUser?.userType) {
      case "patient":
        return renderPatientForm();
      case "doctor":
        return renderDoctorForm();
      case "admin":
        return renderAdminForm();
      default:
        return <p>Unknown user type</p>;
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-[#f5f7f9] min-h-screen">
        <h1 className="text-4xl font-extrabold text-[#023e7d] mb-8 border-b-4 border-[#023e7d] pb-2">
          Complete Basic Info
        </h1>
        <section className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} id="complete-profile">
            {renderFormByUserType()}
            <button
              className="bg-[#023e7d] hover:bg-[#022c6b] text-white font-bold py-3 px-6 rounded-full mt-6 float-right transition duration-300 ease-in-out"
              type="submit"
            >
              Done
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export default AfterSignInForm;
