import { FaHome } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { BsCalendar2Date } from "react-icons/bs";
import {
  Avator1,
  Avator2,
  Avator3,
  Avator4,
  Avator5,
} from "../../assets/index";

export const sideBarLinks = [
  {
    label: "Home",
    route: "/",
    icon: FaHome,
  },
  {
    label: "Patient",
    route: "/patient",
    icon: FaHome,
  },
  {
    label: "Apply As Docter",
    route: "/apply-docter",
    icon: MdOutlineDateRange,
  },
  {
    label: "appointment",
    route: "/appointment",
    icon: MdOutlineDateRange,
  },
];

export const userSideBarLinks = [
  {
    label: "Apply As Docter",
    route: "/apply-docter",
    icon: MdOutlineDateRange,
  },
  {
    label: "appointments",
    route: "/appointments",
    icon: MdOutlineDateRange,
  },
];

export const docterSideBarLinks = [
  {
    label: "user1",
    route: "/user1",
    icon: MdOutlineDateRange,
  },
  {
    label: "user2",
    route: "/user2",
    icon: MdOutlineDateRange,
  },
];

export const generalSideBarLinks = [
  {
    label: "General",
    route: "/general",
    icon: FaHome,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: MdSettings,
  },
  {
    label: "Logout",
    route: "/signin",
    icon: IoMdLogOut,
  },
];

export const homeCardLinks = [
  {
    title: "New Meeting",
    tagline: "Setup a new recording",
    route: "/",
    Icon: FaHome,
    ClassName: "bg-[#FF742E]",
  },
  {
    title: "Join Meeting",
    tagline: "via invitation link",
    route: "/",
    Icon: FiUserPlus,
    ClassName: "bg-[#0E78F9]",
  },
  {
    title: "Schedule Meeting",
    tagline: "Plan your meeting",
    route: "/",
    Icon: MdOutlineDateRange,
    ClassName: "bg-[#830EF9]",
  },
  {
    title: "View Recordings",
    tagline: "Meeting recordings",
    route: "/",
    Icon: IoVideocam,
    ClassName: "bg-[#F9A90E]",
  },
];

export const patientHero = [
  {
    title: "Today Patient",
    tagline: "10",
    Icon: MdOutlineAccessTime ,
    ClassName: "bg-orange-400 shadow-sm shadow-black/50",
  },
  {
    title: "Montly Patient",
    tagline: "100",
    Icon: BsCalendar2Date,
    ClassName: "bg-green-400 shadow-sm shadow-black/50 min-h-[120px]",
  },
  {
    title: "Yearly Patient",
    tagline: "200+",
    Icon: BsCalendar2Date,
    ClassName: "bg-blue-400 shadow-sm shadow-black/50",
  },
];

import { MdOutlineAccessTime } from "react-icons/md";
export const avatorImages = [Avator1, Avator2, Avator3, Avator4, Avator5];
export const patientList = [
  {
    id: "001",
    profileImg: Avator1,
    name: "Fatima",
    phone: "+92 3223837334",
    age: 19,
    gender: "female",
    bloodGroup: "A-",
    createdDate: "01-05-2023",
    colorStatus: false,
  },
  {
    id: "002",
    profileImg: Avator2,
    name: "Atik Ullah",
    phone: "+92 3201238373",
    age: 21,
    gender: "male",
    bloodGroup: "A+",
    createdDate: "23-01-2024",
    colorStatus: true,
  },
  {
    id: "003",
    profileImg: Avator5,
    name: "Suluhdin",
    phone: "+92 34412423",
    age: 31,
    gender: "male",
    bloodGroup: "B+",
    createdDate: "03-04-2024",
    colorStatus: true,
  },

  {
    id: "004",
    profileImg: Avator4,
    name: "Zainab Ali",
    phone: "+92 322383743",
    age: 34,
    gender: "female",
    bloodGroup: "A+",
    createdDate: "07-04-2024",
    colorStatus: false,
  },
  {
    id: "005",
    profileImg: Avator3,
    name: "Subhan Ali",
    phone: "+92 345837334",
    age: 45,
    gender: "Male",
    bloodGroup: "O-",
    createdDate: "05-11-2023",
    colorStatus: true,
  },
];
