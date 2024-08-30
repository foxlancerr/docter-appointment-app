import Layout from "@/components/dashboard/DashboardLayout";
import InputBox from "@/components/dashboard/InputBox";
import DatePickerBox from "@/components/shared/DatePicker";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import HomeLayout from "@/components/HomeLayout";
import { BACKEND_API_URL } from "@/constants";

function AfterSignInForm() {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state?.userInfo?.user);

  console.log(loginUser)
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [permissionLevel, setPermissionLevel] = useState("");
  const [genderType, setGenderType] = useState("");


  const handleSelectChange = (value) => {
    if(loginUser.userType == 'admin'){
    setPermissionLevel(value); // Update state with selected value
    }else{
      setGenderType(value)
    }
  };

  const fetchData = async (data) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/api/v1/auth/basic-info/${loginUser._id}`, // Assuming `loginUser` is available
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
    if(loginUser.userType == 'admin'){
      form.append('permissionLevel',permissionLevel)
    }else {
      form.append('dateOfBirth',dateOfBirth)

    }
    form.append('gender',genderType)
    
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    fetchData(formData); // Call fetchData and handle navigation inside it
  };

  const renderPatientForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <InputBox _name="firstname" type="text" label="First Name" />
      <InputBox _name="lastname" type="text" label="Last Name" />
      <InputBox _name="phone" type="tel" label="Phone Number" />
      <InputBox _name="address" type="text" label="Address" />
      <div>
          <div className="flex gap-1 flex-col flex-1">
            <label htmlFor="start-date" className="text-[#023e7d]">
              Date of Birth
            </label>
            <DatePickerBox
              value={dateOfBirth}
              onChange={(selectedDate) => setDateOfBirth(selectedDate)}
            />
          </div>
        </div>
        <Select className="" onValueChange={handleSelectChange} defaultValue={genderType}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select User Type" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup className="" >
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );


  const renderAdminForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <InputBox _name="firstname" type="text" label="First Name" />
      <InputBox _name="lastname" type="text" label="Last Name" />
      <InputBox _name="phone" type="tel" label="Phone Number" />
      <InputBox _name="Hire Date" type="text" label="Department" />
     <div>

      <span className="block text-sm font-medium text-[#023e7d] mb-1">Permission</span>
      <Select className="" onValueChange={handleSelectChange} defaultValue={permissionLevel } >
      <SelectTrigger className="w-full">
        
        <SelectValue placeholder="Select Admin Permission Level" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup className="" >
          <SelectItem value="view">only View</SelectItem>
          <SelectItem value="access">full command</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
     </div>
    </div>
  );

  const renderFormByUserType = () => {
    if (loginUser?.userType == "patient") {

        return renderPatientForm();
      }
      else if(loginUser?.userType ==  "admin"){

        return renderAdminForm();
      }
      
  };

  return (
    <HomeLayout>
        <section className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h1 className="text-2xl font-extrabold text-[#023e7d] mb-8 border-b-4 border-[#023e7d] pb-2">
          Complete Basic Info
        </h1>
          <form onSubmit={handleSubmit} id="complete-profile">
            {renderFormByUserType()}
            <button
              className="bg-[#023e7d] hover:bg-[#022c6b] text-white font-bold py-3 px-6 rounded-full mt-3 transition duration-300 ease-in-out"
              type="submit"
            >
              Done
            </button>
          </form>
        </section>
    </HomeLayout>
  );
}

export default AfterSignInForm;
