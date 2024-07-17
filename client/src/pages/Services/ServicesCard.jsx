import React from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ServicesCard = ({ item, index }) => {
  const { name, desc, bgColor, textColor } = item;
  return (
    <div className="p-6 lg:p-8 bg-white shadow-md rounded-lg flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {name}
        </h2>
        <p className="text-base text-gray-600">
          {desc}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Link to="/doctors" className="w-11 h-11 rounded-full border border-gray-900 flex items-center justify-center group hover:bg-indigo-500 hover:border-transparent">
          <BsArrowRight className="group-hover:text-white w-6 h-6" />
        </Link>

        <span className="w-11 h-11 flex items-center justify-center text-lg font-semibold rounded-l-lg" style={{ backgroundColor: bgColor, color: textColor }}>
          {index + 1}
        </span>
      </div>
    </div>
  )
}

export default ServicesCard;
