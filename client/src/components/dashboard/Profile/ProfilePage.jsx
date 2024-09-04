import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { BACKEND_API_URL } from "@/constants";
import { Switch } from "@/components/ui/switch";
import Layout from "../DashboardLayout";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authenticUser = useSelector((state) => state?.userInfo?.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/api/v1/auth/users/${id}`
        );
        setUser(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_API_URL}/api/v1/auth/users/${id}`);
      toast.success("User deleted successfully");
      navigate("/users");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const getCellStyle = (isApproved) => {
    return isApproved
      ? "bg-green-300/90 text-green-700"
      : "bg-blue-300/90 text-blue-700";
  };

  const handleToggleApproval = async (id) => {
    try {
      const response = await axios.patch(
        `${BACKEND_API_URL}/api/v1/auth/approve/${id}`
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Update the user state with the new isAdminVerifyTheUser value
        setUser((prevUser) => ({
          ...prevUser,
          isAdminVerifyTheUser: !prevUser.isAdminVerifyTheUser,
        }));
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center p-4">No user found.</div>;
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        {user && (
          <div
            className={`mb-4 h-auto py-3 font-semibold text-center rounded-md text-xl ${
              user.isAdminVerifyTheUser
                ? "text-white  bg-green-400"
                : "bg-yellow-300"
            } `}
          >
            {user?.isAdminVerifyTheUser ? "Verified" : "Unverified"}
          </div>
        )}
        <div className="flex items-center mb-6">
          <img
            src={user.profileImage}
            className="w-32 h-32 rounded-full border-2 border-gray-200 shadow-md"
            alt="Profile"
          />

          <div className="ml-6">
            <h1 className="text-3xl font-extrabold mb-2">{user.username}</h1>
            <p className="text-gray-700 text-lg mb-2">{user.email}</p>
            <p className="text-gray-500 text-sm">
              Created at: {dayjs(user.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <p className="w-1/3 font-semibold">Email Verified:</p>
              <p className="text-gray-700">
                {user.isEmailVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
        {authenticUser?.userType == "admin" && (
          <div className="flex justify-end">
            <div className="flex gap-3 items-center">
              <p className="mb-3 font-semibold">
                {!user.isAdminVerifyTheUser ? "verify ON" : "Verify OFF"}
              </p>
              <p
                className={`px-5 py-2 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                  user.isProfileComplete
                )} text-center`}
              >
                <Switch
                  id={`switch-${user._id}`}
                  checked={user.isAdminVerifyTheUser}
                  onCheckedChange={() => handleToggleApproval(user._id)}
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
      </div>
    </Layout>
  );
}
