import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_API_URL } from "@/constants";
import Layout from "../DashboardLayout";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const AppointmentDetailComponent = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/api/v1/appointments/${id}`
        );
        if (response.data.success) {
          setAppointment(response.data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_API_URL}/api/v1/appointments/${id}`
      );
      if (response.status === 200) {
        toast.success("Doctor deleted successfully");
        setAppointment((prevAppoint) =>
          prevAppoint.filter((doctor) => doctor._id !== id)
        );
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };


  const authenticUser = useSelector((state) => state?.userInfo?.user);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const { patient, doctor, status, appointmentDateTime } = appointment;

  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {/* Patient Details Card */}
          <Grid item xs={12} md={6}>
            <Card>
              {authenticUser && (
                <div
                  className={`mb-4 h-auto py-3 font-semibold text-center rounded-md text-xl ${
                    authenticUser.isAdminVerifyTheUser
                      ? "text-white  bg-green-400"
                      : "bg-yellow-300"
                  } `}
                >
                  {authenticUser?.isAdminVerifyTheUser
                    ? "Verified"
                    : "Unverified"}
                </div>
              )}
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Patient Details
                  </Typography>
                }
                avatar={<Avatar src={patient?.auth?.profileImage} />}
              />
              <CardContent>
                <Typography variant="body2">
                  <strong>Name:</strong> {patient?.firstname}{" "}
                  {patient?.lastname}
                </Typography>
                <Typography variant="body2">
                  <strong>Gender:</strong> {patient?.gender}
                </Typography>
                <Typography variant="body2">
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(patient?.dateOfBirth).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {patient?.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {patient?.auth?.email}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">
                  <strong>Address:</strong>
                </Typography>
                <Typography variant="body2">
                  {patient?.address?.street}, {patient?.address?.city},{" "}
                  {patient?.address?.state}, {patient?.address?.zip},{" "}
                  {patient?.address?.country}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">
                  <strong>Emergency Contact:</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {patient?.emergencyContact?.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Relationship:</strong>{" "}
                  {patient?.emergencyContact?.relationship}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {patient?.emergencyContact?.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {patient?.emergencyContact?.email}
                </Typography>

                {/* Disease and Effects */}
                {patient?.disease && (
                  <>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6" color="#023e7d">
                      Medical Conditions
                    </Typography>
                    <Box sx={{ marginTop: 1 }}>
                      {patient.disease.map((item, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                          <Typography variant="body2">
                            <strong>Disease:</strong> {item.diseaseName}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Effects:</strong> {item.effects.join(", ")}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Doctor Details Card */}
          <Grid item xs={12} md={6}>
            <Card>
              {authenticUser && (
                <div
                  className={`mb-4 h-auto py-3 font-semibold text-center rounded-md text-xl ${
                    authenticUser.isAdminVerifyTheUser
                      ? "text-white  bg-green-400"
                      : "bg-yellow-300"
                  } `}
                >
                  {authenticUser?.isAdminVerifyTheUser
                    ? "Verified"
                    : "Unverified"}
                </div>
              )}
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Doctor Details
                  </Typography>
                }
                avatar={<Avatar src={doctor?.auth?.profileImage} />}
              />
              <CardContent>
                <Typography variant="body2">
                  <strong>Name:</strong> Dr. {doctor?.firstname}{" "}
                  {doctor?.lastname}
                </Typography>
                <Typography variant="body2">
                  <strong>Specialty:</strong> {doctor?.specialty}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {doctor?.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {doctor?.auth?.email}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">
                  <strong>Description:</strong>
                </Typography>
                <Typography variant="body2">{doctor?.description}</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">
                  <strong>Address:</strong>
                </Typography>
                <Typography variant="body2">{doctor?.address}</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2">
                  <strong>Experience:</strong>
                </Typography>
                {doctor?.experience?.map((exp) => (
                  <Typography key={exp._id} variant="body2">
                    {exp.position} at {exp.hospital} ({exp.yearStart} -{" "}
                    {exp.yearEnd || "Present"})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Appointment Timing Card */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6" color="#023e7d">
                    Appointment Details
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2">
                  <strong>Appointment Date:</strong>{" "}
                  {dayjs(appointmentDateTime).format("MMMM D, YYYY")}
                </Typography>
                <Typography variant="body2">
                  <strong>Appointment Time:</strong>{" "}
                  {dayjs(appointmentDateTime).format("h:mm A")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Admin Actions Card */}
          {(authenticUser.userType === "admin" ||
            authenticUser.userType === "doctor") && (
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
                    <strong>Status:</strong> {status}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleDelete(appointment?._id)
                    }}
                  >
                    Cancel Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default AppointmentDetailComponent;
