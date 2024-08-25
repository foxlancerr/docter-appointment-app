import React from "react";
import { Input } from "../ui/input";

function InputBox({ type, label, _name }) {
  return (
    <div>
      <label
        htmlFor="subject"
        className="block text-sm font-medium text-[#023e7d]"
      >
        {_name}
      </label>
      <Input
        id="subject"
        type={type}
        name={_name}
        className="mt-1 "
      />
    </div>
  );
}

export default InputBox;
