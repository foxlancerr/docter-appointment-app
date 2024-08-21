import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import HomeLayout from "../HomeLayout";
import Layout from "../dashboard/DashboardLayout";

function PatientDetailComponent() {
  const { id } = useParams();
  const [patientDetail, setPatientDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/patients/${id}`
        ); // Adjust the URL as needed

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <div className="text-center">Error: {error}</div>
      </div>
    );
  }

  if (!patientDetail) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="text-center">No patient details available.</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-3">
        {/* Main Content */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="shadow-lg p-6 bg-white">
            <div className="w-24 h-24 mx-auto rounded-full border-2 border-gray-500 overflow-hidden object-cover object-center">
              <img
                src={patientDetail?.profileImage}
                alt=""
                className="w-full"
              />
            </div>
            <div>
              <div>
                <CardTitle className="text-2xl font-semibold text-[#023e7d]">
                  {patientDetail?.name}
                </CardTitle>
              </div>
              <div className="mt-3">
                <div className="text-gray-700 text-sm">
                  <p>
                    <strong>Gender:</strong> {patientDetail?.gender}
                  </p>
                  <p>
                    <strong>DOB:</strong>{" "}
                    {new Date(patientDetail?.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Email:</strong> {patientDetail?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {patientDetail?.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {patientDetail?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {patientDetail?.phone}
                  </p>
                </div>
                <div className="text-gray-700">
                  <p>
                    <strong>Address:</strong> {patientDetail?.address?.street},{" "}
                    {patientDetail?.address?.city},{" "}
                    {patientDetail?.address?.state},{" "}
                    {patientDetail?.address?.zip},{" "}
                    {patientDetail?.address?.country}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg p-6 bg-white">
            <div className="mb-3">
              <CardTitle className="text-xl font-semibold text-[#023e7d]">
                Medical History
              </CardTitle>
            </div>
            <div>
              <ul className="space-y-4">
                {patientDetail?.medicalHistory?.map((history, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    <p>
                      <strong>Condition:</strong> {history.condition}
                    </p>
                    <p>
                      <strong>Diagnosis Date:</strong>{" "}
                      {new Date(history.diagnosisDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Treatment:</strong> {history.treatment}
                    </p>
                    <p>
                      <strong>Status:</strong> {history.currentStatus}
                    </p>

                    {index !== 1 &&
                      patientDetail?.medicalHistory.length > 1 && (
                        <hr className="mt-3" />
                      )}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="shadow-lg p-6 bg-white">
            <div className="mb-3">
              <CardTitle className="text-xl font-semibold text-[#023e7d]">
                Medications
              </CardTitle>
            </div>
            <div>
              <ul className="space-y-4 text-sm">
                {patientDetail?.medications?.map((medication, index) => (
                  <li key={index} className="text-gray-700">
                    <p>
                      <strong>Name:</strong> {medication.name}
                    </p>
                    <p>
                      <strong>Dosage:</strong> {medication.dosage}
                    </p>
                    <p>
                      <strong>Frequency:</strong> {medication.frequency}
                    </p>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(medication.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>End Date:</strong>{" "}
                      {medication.endDate
                        ? new Date(medication.endDate).toLocaleDateString()
                        : "Ongoing"}
                    </p>
                    <p>
                      <strong>Prescribing Doctor:</strong>{" "}
                      {medication.prescribingDoctor}
                    </p>

                    {index !== 1 && patientDetail?.medications.length > 1 && (
                      <hr className="mt-3" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="shadow-lg p-6 bg-white">
            <div className="mb-3">
              <CardTitle className="text-xl font-semibold text-[#023e7d]">
                Allergies
              </CardTitle>
            </div>
            <div>
              <ul className="space-y-4 text-sm">
                {patientDetail?.allergies?.map((allergy, index) => (
                  <li key={index} className="text-gray-700">
                    <p>
                      <strong>Allergen:</strong> {allergy.allergen}
                    </p>
                    <p>
                      <strong>Reaction:</strong> {allergy.reaction}
                    </p>
                    <p>
                      <strong>Severity:</strong> {allergy.severity}
                    </p>
                    <p>
                      <strong>First Observed:</strong>{" "}
                      {new Date(allergy.firstObserved).toLocaleDateString()}
                    </p>
                    {index !== 1 && patientDetail?.allergies.length > 1 && (
                      <hr className="mt-3" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="shadow-lg p-6 bg-white">
            <div className="mb-3">
              <CardTitle className="text-xl font-semibold text-[#023e7d]">
                Vital Signs
              </CardTitle>
            </div>
            <div className="text-sm">
              <p className="text-gray-700">
                <strong>Blood Pressure:</strong>{" "}
                {patientDetail?.vitalSigns?.bloodPressure?.systolic}/
                {patientDetail?.vitalSigns?.bloodPressure?.diastolic} mmHg
              </p>
              <p className="text-gray-700">
                <strong>Heart Rate:</strong>{" "}
                {patientDetail?.vitalSigns?.heartRate} bpm
              </p>
              <p className="text-gray-700">
                <strong>Temperature:</strong>{" "}
                {patientDetail?.vitalSigns?.temperature} °F
              </p>
              <p className="text-gray-700">
                <strong>Weight:</strong> {patientDetail?.vitalSigns?.weight} kg
              </p>
              <p className="text-gray-700">
                <strong>Height:</strong> {patientDetail?.vitalSigns?.height} cm
              </p>
            </div>
          </Card>

          <Card className="shadow-lg p-6 bg-white">
            <div className="mb-3">
              <CardTitle className="text-xl font-semibold text-[#023e7d]">
                Emergency Contact
              </CardTitle>
            </div>
            <div className="text-sm">
              <p className="text-gray-700">
                <strong>Name:</strong> {patientDetail?.emergencyContact?.name}
              </p>
              <p className="text-gray-700">
                <strong>Relationship:</strong>{" "}
                {patientDetail?.emergencyContact?.relationship}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {patientDetail?.emergencyContact?.phone}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {patientDetail?.emergencyContact?.email}
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar (if needed) */}
        {/* <div className="hidden md:block">
            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#023e7d]">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Here you can include any additional information or notes relevant to the patient.</p>
              </CardContent>
            </Card>
          </div> */}
      </div>
    </Layout>
  );
}

export default PatientDetailComponent;
