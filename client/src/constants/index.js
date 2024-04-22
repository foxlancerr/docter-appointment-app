import { FaHome } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { Avator1, Avator2, Avator3, Avator4, Avator5 } from "../assets";

export const sideBarLinks = [
  {
    label: "Home",
    route: "/",
    icon: FaHome,
  },
  {
    label: "Apply As Docter",
    route: "/apply-docter",
    icon: MdOutlineDateRange,
  },
  {
    label: "Previews",
    route: "/previews",
    icon: MdOutlineDateRange,
  },
  {
    label: "Recording",
    route: "/recording",
    icon: IoVideocam,
  },
  {
    label: "Personal Room",
    route: "/personal-rooms",
    icon: FiPlus,
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

export const avatorImages = [Avator1, Avator2, Avator3, Avator4, Avator5];
