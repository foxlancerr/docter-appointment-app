import React from "react";

function InputBox({ type, label, _name }) {
  return (
    <label htmlFor="" className="">
      <p className="text-xl mb-1">{label}</p>
      <input
        type={type}
        name={_name}
        className="w-full text-white px-5 py-3 rounded-[10px] text-3xl bg-black-100 "
      />
    </label>
  );
}

export default InputBox;
