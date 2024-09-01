import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avator1 } from "../../../assets/index";
import { IoClose, IoNotifications } from "react-icons/io5";
import MobileNavbar from "./MobileNavbar";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import profileDummyImage from "../../../assets/images/avatar-1.jpeg";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { logOutUser } from "@/store/features/userInfo/userInfoSlice";
import axios from "axios";
import { getItemFromLocalStorage } from "@/utils/webLocalStorage";
import { BACKEND_API_URL } from "@/constants";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state?.userInfo?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
    dispatch(logOutUser())
  };

  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/api/v1/notification/get-notification`,
        {
          headers: {
            Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
          },
        }
      );

      const result = response.data;
      if (result.success) {
        setNotifications(result.data);
      } else {
        toast.error("Failed to fetch notifications.");
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications.");
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);


  return (
    <>
      <MobileNavbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      ></MobileNavbar>
      <nav className="flex justify-between fixed z-30 w-full items-center bg-[#023e7d] text-white px-10 py-4 lg:px-10">
        <div className="" id="top_nav_right_side">
          <h1 className="font-extrabold text-3xl gradiant-blue-l text-gradiant">
            Docterz
          </h1>
        </div>
        <div className="flex justify-between items-center gap-7 relative">
          <Link
            to='/notifications'
            className="relative cursor-pointer"
          >
            <IoNotifications className="text-[3rem]"></IoNotifications>
            <div className="absolute w-[25px] h-[25px] rounded-full bg-red-500 -top-2 right-5 flex justify-center items-center text-white">
              {notifications.filter(notify => !notify.seen)?.length}
            </div>
          </Link>
         
          <div className=" text-black">
            <HiMenuAlt3
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-4xl sm:hidden"
            ></HiMenuAlt3>
          </div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-[40px] h-[40px] rounded-full p-0 border-none shadow-none focus:outline-none">
                  <img
                    src={user?.profileImage || profileDummyImage} 
                    alt="profile-image"
                    className="w-full h-full object-cover rounded-full bg-white"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white shadow-lg mt-3 px-3 py-2">
                <DropdownMenuItem>
                  {user?.username || "Username"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user?.email || "Email"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/signin" className="">
                Sign In
              </Link>
              |
              <Link to="/signup" className="">
                Sign Up
              </Link>
            </div>
          )}

          <button></button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
