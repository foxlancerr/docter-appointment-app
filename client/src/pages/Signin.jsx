import React from "react";
import FrontImage from "../../assets/front-image.png";

const Signin = () => {
  return (
    <div className="flex justify-center items-center gradiant-blue-l h-screen">
      <div className="w-[60%] h-[80%] gradiant-blue-r rounded-[40px]  flex overflow-hidden drop-shadow-lg shadow-blue">
        <div className="w-[60%] px-8 py-5  flex flex-col gap-2">
          <div className="object-cover w-[300px] bg-red-9">
            <img src={FrontImage} alt="frontImage" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Councel Your patients <br></br>online
          </h1>
          <p className="text-white">Maintain relationship with them</p>
        </div>
        <div className="w-[40%] bg-white px-8 py-5">
          <h1 className="font-bold text-2xl ">Docterz</h1>
          <form id="sign-in-form" className="mt-[60px]">
            <h1 className="font-NunitoSans text-2xl font-extrabold text-center text-transparent gradiant-blue-l bg-clip-text">Hey! lets signin</h1>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
