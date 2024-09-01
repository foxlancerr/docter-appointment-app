import InputBox from '@/components/dashboard/InputBox';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

// Assuming InputBox, Button, and Select components are already created or imported from Shadcn UI

const DoctorDetailsForm = () => {
  // State to handle form inputs and dynamic fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    description: '',
    address: '',
    specialty: '',
    yearsExperience: '',
    about: '',
    fees: '',
    verified: false,
    services: [''],
    education: [''],
    specializations: [''],
    languages: [''],
    experience: [{ yearStart: '', yearEnd: '', position: '', hospital: '' }],
    otherLocations: [''],
    daysAvailable: [],
  });

  // Handler for adding new items to array fields
  const handleAddField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  // Handler for removing items from array fields
  const handleRemoveField = (field, index) => {
    const updatedField = [...formData[field]];
    updatedField.splice(index, 1);
    setFormData({
      ...formData,
      [field]: updatedField,
    });
  };

  // Handler for updating form input values
  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = e.target.value;
      setFormData({
        ...formData,
        [field]: updatedArray,
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  // Handler for experience object fields
  const handleExperienceChange = (e, index, field) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = e.target.value;
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  return (
    <form className="mx-auto bg-white p-8 rounded-xl shadow-lg">
      {/* Personal Information */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputBox _name="First Name" type="text" value={formData.firstname} onChange={(e) => handleChange(e, 'firstname')} />
        <InputBox _name="Last Name" type="text" value={formData.lastname} onChange={(e) => handleChange(e, 'lastname')} />
        <InputBox _name="Phone" type="tel" value={formData.phone} onChange={(e) => handleChange(e, 'phone')} />
        <InputBox _name="Address" type="text" value={formData.address} onChange={(e) => handleChange(e, 'address')} />
      </div>

      {/* Professional Information */}
      <div className="mb-6">
        <InputBox _name="Description" type="text" value={formData.description} onChange={(e) => handleChange(e, 'description')} />
        <InputBox _name="Specialty" type="text" value={formData.specialty} onChange={(e) => handleChange(e, 'specialty')} />
        <InputBox _name="Years of Experience" type="number" value={formData.yearsExperience} onChange={(e) => handleChange(e, 'yearsExperience')} />
        <InputBox _name="Fees" type="number" value={formData.fees} onChange={(e) => handleChange(e, 'fees')} />
      </div>

      {/* Dynamic Fields for Array Types */}
     <div className='grid grid-cols-2'>
     {['services', 'education', 'specializations', 'languages', 'otherLocations'].map((field) => (
        <div className="mb-6" key={field}>
          <label className="block text-sm font-medium text-[#023e7d]">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          {formData[field].map((value, index) => (
            <div className="flex items-center gap-2 mb-2 w-full" key={index}>
              <InputBox
              cls="w-full bg-yellow-34"
                type="text"
                value={value}
                onChange={(e) => handleChange(e, field, index)}
                placeholder={`Enter ${field.slice(0, -1)}`}
              />
              <Button onClick={() => handleRemoveField(field, index)} type="button" className="bg-red-500 text-white">X</Button>
            </div>
          ))}
          <Button onClick={() => handleAddField(field)} type="button" className="bg-[#023e7d] text-white">Add {field.slice(0, -1)}</Button>
        </div>
      ))}
     </div>

      {/* Experience Section */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Experience</label>
        {formData.experience.map((exp, index) => (
          <div className="flex justify-between gap-5 items-end" key={index}>
            <InputBox
              _name="Year Start"
              type="number"
              value={exp.yearStart}
              onChange={(e) => handleExperienceChange(e, index, 'yearStart')}
            />
            <InputBox
              _name="Year End"
              type="number"
              value={exp.yearEnd}
              onChange={(e) => handleExperienceChange(e, index, 'yearEnd')}
            />
            <InputBox
              _name="Position"
              type="text"
              value={exp.position}
              onChange={(e) => handleExperienceChange(e, index, 'position')}
            />
            <InputBox
              _name="Hospital"
              type="text"
              value={exp.hospital}
              onChange={(e) => handleExperienceChange(e, index, 'hospital')}
            />
            <Button onClick={() => handleRemoveField('experience', index)} type="button" className="bg-red-500 mb-2 text-white">X</Button>
          </div>
        ))}
        <Button onClick={() => handleAddField('experience')} type="button" className="bg-[#023e7d] text-white mt-2">Add Experience</Button>
      </div>

      {/* Days Available Section */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Days Available</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <label key={day} className="inline-flex items-center">
              <input
                type="checkbox"
                value={day}
                checked={formData.daysAvailable.includes(day)}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setFormData((prevData) => ({
                    ...prevData,
                    daysAvailable: checked
                      ? [...prevData.daysAvailable, value]
                      : prevData.daysAvailable.filter((day) => day !== value),
                  }));
                }}
                className="mr-2"
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <Button type="submit" className="w-full bg-[#023e7d] text-white py-2">Save Doctor Details</Button>
      </div>
    </form>
  );
};

export default DoctorDetailsForm;
