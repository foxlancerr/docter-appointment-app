// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import HomeLayout from "../HomeLayout";
// import Layout from "../dashboard/DashboardLayout";
// import { BACKEND_API_URL } from "@/constants";

// function PatientDetailComponent() {
//   const { id } = useParams();
//   const [patientDetail, setPatientDetail] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   console.log(id)

//   useEffect(() => {
//     const fetchPatientDetail = async () => {
//       try {
//         const response = await axios.get(
//           `${BACKEND_API_URL}/api/v1/patients/${id}`
//         ); // Adjust the URL as needed

//         if (response.data.data) {
//           setPatientDetail(response.data.data);
//         } else {
//           throw new Error("No data found for this patient.");
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientDetail();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         <div className="text-center">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         <div className="text-center">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!patientDetail) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         <div className="text-center">No patient details available.</div>
//       </div>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container mx-auto p-3">
//         {/* Main Content */}
//         <div className="grid grid-cols-2 gap-6">
//           <Card className="shadow-lg p-6 bg-white">
//             <div className="w-24 h-24 mx-auto rounded-full border-2 border-gray-500 overflow-hidden object-cover object-center">
//               <img
//                 src={patientDetail?.profileImage}
//                 alt=""
//                 className="w-full"
//               />
//             </div>
//             <div>
//               <div>
//                 <CardTitle className="text-2xl font-semibold text-[#023e7d]">
//                   {patientDetail?.name}
//                 </CardTitle>
//               </div>
//               <div className="mt-3">
//                 <div className="text-gray-700 text-sm">
//                   <p>
//                     <strong>Gender:</strong> {patientDetail?.gender}
//                   </p>
//                   <p>
//                     <strong>DOB:</strong>{" "}
//                     {new Date(patientDetail?.dateOfBirth).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {patientDetail?.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {patientDetail?.phone}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {patientDetail?.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {patientDetail?.phone}
//                   </p>
//                 </div>
//                 <div className="text-gray-700">
//                   <p>
//                     <strong>Address:</strong> {patientDetail?.address?.street},{" "}
//                     {patientDetail?.address?.city},{" "}
//                     {patientDetail?.address?.state},{" "}
//                     {patientDetail?.address?.zip},{" "}
//                     {patientDetail?.address?.country}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           <Card className="shadow-lg p-6 bg-white">
//             <div className="mb-3">
//               <CardTitle className="text-xl font-semibold text-[#023e7d]">
//                 Medical History
//               </CardTitle>
//             </div>
//             <div>
//               <ul className="space-y-4">
//                 {patientDetail?.medicalHistory?.map((history, index) => (
//                   <li key={index} className="text-gray-700 text-sm">
//                     <p>
//                       <strong>Condition:</strong> {history.condition}
//                     </p>
//                     <p>
//                       <strong>Diagnosis Date:</strong>{" "}
//                       {new Date(history.diagnosisDate).toLocaleDateString()}
//                     </p>
//                     <p>
//                       <strong>Treatment:</strong> {history.treatment}
//                     </p>
//                     <p>
//                       <strong>Status:</strong> {history.currentStatus}
//                     </p>

//                     {index !== 1 &&
//                       patientDetail?.medicalHistory.length > 1 && (
//                         <hr className="mt-3" />
//                       )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </Card>

//           <Card className="shadow-lg p-6 bg-white">
//             <div className="mb-3">
//               <CardTitle className="text-xl font-semibold text-[#023e7d]">
//                 Medications
//               </CardTitle>
//             </div>
//             <div>
//               <ul className="space-y-4 text-sm">
//                 {patientDetail?.medications?.map((medication, index) => (
//                   <li key={index} className="text-gray-700">
//                     <p>
//                       <strong>Name:</strong> {medication.name}
//                     </p>
//                     <p>
//                       <strong>Dosage:</strong> {medication.dosage}
//                     </p>
//                     <p>
//                       <strong>Frequency:</strong> {medication.frequency}
//                     </p>
//                     <p>
//                       <strong>Start Date:</strong>{" "}
//                       {new Date(medication.startDate).toLocaleDateString()}
//                     </p>
//                     <p>
//                       <strong>End Date:</strong>{" "}
//                       {medication.endDate
//                         ? new Date(medication.endDate).toLocaleDateString()
//                         : "Ongoing"}
//                     </p>
//                     <p>
//                       <strong>Prescribing Doctor:</strong>{" "}
//                       {medication.prescribingDoctor}
//                     </p>

//                     {index !== 1 && patientDetail?.medications.length > 1 && (
//                       <hr className="mt-3" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </Card>

//           <Card className="shadow-lg p-6 bg-white">
//             <div className="mb-3">
//               <CardTitle className="text-xl font-semibold text-[#023e7d]">
//                 Allergies
//               </CardTitle>
//             </div>
//             <div>
//               <ul className="space-y-4 text-sm">
//                 {patientDetail?.allergies?.map((allergy, index) => (
//                   <li key={index} className="text-gray-700">
//                     <p>
//                       <strong>Allergen:</strong> {allergy.allergen}
//                     </p>
//                     <p>
//                       <strong>Reaction:</strong> {allergy.reaction}
//                     </p>
//                     <p>
//                       <strong>Severity:</strong> {allergy.severity}
//                     </p>
//                     <p>
//                       <strong>First Observed:</strong>{" "}
//                       {new Date(allergy.firstObserved).toLocaleDateString()}
//                     </p>
//                     {index !== 1 && patientDetail?.allergies.length > 1 && (
//                       <hr className="mt-3" />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </Card>

//           <Card className="shadow-lg p-6 bg-white">
//             <div className="mb-3">
//               <CardTitle className="text-xl font-semibold text-[#023e7d]">
//                 Vital Signs
//               </CardTitle>
//             </div>
//             <div className="text-sm">
//               <p className="text-gray-700">
//                 <strong>Blood Pressure:</strong>{" "}
//                 {patientDetail?.vitalSigns?.bloodPressure?.systolic}/
//                 {patientDetail?.vitalSigns?.bloodPressure?.diastolic} mmHg
//               </p>
//               <p className="text-gray-700">
//                 <strong>Heart Rate:</strong>{" "}
//                 {patientDetail?.vitalSigns?.heartRate} bpm
//               </p>
//               <p className="text-gray-700">
//                 <strong>Temperature:</strong>{" "}
//                 {patientDetail?.vitalSigns?.temperature} °F
//               </p>
//               <p className="text-gray-700">
//                 <strong>Weight:</strong> {patientDetail?.vitalSigns?.weight} kg
//               </p>
//               <p className="text-gray-700">
//                 <strong>Height:</strong> {patientDetail?.vitalSigns?.height} cm
//               </p>
//             </div>
//           </Card>

//           <Card className="shadow-lg p-6 bg-white">
//             <div className="mb-3">
//               <CardTitle className="text-xl font-semibold text-[#023e7d]">
//                 Emergency Contact
//               </CardTitle>
//             </div>
//             <div className="text-sm">
//               <p className="text-gray-700">
//                 <strong>Name:</strong> {patientDetail?.emergencyContact?.name}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Relationship:</strong>{" "}
//                 {patientDetail?.emergencyContact?.relationship}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Phone:</strong> {patientDetail?.emergencyContact?.phone}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Email:</strong> {patientDetail?.emergencyContact?.email}
//               </p>
//             </div>
//           </Card>
//         </div>

//         {/* Sidebar (if needed) */}
//         {/* <div className="hidden md:block">
//             <Card className="shadow-lg p-6 bg-white">
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold text-[#023e7d]">Additional Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700">Here you can include any additional information or notes relevant to the patient.</p>
//               </CardContent>
//             </Card>
//           </div> */}
//       </div>
//     </Layout>
//   );
// }

// export default PatientDetailComponent;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import { BACKEND_API_URL } from "@/constants";
import HomeLayout from "../HomeLayout";
import Layout from "../dashboard/DashboardLayout";
import { useSelector } from "react-redux";
import { Switch } from "../ui/switch";
import toast from "react-hot-toast";

function PatientDetailComponent() {
  const { id } = useParams();
  const [patientDetail, setPatientDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authenticUser = useSelector((state) => state?.userInfo?.user);

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/api/v1/patients/${id}`
        );
        if (response.data.data) {
          setPatientDetail(response.data.data);
        } else {
          throw new Error("No data found for this patient.");
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetail();
  }, [id]);

  const getCellStyle = (isApproved) => {
    return isApproved
      ? "bg-green-300/90 text-green-700"
      : "bg-blue-300/90 text-blue-700";
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_API_URL}/api/v1/patients/${id}`
      );
      if (response.status === 200) {
        toast.success("Patient deleted successfully");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleToggleApproval = async (id) => {
    try {
      const response = await Axios.patch(
        `${BACKEND_API_URL}/api/v1/auth/approve/${id}`
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Update the user state with the new isAdminVerifyTheUser value
        setPatientDetail((prevUser) => ({
          ...prevUser,
          isAdminVerifyTheUser: !prevUser.isAdminVerifyTheUser,
        }));
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  

  return (
    <Layout>
      <Box p={3}>
      {authenticUser && (
          <div
            className={`mb-4 h-auto py-3 font-semibold text-center rounded-md text-xl ${
              authenticUser.isAdminVerifyTheUser
                ? "text-white  bg-green-400"
                : "bg-yellow-300"
            } `}
          >
            {authenticUser?.isAdminVerifyTheUser ? "Verified Users" : "Unverified Users"}
          </div>
        )}

        
{authenticUser?.userType == "admin" && (
          <div className="flex justify-end">
            <div className="flex gap-3 items-center">
              <p className="mb-3 font-semibold">
                {!authenticUser?.isAdminVerifyTheUser ? "verify ON" : "Verify OFF"}
              </p>
              <p
                className={`px-5 py-2 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                  authenticUser?.isProfileComplete
                )} text-center`}
              >
                <Switch
                  id={`switch-${authenticUser?._id}`}
                  checked={authenticUser?.isAdminVerifyTheUser}
                  onCheckedChange={() => handleToggleApproval(authenticUser?._id)}
                />
              </p>
            </div>
            <button
              onClick={handleDelete}
              className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Delete
            </button>
          </div>
        )}
        <Grid container spacing={3}>
          {/* Patient Details Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    alt={patientDetail?.name}
                    src={patientDetail?.auth?.profileImage}
                    sx={{ width: 72, height: 72, bgcolor: "#023e7d" }}
                  />
                }
                title={
                  <Typography variant="h6" color="#023e7d">
                    {patientDetail?.name}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2">
                  <strong>Gender:</strong> {patientDetail?.gender}
                </Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {patientDetail?.firstname} {patientDetail.lastname}
                </Typography>
                <Typography variant="body2">
                  <strong>DOB:</strong>{" "}
                  {new Date(patientDetail?.dateOfBirth).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {patientDetail?.auth?.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {patientDetail?.phone}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Address:</strong> {patientDetail?.address?.street},{" "}
                  {patientDetail?.address?.city},{" "}
                  {patientDetail?.address?.state},{" "}
                  {patientDetail?.address?.zip},{" "}
                  {patientDetail?.address?.country}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Medical History Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Medical History
                  </Typography>
                }
              />
              <CardContent>
                {patientDetail?.medicalHistory?.map((history, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="body2">
                      <strong>Condition:</strong> {history.condition}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Diagnosis Date:</strong>{" "}
                      {new Date(history.diagnosisDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Treatment:</strong> {history.treatment}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong> {history.currentStatus}
                    </Typography>
                    {index !== patientDetail?.medicalHistory.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Medications Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Medications
                  </Typography>
                }
              />
              <CardContent>
                {patientDetail?.medications?.map((medication, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="body2">
                      <strong>Name:</strong> {medication.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Dosage:</strong> {medication.dosage}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Frequency:</strong> {medication.frequency}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Start Date:</strong>{" "}
                      {new Date(medication.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>End Date:</strong>{" "}
                      {medication.endDate
                        ? new Date(medication.endDate).toLocaleDateString()
                        : "Ongoing"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Prescribing Doctor:</strong>{" "}
                      {medication.prescribingDoctor}
                    </Typography>
                    {index !== patientDetail?.medications.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Allergies Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Allergies
                  </Typography>
                }
              />
              <CardContent>
                {patientDetail?.allergies?.map((allergy, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="body2">
                      <strong>Allergen:</strong> {allergy.allergen}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Reaction:</strong> {allergy.reaction}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Severity:</strong> {allergy.severity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>First Observed:</strong>{" "}
                      {new Date(allergy.firstObserved).toLocaleDateString()}
                    </Typography>
                    {index !== patientDetail?.allergies.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Vital Signs Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Vital Signs
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2">
                  <strong>Blood Pressure:</strong>{" "}
                  {patientDetail?.vitalSigns?.bloodPressure?.systolic}/
                  {patientDetail?.vitalSigns?.bloodPressure?.diastolic} mmHg
                </Typography>
                <Typography variant="body2">
                  <strong>Heart Rate:</strong>{" "}
                  {patientDetail?.vitalSigns?.heartRate} bpm
                </Typography>
                <Typography variant="body2">
                  <strong>Temperature:</strong>{" "}
                  {patientDetail?.vitalSigns?.temperature} °F
                </Typography>
                <Typography variant="body2">
                  <strong>Weight:</strong> {patientDetail?.vitalSigns?.weight} kg
                </Typography>
                <Typography variant="body2">
                  <strong>Height:</strong> {patientDetail?.vitalSigns?.height} cm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Emergency Contact Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Emergency Contact
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2">
                  <strong>Name:</strong> {patientDetail?.emergencyContact?.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Relationship:</strong>{" "}
                  {patientDetail?.emergencyContact?.relationship}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {patientDetail?.emergencyContact?.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Address:</strong> {patientDetail?.emergencyContact?.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Admin Section - Visible only for admin users */}
          {patientDetail?.userType === "admin" && (
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6" color="#023e7d">
                      Admin Actions
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2">
                    <strong>Status:</strong> {patientDetail?.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Verification Date:</strong>{" "}
                    {new Date(patientDetail?.verificationDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

      </Box>
    </Layout>
  );
}

export default PatientDetailComponent;
