import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FrontImageSignUp } from "@/../assets/index.js";
import { GlobalContext } from "@/context/GlobalContext";
import { FaUpload } from "react-icons/fa6";
import axios from "axios";
import { validateEmail, validateForm } from "@/utils/formValidation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Signup = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");

  const { setLoad } = useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchData = async (data) => {
    try {
      setLoad(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        data
      );

      const result = await response.data;
      setLoad(false);

      if (!result?.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        toast("Redirecting to SignIn Page");
        navigate("/signin");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  // form data is collected here
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password)
    const formData = new FormData();
    // Validate form
    const { usernameError, emailError, passwordError } = validateForm(
      username,
      email,
      password
    );

    // if (usernameError) {
    //   toast.error(usernameError);
    //   return;
    // }
    // if (emailError) {
    //   toast.error(emailError);
    //   return;
    // }
    // if (passwordError) {
    //   toast.error(passwordError);
    //   return;
    // }
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userType", userType);

    if (uploadedImage) {
      formData.append("file", uploadedImage);
    }
    fetchData(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file); // Set the image file

    // Create a preview URL
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleSelectChange = (value) => {
    setUserType(value); // Update state with selected value
  };

  console.log(uploadedImage);
  return (
    <div className="flex justify-center items-center bg-[#023e7d] h-screen">
      <div className="w-[60%] h-[80vh] gradiant-blue-r rounded-[10px]  flex overflow-hidden drop-shadow-lg shadow-blue">
        {/* left side */}
        <div className=" px-8 py-5 md:w-[60%] h-full hidden md:flex flex-col gap-2">
          <div className="w-[300px] bg-red-9">
            <img
              src={FrontImageSignUp}
              alt="frontImage"
              className="w-[100%] object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Councel Your patients <br></br>online
          </h1>
          <p className="text-white">Maintain relationship with them</p>
        </div>

        {/* right side */}
        <div className="md:w-[40%] w-full bg-white px-8 py-5">
          <h1 className="font-extrabold text-2xl text-[#023e7d]">Docterz</h1>
          <h1 className="font-NunitoSans text-2xl font-extrabold text-center text-[#023e7d] text-gradiant">
            Welcome! lets <br /> signup
          </h1>
          <form id="sign-up-form" className="mt-5">
            <div className="relative flex items-center justify-center">
              <img
                src={imagePreview || "placeholder-image-url"} // Fallback placeholder if no image selected
                alt="Selected Image"
                className="w-[80px] h-[80px] object-cover rounded-full border-2 border-black p-1"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
                <FaUpload className="text-white text-xl" />
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </span>
            </div>

            <div className="mt-2">
              <input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <div className="mt-2">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <div className="my-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                name="password"
                autoComplete="true"
                required
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <Select className="" onValueChange={handleSelectChange} defaultValue={userType}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select User Type" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup className="" >
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="patient">User</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

            <button
              className="px-5 py-2 bg-[#023e7d] hover:bg-[#023e7d]/90 mt-4 rounded-lg w-full font-bold text-xl text-white"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign up
            </button>
          </form>
          <div className="flex mt-1 justify-evenly items-center">
            <p className="text-[12px] font-semibold text-gray-500">
              If already account
            </p>
            <Link
              className="font-semibold text-[1rem] text-[#023e7d] underline"
              to="/signin"
            >
              signin
            </Link>
          </div>
          <div className="mt-3 text-center">
            <p className="text-[12px] font-semibold text-gray-500">
              by signin, you accept to
            </p>
            <h3 className="font-bold text-[12px] text-[#023e7d]">
              Terms & Condition
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
