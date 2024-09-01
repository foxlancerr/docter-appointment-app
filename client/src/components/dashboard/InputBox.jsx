import React from "react";
import { Input } from "../ui/input";

function InputBox({ type, label, _name,cls }) {
  return (
    <div>
      <label
        htmlFor="subject"
        className="block text-sm font-medium text-[#023e7d]"
      >
        {label}
      </label>
      <Input
        id="subject"
        type={type}
        name={_name}
        className={`mb-1 ${cls}`}
      />
    </div>
  );
}

export default InputBox;
