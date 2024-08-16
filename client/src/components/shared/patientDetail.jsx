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

function PatientDetail() {
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
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-[#023e7d]">{patientDetail.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {patientDetail.gender}, {new Date(patientDetail.dateOfBirth).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-700">
                  <p><strong>Email:</strong> {patientDetail.email}</p>
                  <p><strong>Phone:</strong> {patientDetail.phone}</p>
                </div>
                <div className="text-gray-700">
                  <p><strong>Address:</strong> {patientDetail.address?.street}, {patientDetail.address?.city}, {patientDetail.address?.state}, {patientDetail.address?.zip}, {patientDetail.address?.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#023e7d]">Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-4">
                  {patientDetail.medicalHistory?.map((history, index) => (
                    <li key={index} className="text-gray-700">
                      <p><strong>Condition:</strong> {history.condition}</p>
                      <p><strong>Diagnosis Date:</strong> {new Date(history.diagnosisDate).toLocaleDateString()}</p>
                      <p><strong>Treatment:</strong> {history.treatment}</p>
                      <p><strong>Status:</strong> {history.currentStatus}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#023e7d]">Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-4">
                  {patientDetail.medications?.map((medication, index) => (
                    <li key={index} className="text-gray-700">
                      <p><strong>Name:</strong> {medication.name}</p>
                      <p><strong>Dosage:</strong> {medication.dosage}</p>
                      <p><strong>Frequency:</strong> {medication.frequency}</p>
                      <p><strong>Start Date:</strong> {new Date(medication.startDate).toLocaleDateString()}</p>
                      <p><strong>End Date:</strong> {medication.endDate ? new Date(medication.endDate).toLocaleDateString() : "Ongoing"}</p>
                      <p><strong>Prescribing Doctor:</strong> {medication.prescribingDoctor}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#023e7d]">Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-4">
                  {patientDetail.allergies?.map((allergy, index) => (
                    <li key={index} className="text-gray-700">
                      <p><strong>Allergen:</strong> {allergy.allergen}</p>
                      <p><strong>Reaction:</strong> {allergy.reaction}</p>
                      <p><strong>Severity:</strong> {allergy.severity}</p>
                      <p><strong>First Observed:</strong> {new Date(allergy.firstObserved).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#023e7d]">Vital Signs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700"><strong>Blood Pressure:</strong> {patientDetail.vitalSigns?.bloodPressure?.systolic}/{patientDetail.vitalSigns?.bloodPressure?.diastolic} mmHg</p>
                <p className="text-gray-700"><strong>Heart Rate:</strong> {patientDetail.vitalSigns?.heartRate} bpm</p>
                <p className="text-gray-700"><strong>Temperature:</strong> {patientDetail.vitalSigns?.temperature} °F</p>
                <p className="text-gray-700"><strong>Weight:</strong> {patientDetail.vitalSigns?.weight} kg</p>
                <p className="text-gray-700"><strong>Height:</strong> {patientDetail.vitalSigns?.height} cm</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#023e7d]">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700"><strong>Name:</strong> {patientDetail.emergencyContact?.name}</p>
                <p className="text-gray-700"><strong>Relationship:</strong> {patientDetail.emergencyContact?.relationship}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {patientDetail.emergencyContact?.phone}</p>
                <p className="text-gray-700"><strong>Email:</strong> {patientDetail.emergencyContact?.email}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (if needed) */}
          <div className="hidden md:block">
            <Card className="shadow-lg p-6 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#023e7d]">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Here you can include any additional information or notes relevant to the patient.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PatientDetail;
