import Layout from "@/components/dashboard/DashboardLayout";
// import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookAppointment } from "@/utils/api-calls";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DatePickerBox from "@/components/shared/DatePicker";

const Appointment = () => {
  const user = useSelector((state) => state?.userInfo?.user);
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [medicalHistory, setMedicalHistory] = useState([
    { condition: "", diagnosisDate: "", treatment: "", currentStatus: "" },
  ]);
  const [medications, setMedications] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: "",
      prescribingDoctor: "",
    },
  ]);
  const [allergies, setAllergies] = useState([
    { allergen: "", reaction: "", severity: "", firstObserved: "" },
  ]);
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      medicalHistory,
      medications,
      allergies,
      emergencyContact,
      endTime,
      startTime,
      doctorId,
      patientId: user?._id,
    };

    const response = await bookAppointment(appointmentData);
    if (response.success) {
      toast.success(response.message);
      navigate("/"); // Navigate to the patient list or details page
    } else {
      toast.success(response.message);
    }
  };

  const renderStep1 = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div>
          <div className="flex gap-1 flex-col flex-1">
            <label htmlFor="start-date">Date of Birth</label>
            <DatePickerBox
              value={dateOfBirth}
              onChange={(selctedDate) => setDateOfBirth(selctedDate)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" value={gender} onValueChange={setGender} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="address">Address</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            placeholder="Street"
          />
          <Input
            id="city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            placeholder="City"
          />
          <Input
            id="state"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            placeholder="State"
          />
          <Input
            id="zip"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            placeholder="ZIP Code"
          />
          <Input
            id="country"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            placeholder="Country"
          />
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="emergencyContact">Emergency Contact</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="emergencyContactName"
            value={emergencyContact.name}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                name: e.target.value,
              })
            }
            placeholder="Name"
          />
          <Input
            id="emergencyContactRelationship"
            value={emergencyContact.relationship}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                relationship: e.target.value,
              })
            }
            placeholder="Relationship"
          />
          <Input
            id="emergencyContactPhone"
            value={emergencyContact.phone}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                phone: e.target.value,
              })
            }
            placeholder="Phone"
          />
          <Input
            id="emergencyContactEmail"
            value={emergencyContact.email}
            onChange={(e) =>
              setEmergencyContact({
                ...emergencyContact,
                email: e.target.value,
              })
            }
            placeholder="Email"
          />
        </div>
      </div>
      <Button
        onClick={() => setStep(2)}
        className="w-full bg-blue-500 text-white hover:bg-blue-600 mt-10"
      >
        Next Step
      </Button>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="flex gap-5">
        <div className="flex gap-1 flex-col flex-1">
          <label htmlFor="start-date">Start Date | Time</label>
          <DatePickerBox
            value={startTime}
            onChange={(selctedTime) => setStartTime(selctedTime)}
            type="time"
          />
        </div>
        <div className="flex gap-1 flex-col flex-1">
          <label htmlFor="end-date">End Date |Time</label>
          <DatePickerBox
            value={endTime}
            onChange={(selctedTime) => setEndTime(selctedTime)}
            type="time"
          />
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="medicalHistory">Medical History</Label>
        {medicalHistory.map((item, index) => (
          <Card key={index} className="p-4 mb-4 bg-gray-100">
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={item.condition}
                onChange={(e) => {
                  const updatedHistory = [...medicalHistory];
                  updatedHistory[index].condition = e.target.value;
                  setMedicalHistory(updatedHistory);
                }}
                placeholder="Condition"
              />
              {/* Use a date picker component here */}
              <Input
                value={item.treatment}
                onChange={(e) => {
                  const updatedHistory = [...medicalHistory];
                  updatedHistory[index].treatment = e.target.value;
                  setMedicalHistory(updatedHistory);
                }}
                placeholder="Treatment"
              />
              <Input
                value={item.currentStatus}
                onChange={(e) => {
                  const updatedHistory = [...medicalHistory];
                  updatedHistory[index].currentStatus = e.target.value;
                  setMedicalHistory(updatedHistory);
                }}
                placeholder="Current Status"
              />
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-5">
        <Label htmlFor="medications">Medications</Label>
        {medications.map((item, index) => (
          <Card key={index} className="p-4 mb-4 bg-gray-100">
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={item.name}
                onChange={(e) => {
                  const updatedMedications = [...medications];
                  updatedMedications[index].name = e.target.value;
                  setMedications(updatedMedications);
                }}
                placeholder="Medication Name"
              />
              <Input
                value={item.dosage}
                onChange={(e) => {
                  const updatedMedications = [...medications];
                  updatedMedications[index].dosage = e.target.value;
                  setMedications(updatedMedications);
                }}
                placeholder="Dosage"
              />
              <Input
                value={item.frequency}
                onChange={(e) => {
                  const updatedMedications = [...medications];
                  updatedMedications[index].frequency = e.target.value;
                  setMedications(updatedMedications);
                }}
                placeholder="Frequency"
              />
              {/* Use date picker components here /}
                  <Input
                  value={item.prescribingDoctor}
                  onChange={(e) => {
                  const updatedMedications = [...medications];
                  updatedMedications[index].prescribingDoctor = e.target.value;
                  setMedications(updatedMedications);
                  }}
                  placeholder="Prescribing Doctor"
                  />
                  </div>
                  </Card>
                  ))}
                  </div>
                  <div>
                  <Label htmlFor="allergies">Allergies</Label>
                  {allergies.map((item, index) => (
                  <Card key={index} className="p-4 mb-4 bg-gray-100">
                  <div className="grid grid-cols-1 gap-4">
                  <Input
                  value={item.allergen}
                  onChange={(e) => {
                  const updatedAllergies = [...allergies];
                  updatedAllergies[index].allergen = e.target.value;
                  setAllergies(updatedAllergies);
                  }}
                  placeholder="Allergen"
                  />
                  <Input
                  value={item.reaction}
                  onChange={(e) => {
                  const updatedAllergies = [...allergies];
                  updatedAllergies[index].reaction = e.target.value;
                  setAllergies(updatedAllergies);
                  }}
                  placeholder="Reaction"
                  />
                  <Input
                  value={item.severity}
                  onChange={(e) => {
                  const updatedAllergies = [...allergies];
                  updatedAllergies[index].severity = e.target.value;
                  setAllergies(updatedAllergies);
                  }}
                  placeholder="Severity"
                  />
                  {/ Use a date picker component here */}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between gap-5 mt-5">
        <Button
          onClick={() => setStep(1)}
          className="w-full bg-gray-500 hover:bg-gray-800 text-white hover
                  "
        >
          Previous Step
        </Button>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </Button>
      </div>
    </>
  );

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold pb-2 border-b-2 mb-10">
          Book Appointment
        </h1>
        <Card className="p-6 bg-white">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Appointment;
