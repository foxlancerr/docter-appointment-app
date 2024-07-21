import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FrontImageSignUp } from "@/../assets/index.js";
import toast from "react-hot-toast";
import { GlobalContext } from "@/context/GlobalContext";
import { setItemInLocalStorage } from "@/utils/webLocalStorage";


const Signin = () => {
  const [formInfo, setFormInfo] = useState({});
  const { setLoad } = useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchData = async (data) => {
    console.log(data)
    try {
      setLoad(true);
      const response = await fetch(
        "http://localhost:3000/api/v1/users/signin",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setLoad(false);
      if (!result?.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        toast("Redirecting to Home Page");
        setItemInLocalStorage("token", result.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  // form data is collected here
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("sign-in-form"));
    const formData = {};
    for (let [key, value] of form) {
      formData[key] = value;
    }

    setFormInfo(formData);
    fetchData(formData);
  };

  // console.log(formInfo);
  return (
    <div className="flex justify-center items-center bg-[#023e7d] h-screen">
      <div className="w-[60%] md:h-[80vh] gradiant-blue-r rounded-[10px]  flex overflow-hidden drop-shadow-lg shadow-blue">
        {/* left side */}
        <div className="w-full px-8 py-5 md:w-[60%] hidden md:flex flex-col gap-2">
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
        <div className=" w-full  bg-white px-8 py-5 h-full">
          <h1 className="font-extrabold text-2xl gradiant-blue-l text-[#023e7d]">
            Docterz
          </h1>
          <h1 className="md:mt-[60px] mt-[30px] font-NunitoSans text-2xl font-extrabold text-center gradiant-blue-l text-[#023e7d]">
            Hey! lets signin
          </h1>
          <form id="sign-in-form" className="mt-5">
            <div className="mt-4">
              <input
                type="email"
                placeholder="email"
                name="email"
                required
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                name="password"
                placeholder="password"
                required
                autoComplete="true"
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <button
              className="px-5 py-2 bg-[#023e7d] hover:bg-[#023e7d]/90 mt-4 rounded-lg w-full font-bold text-xl text-white"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign in
            </button>
          </form>
          <div className="flex mt-1 justify-evenly items-center">
            <p className="text-[12px] font-semibold text-gray-500">
              If no account
            </p>
            <Link
              className="font-semibold text-[1rem] text-[#023e7d] underline"
              to="/signup"
            >
              signup
            </Link>
          </div>
          <div className="mt-3 text-center">
            <p className="text-[12px] font-semibold text-gray-500">
              by signup, you accept to
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

export default Signin;
