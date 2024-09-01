import InputBox from "@/components/dashboard/InputBox";
import DatePickerBox from "@/components/shared/DatePicker";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HomeLayout from "@/components/HomeLayout";
import { BACKEND_API_URL } from "@/constants";
import ApplyDoctors from "../ApplyDocters";
import { getItemFromLocalStorage } from "@/utils/webLocalStorage";

function AfterSignInForm() {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state?.userInfo?.user);

  console.log(loginUser);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [hireDate, setHireDate] = useState(null);
  const [permissionLevel, setPermissionLevel] = useState("");
  const [genderType, setGenderType] = useState("");

  const handleSelectChange = (value) => {
    if (loginUser.userType == "admin") {
      setPermissionLevel(value); // Update state with selected value
    } else {
      setGenderType(value);
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
              Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
          },
          body: JSON.stringify({ ...data }),
        }
      );

      const result = await response.json();

      if (!result?.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        // navigate("/dashboard"); // Navigate after successful form submission
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete profile.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("complete-profile"));
    if (loginUser.userType == "admin") {
      form.append("permissionLevel", permissionLevel);
      form.append("hiredate", hireDate);
    } else {
      form.append("dateOfBirth", dateOfBirth);
    }
    form.append("gender", genderType);

    const formData = {};
    for (let [key, value] of form.entries()) {
      if (key === "daysAvailable") {
        if (!formData[key]) {
          formData[key] = [];
        }
        formData[key].push(value);
      } else {
        formData[key] = value;
      }}

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
      <Select
        className=""
        onValueChange={(value) => setGenderType(value)}
        defaultValue={genderType}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select User Type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup className="">
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
      <div>
        <span className="block text-sm font-medium text-[#023e7d] mb-1">
          Gender
        </span>
        <Select
          className=""
          onValueChange={(value) => setGenderType(value)}
          defaultValue={genderType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select User Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup className="">
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <InputBox _name="phone" type="tel" label="Phone Number" />
      <div>
        <div className="flex gap-1 flex-col flex-1">
          <label htmlFor="start-date" className="text-[#023e7d]">
            Hire Date
          </label>
          <DatePickerBox
            value={dateOfBirth}
            onChange={(selectedDate) => setHireDate(selectedDate)}
            type="date-time"
          />
        </div>
      </div>
      <div>
        <span className="block text-sm font-medium text-[#023e7d] mb-1">
          Permission
        </span>
        <Select
          className=""
          onValueChange={(value) => setPermissionLevel(value)}
          defaultValue={permissionLevel}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Admin Permission Level" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup className="">
              <SelectItem value="view">only View</SelectItem>
              <SelectItem value="access">full command</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // const renderDoctorForm = () => {
  //   return (
  //     <>  
  //           <div className="bg-white p-10 rounded-2xl shadow-lg max-md:p-6">
  //             <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
  //               <InputBox _name="firstname" type="text" label="First Name" />
  //               <InputBox _name="lastname" type="text" label="Last Name" />
  //             </div>
  //             <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
  //               <InputBox _name="phone" type="tel" label="Phone Number" />
  //               <div>
  //       <span className="block text-sm font-medium text-[#023e7d] mb-1">
  //         Gender
  //       </span>
  //       <Select
  //         className=""
  //         onValueChange={(value) => setGenderType(value)}
  //         defaultValue={genderType}
  //       >
  //         <SelectTrigger className="w-full">
  //           <SelectValue placeholder="Select User Type" />
  //         </SelectTrigger>
  //         <SelectContent className="bg-white">
  //           <SelectGroup className="">
  //             <SelectItem value="Male">Male</SelectItem>
  //             <SelectItem value="Female">Female</SelectItem>
  //             <SelectItem value="Other">Other</SelectItem>
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //     </div>
       
  //             </div>
  //             <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
  //               <InputBox _name="address" type="text" label="Address" />
  //             </div>
  //           </div>
  //           <hr className="my-10" />
  //           <div className="bg-white p-10 rounded-2xl shadow-lg max-md:p-6">
  //             <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
  //               <InputBox _name="department" type="text" label="Department" />
  //               <InputBox _name="profession" type="text" label="Profession" />
  //             </div>
  //             <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
  //               <InputBox
  //                 _name="yearsExperience"
  //                 type="number"
  //                 label="Experience (Years)"
  //               />
  //               <InputBox
  //                 _name="license"
  //                 type="text"
  //                 label="Medical License Number"
  //               />
  //             </div>
  //             <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
  //               <InputBox
  //                 _name="feePerConsultation"
  //                 type="number"
  //                 label="Fee Per Consultation"
  //               />
  //               <div>
  //                 <label className="block text-lg font-semibold mb-2">
  //                   Days Available
  //                 </label>
  //                 <div className="grid grid-cols-4">
  //                   {[
  //                     "Monday",
  //                     "Tuesday",
  //                     "Wednesday",
  //                     "Thursday",
  //                     "Friday",
  //                     "Saturday",
  //                     "Sunday",
  //                   ].map((day) => (
  //                     <div key={day} className="flex items-center">
  //                       <input
  //                         type="checkbox"
  //                         id={day}
  //                         name="daysAvailable"
  //                         value={day}
  //                         className="mr-2"
  //                       />
  //                       <label htmlFor={day} className="text-base">
  //                         {day}
  //                       </label>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="mt-3">
  //               <div>
  //                 <label className="block text-lg font-semibold mb-2">
  //                   Available Timing
  //                 </label>
  //                 <div className="flex gap-x-5">
  //                   <InputBox
  //                     _name="startTime"
  //                     type="time"
  //                     label="Start Time"
  //                   />
  //                   <InputBox _name="endTime" type="time" label="End Time" />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //     </>
  //   );
  // };

  const renderDoctorForm = () => {
    return (
      <>  
        {/* Basic Information Section */}
        <div className="bg-white p-10 rounded-2xl shadow-lg max-md:p-6">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <InputBox _name="firstname" type="text" label="First Name" />
            <InputBox _name="lastname" type="text" label="Last Name" />
          </div>
          <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
            <InputBox _name="phone" type="tel" label="Phone Number" />
            <div>
              <span className="block text-sm font-medium text-[#023e7d] mb-1">Gender</span>
              <Select
                className="w-full"
                onValueChange={(value) => setGenderType(value)}
                defaultValue={genderType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
            <InputBox _name="address" type="text" label="Address" />
            <InputBox _name="description" type="text" label="Description" />
          </div>
        </div>
  
        <hr className="my-10" />
  
        {/* Professional Information Section */}
        <div className="bg-white p-10 rounded-2xl shadow-lg max-md:p-6">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <InputBox _name="specialty" type="text" label="Specialty" />
            <InputBox _name="yearsExperience" type="number" label="Experience (Years)" />
          </div>
          <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
            <InputBox _name="fees" type="number" label="Fee Per Consultation" />
            <InputBox _name="otherLocations" type="text" label="Other Locations" />
          </div>
          <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
            <InputBox _name="services" type="text" label="Services" />
            <InputBox _name="education" type="text" label="Education" />
          </div>
          <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
            <InputBox _name="specializations" type="text" label="Specializations" />
            <InputBox _name="languages" type="text" label="Languages" />
          </div>
          <div className="mt-3">
            <label className="block text-lg font-semibold mb-2">Experience</label>
            <div className="space-y-4">
              {/* Placeholder for dynamic experience fields */}
              {/* You may need to map through an array of experience objects and render them */}
            </div>
          </div>
          <div className="mt-3">
            <div>
              <label className="block text-lg font-semibold mb-2">Days Available</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ].map((day) => (
                  <div key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      id={day}
                      name="daysAvailable"
                      value={day}
                      className="mr-2"
                    />
                    <label htmlFor={day} className="text-base">{day}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <label className="block text-lg font-semibold mb-2">Available Timing</label>
              <div className="flex gap-x-5">
                <InputBox _name="startTime" type="time" label="Start Time" />
                <InputBox _name="endTime" type="time" label="End Time" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  

  const renderFormByUserType = () => {
    if (loginUser?.userType == "patient") {
      return renderPatientForm();
    } else if (loginUser?.userType == "admin") {
      return renderAdminForm();
    } else {
      return renderDoctorForm();
    }
  };

  return (
    <HomeLayout>
      <section className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold pb-2 border-b-2 mb-10 text-[#023e7d]">
          Complete Basic Information
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
