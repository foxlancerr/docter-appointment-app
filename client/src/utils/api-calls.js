// called doctors controller APIs
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import { BACKEND_API_URL } from "@/constants";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const fetchDoctorList = async () => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/v1/doctor`);
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return null;
  }
};
export const fetchDoctorById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/v1/doctor/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return null;
  }
};

// called Appointment controller APIs
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const checkAvailabilityOfDoctors = async (id) => {
  const startTime = new Date().toISOString();
  try {
    const response = await fetch(
      `${BACKEND_API_URL}/api/v1/appointments/check-availability?doctorId=${encodeURIComponent(
        id
      )}&startTime=${encodeURIComponent(startTime)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return null;
  }
};
export const bookAppointment = async (_data) => {
  const {
    address,
    medicalHistory,
    medications,
    allergies,
    emergencyContact,
    endTime,
    startTime,
    doctorId,
    patientId,
  } = _data;
  try {
    const appointmentResponse = await fetch(`${BACKEND_API_URL}/api/v1/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientId,
        doctorId,
        startTime,
        endTime,
      }),
    });

    const appointmentData = await appointmentResponse.json();
    if (!appointmentData.success) {
      return appointmentData;
    }

    if (!appointmentResponse.ok || !appointmentData.success) {
      // If the appointment creation fails, throw an error
      throw new Error(appointmentData.error || "Error creating appointment");
    }

    // If the appointment creation is successful, then create/update the patient
    const patientResponse = await fetch(`${BACKEND_API_URL}/api/v1/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        medicalHistory,
        medications,
        allergies,
        emergencyContact,
      }),
    });

    const patientData = await patientResponse.json();
    return patientData;
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return null;
  }
};
