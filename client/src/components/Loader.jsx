import React from "react";
import LoadingImage from "../../assets/loading.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full fixed top-0 left-0 bg-white/80">
      <div className="w-[60px] h-[60px]">
        <img src={LoadingImage} alt="Loading" className="object-cover w-full" />
      </div>
    </div>
  );
};

export default Loader;
