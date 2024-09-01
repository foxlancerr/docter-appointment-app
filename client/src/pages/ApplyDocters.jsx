import { Input } from "@/components/ui/input"; // Adjust the import path according to your project structure
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import HomeLayout from "@/components/HomeLayout";

import axios from "axios";
import { BACKEND_API_URL } from "@/constants";
import toast from "react-hot-toast";
const DoctorDetailsForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    description: "",
    address: "",
    specialty: "",
    yearsExperience: "",
    about: "",
    fees: "",
    verified: false,
    services: [""],
    education: [""],
    specializations: [""],
    languages: [""],
    experience: [{ yearStart: "", yearEnd: "", position: "", hospital: "" }],
    otherLocations: [""],
    daysAvailable: [],
  });

  const handleAddField = (field) => {
    setFormData((prevData) => {
      if (field === "experience") {
        return {
          ...prevData,
          [field]: [
            ...prevData[field],
            { yearStart: "", yearEnd: "", position: "", hospital: "" },
          ],
        };
      }
      return {
        ...prevData,
        [field]: [...prevData[field], ""],
      };
    });
  };

  const handleRemoveField = (field, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };


  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        [field]: updatedArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: e.target.value,
      }));
    }
  };

  const handleExperienceChange = (e, index, field) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: e.target.value,
    };
    setFormData((prevData) => ({
      ...prevData,
      experience: updatedExperience,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BACKEND_API_URL}/api/v1/doctor`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = response.data;
  
      console.log(result)
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message)
    }
    
    console.log('called')
  };

  return (
    <HomeLayout>
      <form
        className="mx-auto bg-white p-8 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              First Name
            </label>
            <Input
              type="text"
              value={formData.firstname}
              onChange={(e) => handleChange(e, "firstname")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              Last Name
            </label>
            <Input
              type="text"
              value={formData.lastname}
              onChange={(e) => handleChange(e, "lastname")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              Phone
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange(e, "phone")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              Address
            </label>
            <Input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange(e, "address")}
            />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              Description
            </label>
            <Input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              Specialty
            </label>
            <Input
              type="text"
              value={formData.specialty}
              onChange={(e) => handleChange(e, "specialty")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              Years of Experience
            </label>
            <Input
              type="number"
              value={formData.yearsExperience}
              onChange={(e) => handleChange(e, "yearsExperience")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#023e7d]">
              Fees
            </label>
            <Input
              type="number"
              value={formData.fees}
              onChange={(e) => handleChange(e, "fees")}
            />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "services",
            "education",
            "specializations",
            "languages",
            "otherLocations",
          ].map((field) => (
            <div className="" key={field}>
              <div className="">
              <label className="block text-sm font-medium text-[#023e7d]">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {formData[field].map((value, index) => (
                <div
                  className="flex items-center gap-2 mb-2 w-full"
                  key={index}
                >
                  <Input
                    className="w-full"
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e, field, index)}
                    placeholder={`Enter ${field.slice(0, -1)}`}
                  />
                  <Button
                    onClick={() => handleRemoveField(field, index)}
                    type="button"
                    className="bg-red-500 text-white"
                  >
                    X
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => handleAddField(field)}
                type="button"
                className="bg-[#023e7d] text-white"
              >
                Add {field.slice(0, -1)}
              </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Experience</label>
          {formData.experience.map((exp, index) => (
            <div className="flex justify-between gap-5 items-end" key={index}>
              <Input
                className="w-full"
                type="number"
                placeholder="Year Start"
                value={exp.yearStart}
                onChange={(e) => handleExperienceChange(e, index, "yearStart")}
              />
              <Input
                className="w-full"
                type="number"
                placeholder="Year End"
                value={exp.yearEnd}
                onChange={(e) => handleExperienceChange(e, index, "yearEnd")}
              />
              <Input
                className="w-full"
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(e, index, "position")}
              />
              <Input
                className="w-full"
                type="text"
                placeholder="Hospital"
                value={exp.hospital}
                onChange={(e) => handleExperienceChange(e, index, "hospital")}
              />
              <Button
                onClick={() => handleRemoveField("experience", index)}
                type="button"
                className="bg-red-500 text-white"
              >
                X
              </Button>
            </div>
          ))}
          <Button
            onClick={() => handleAddField("experience")}
            type="button"
            className="bg-[#023e7d] text-white mt-2"
          >
            Add Experience
          </Button>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Days Available
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label key={day} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.daysAvailable.includes(day)}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      daysAvailable: e.target.checked
                        ? [...prevData.daysAvailable, day]
                        : prevData.daysAvailable.filter((d) => d !== day),
                    }))
                  }
                />
                <span className="ml-2">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-[#023e7d] text-white font-bold px-4 py-2 rounded-md w-full"
          >
            Apply Now
          </Button>
        </div>
      </form>
    </HomeLayout>
  );
};

export default DoctorDetailsForm;
