// import Layout from "@/components/dashboard/DashboardLayout";
// // import { DatePicker } from "@/components/shared/DatePicker";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { bookAppointment } from "@/utils/api-calls";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import DatePickerBox from "@/components/shared/DatePicker";

// const Appointment = () => {
//   const user = useSelector((state) => state?.userInfo?.user);
//   const { doctorId } = useParams();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [endTime, setEndTime] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [address, setAddress] = useState({
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//   });
//   const [medicalHistory, setMedicalHistory] = useState([
//     { condition: "", diagnosisDate: "", treatment: "", currentStatus: "" },
//   ]);
//   const [medications, setMedications] = useState([
//     {
//       name: "",
//       dosage: "",
//       frequency: "",
//       startDate: "",
//       endDate: "",
//       prescribingDoctor: "",
//     },
//   ]);
//   const [allergies, setAllergies] = useState([
//     { allergen: "", reaction: "", severity: "", firstObserved: "" },
//   ]);
//   const [emergencyContact, setEmergencyContact] = useState({
//     name: "",
//     relationship: "",
//     phone: "",
//     email: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let currentPatientId = null;
//     if (user.userType === "admin") {
//       // If userType is admin, the admin acts as a patient
//       currentPatientId = user?.adminId
//     } else if (user.userType === "patient") {
//       // If userType is patient, find patient data
//       currentPatientId = user?.patientId;
//     }
//     const appointmentData = {
//       address,
//       medicalHistory,
//       medications,
//       allergies,
//       emergencyContact,
//       endTime,
//       startTime,
//       doctorId,
//       patientId: currentPatientId ,
//     };

//     const response = await bookAppointment(appointmentData);
//     if (response.success) {
//       toast.success(response.message);
//       navigate("/"); // Navigate to the patient list or details page
//     } else {
//       toast.success(response.message);
//     }
//   };

//   const renderStep1 = () => (
//     <>
      
//       <div className="mt-5">
//         <Label htmlFor="address" className="text-[#023e7d]">
//           Address
//         </Label>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             id="street"
//             value={address.street}
//             onChange={(e) => setAddress({ ...address, street: e.target.value })}
//             placeholder="Street"
//           />
//           <Input
//             id="city"
//             value={address.city}
//             onChange={(e) => setAddress({ ...address, city: e.target.value })}
//             placeholder="City"
//           />
//           <Input
//             id="state"
//             value={address.state}
//             onChange={(e) => setAddress({ ...address, state: e.target.value })}
//             placeholder="State"
//           />
//           <Input
//             id="zip"
//             value={address.zip}
//             onChange={(e) => setAddress({ ...address, zip: e.target.value })}
//             placeholder="ZIP Code"
//           />
//           <Input
//             id="country"
//             value={address.country}
//             onChange={(e) =>
//               setAddress({ ...address, country: e.target.value })
//             }
//             placeholder="Country"
//           />
//         </div>
//       </div>
//       <div className="mt-5">
//         <Label htmlFor="emergencyContact" className="text-[#023e7d]">
//           Emergency Contact
//         </Label>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             id="emergencyContactName"
//             value={emergencyContact.name}
//             onChange={(e) =>
//               setEmergencyContact({
//                 ...emergencyContact,
//                 name: e.target.value,
//               })
//             }
//             placeholder="Name"
//           />
//           <Input
//             id="emergencyContactRelationship"
//             value={emergencyContact.relationship}
//             onChange={(e) =>
//               setEmergencyContact({
//                 ...emergencyContact,
//                 relationship: e.target.value,
//               })
//             }
//             placeholder="Relationship"
//           />
//           <Input
//             id="emergencyContactPhone"
//             value={emergencyContact.phone}
//             onChange={(e) =>
//               setEmergencyContact({
//                 ...emergencyContact,
//                 phone: e.target.value,
//               })
//             }
//             placeholder="Phone"
//           />
//           <Input
//             id="emergencyContactEmail"
//             value={emergencyContact.email}
//             onChange={(e) =>
//               setEmergencyContact({
//                 ...emergencyContact,
//                 email: e.target.value,
//               })
//             }
//             placeholder="Email"
//           />
//         </div>
//       </div>
//       <Button
//         onClick={() => setStep(2)}
//         className="w-full bg-[#023e7d] text-white hover:bg-[#023e7d]/90 mt-10"
//       >
//         Next Step
//       </Button>
//     </>
//   );

//   const renderStep2 = () => (
//     <>
//       <div className="flex gap-5">
//         <div className="flex gap-1 flex-col flex-1">
//           <label htmlFor="start-date" className="text-[#023e7d]">
//             Start Date | Time
//           </label>
//           <DatePickerBox
//             value={startTime}
//             onChange={(selctedTime) => setStartTime(selctedTime)}
//             type="date-time"
//           />
//         </div>
//         <div className="flex gap-1 flex-col flex-1">
//           <label htmlFor="end-date" className="text-[#023e7d]">
//             End Date |Time
//           </label>
//           <DatePickerBox
//             value={endTime}
//             onChange={(selctedTime) => setEndTime(selctedTime)}
//             type="date-time"
//           />
//         </div>
//       </div>
//       <div className="mt-5">
//         <Label htmlFor="medicalHistory" className="text-[#023e7d]">
//           Medical History
//         </Label>
//         {medicalHistory.map((item, index) => (
//           <Card key={index} className="p-4 mb-4 bg-gray-100">
//             <div className="grid grid-cols-1 gap-4">
//               <Input
//                 value={item.condition}
//                 onChange={(e) => {
//                   const updatedHistory = [...medicalHistory];
//                   updatedHistory[index].condition = e.target.value;
//                   setMedicalHistory(updatedHistory);
//                 }}
//                 placeholder="Condition"
//               />
//               {/* Use a date picker component here */}
//               <Input
//                 value={item.treatment}
//                 onChange={(e) => {
//                   const updatedHistory = [...medicalHistory];
//                   updatedHistory[index].treatment = e.target.value;
//                   setMedicalHistory(updatedHistory);
//                 }}
//                 placeholder="Treatment"
//               />
//               <Input
//                 value={item.currentStatus}
//                 onChange={(e) => {
//                   const updatedHistory = [...medicalHistory];
//                   updatedHistory[index].currentStatus = e.target.value;
//                   setMedicalHistory(updatedHistory);
//                 }}
//                 placeholder="Current Status"
//               />
//             </div>
//           </Card>
//         ))}
//       </div>
//       <div className="mt-5">
//         <Label htmlFor="medications" className="text-[#023e7d]">
//           Medications
//         </Label>
//         {medications.map((item, index) => (
//           <Card key={index} className="p-4 mb-4 bg-gray-100">
//             <div className="grid grid-cols-1 gap-4">
//               <Input
//                 value={item.name}
//                 onChange={(e) => {
//                   const updatedMedications = [...medications];
//                   updatedMedications[index].name = e.target.value;
//                   setMedications(updatedMedications);
//                 }}
//                 placeholder="Medication Name"
//               />
//               <Input
//                 value={item.dosage}
//                 onChange={(e) => {
//                   const updatedMedications = [...medications];
//                   updatedMedications[index].dosage = e.target.value;
//                   setMedications(updatedMedications);
//                 }}
//                 placeholder="Dosage"
//               />
//               <Input
//                 value={item.frequency}
//                 onChange={(e) => {
//                   const updatedMedications = [...medications];
//                   updatedMedications[index].frequency = e.target.value;
//                   setMedications(updatedMedications);
//                 }}
//                 placeholder="Frequency"
//               />
//               {/* Use date picker components here /}
//                   <Input
//                   value={item.prescribingDoctor}
//                   onChange={(e) => {
//                   const updatedMedications = [...medications];
//                   updatedMedications[index].prescribingDoctor = e.target.value;
//                   setMedications(updatedMedications);
//                   }}
//                   placeholder="Prescribing Doctor"
//                   />
//                   </div>
//                   </Card>
//                   ))}
//                   </div>
//                   <div>
//                   <Label htmlFor="allergies" className="text-[#023e7d]">Allergies</Label>
//                   {allergies.map((item, index) => (
//                   <Card key={index} className="p-4 mb-4 bg-gray-100">
//                   <div className="grid grid-cols-1 gap-4">
//                   <Input
//                   value={item.allergen}
//                   onChange={(e) => {
//                   const updatedAllergies = [...allergies];
//                   updatedAllergies[index].allergen = e.target.value;
//                   setAllergies(updatedAllergies);
//                   }}
//                   placeholder="Allergen"
//                   />
//                   <Input
//                   value={item.reaction}
//                   onChange={(e) => {
//                   const updatedAllergies = [...allergies];
//                   updatedAllergies[index].reaction = e.target.value;
//                   setAllergies(updatedAllergies);
//                   }}
//                   placeholder="Reaction"
//                   />
//                   <Input
//                   value={item.severity}
//                   onChange={(e) => {
//                   const updatedAllergies = [...allergies];
//                   updatedAllergies[index].severity = e.target.value;
//                   setAllergies(updatedAllergies);
//                   }}
//                   placeholder="Severity"
//                   />
//                   {/ Use a date picker component here */}
//             </div>
//           </Card>
//         ))}
//       </div>
//       <div className="flex justify-between gap-5 mt-5">
//         <Button
//           onClick={() => setStep(1)}
//           className="w-full bg-gray-500 hover:bg-gray-800 text-white hover
//                   "
//         >
//           Previous Step
//         </Button>
//         <Button
//           type="submit"
//           className="w-full  text-white bg-[#023e7d] hover:bg-[#023e7d]/90"
//         >
//           Submit
//         </Button>
//       </div>
//     </>
//   );

//   return (
//     <Layout>
//       <div className="container mx-auto">
//         <h1 className="text-3xl font-semibold pb-2 border-b-2 mb-10 text-[#023e7d]">
//           Book Appointment
//         </h1>
//         <Card className="p-6 bg-white">
//           <form onSubmit={handleSubmit}>
//             {step === 1 && renderStep1()}
//             {step === 2 && renderStep2()}
//           </form>
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default Appointment;



import Layout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePickerBox from "@/components/shared/DatePicker";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bookAppointment } from "@/utils/api-calls";

const Appointment = () => {
  const user = useSelector((state) => state?.userInfo?.user);
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
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

    let currentPatientId = null;
    if (user.userType === "admin") {
      currentPatientId = user?.adminId;
    } else if (user.userType === "patient") {
      currentPatientId = user?.patientId;
    }

    const appointmentData = {
      address,
      medicalHistory,
      medications,
      allergies,
      emergencyContact,
      endTime,
      startTime,
      doctorId,
      patientId: currentPatientId,
    };

    
    
    const response = await bookAppointment(appointmentData);
    console.log(response.success)
    alert("Appointment completed, wait to doctor approve")

    if (response.success) {
      console.log(response)
      // toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };

  const renderStep1 = () => (
    <>
      <div className="mt-5">
        <Label htmlFor="address" className="text-[#023e7d]">
          Address
        </Label>
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
        <Label htmlFor="emergencyContact" className="text-[#023e7d]">
          Emergency Contact
        </Label>
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
        className="w-full bg-[#023e7d] text-white hover:bg-[#023e7d]/90 mt-10"
      >
        Next Step
      </Button>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="flex gap-5">
        <div className="flex gap-1 flex-col flex-1">
          <Label htmlFor="start-time" className="text-[#023e7d]">
            Start Date | Time
          </Label>
          <DatePickerBox
            value={startTime}
            onChange={(selectedTime) => setStartTime(selectedTime)}
            type="date-time"
          />
        </div>
        <div className="flex gap-1 flex-col flex-1">
          <Label htmlFor="end-time" className="text-[#023e7d]">
            End Date | Time
          </Label>
          <DatePickerBox
            value={endTime}
            onChange={(selectedTime) => setEndTime(selectedTime)}
            type="date-time"
          />
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="medicalHistory" className="text-[#023e7d]">
          Medical History
        </Label>
        {medicalHistory.map((item, index) => (
          <Card key={index} className="p-4 mb-4 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={item.condition}
                onChange={(e) => {
                  const updatedHistory = [...medicalHistory];
                  updatedHistory[index].condition = e.target.value;
                  setMedicalHistory(updatedHistory);
                }}
                placeholder="Condition"
              />
              
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
        <Label htmlFor="medications" className="text-[#023e7d]">
          Medications
        </Label>
        {medications.map((item, index) => (
          <Card key={index} className="p-4 mb-4 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <Input
                value={item.prescribingDoctor}
                onChange={(e) => {
                  const updatedMedications = [...medications];
                  updatedMedications[index].prescribingDoctor =
                    e.target.value;
                  setMedications(updatedMedications);
                }}
                placeholder="Prescribing Doctor"
              />
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-5">
        <Label htmlFor="allergies" className="text-[#023e7d]">
          Allergies
        </Label>
        {allergies.map((item, index) => (
          <Card key={index} className="p-4 mb-4 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
             
            </div>
          </Card>
        ))}
      </div>
      <div className="flex gap-5 justify-center mt-5">
      <Button
          onClick={() => setStep(1)}
          className=" bg-gray-500 hover:bg-gray-800 text-white hover"
        >
          Previous Step
        </Button>
      <Button
        onClick={()=> setStep(3)}
        className="bg-[#023e7d] text-white hover:bg-[#023e7d]/90"
      >
        Next Step
      </Button>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="mt-5 flex justify-center">
        <Label htmlFor="confirmation" className="text-[#023e7d] text-center">
          Review and Confirm Your Details
        </Label>
        {/* Display all the collected data for review */}
      </div>

      <div className="flex gap-5 justify-center mt-5">
      <Button
          onClick={() => setStep(2)}
          className=" bg-gray-500 hover:bg-gray-800 text-white hover"
        >
          Previous Step
        </Button>
      <Button
        onClick={handleSubmit}
        className="bg-[#023e7d] text-white hover:bg-[#023e7d]/90"
      >
        Book Appointment
      </Button>
      </div>
    </>
  );

  return (
    <Layout>
      <div className="mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold text-[#023e7d] mb-5">
          Book Appointment
        </h1>
        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </form>
      </div>
    </Layout>
  );
};

export default Appointment;
