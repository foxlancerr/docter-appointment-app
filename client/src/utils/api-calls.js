// services/doctorService.js
export const fetchDoctorList = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/doctor");
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
    const response = await fetch(`http://localhost:3000/api/v1/doctor/${id}`);
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
