import {
  doctorSideBarLinks,
  userSideBarLinks,
  adminSideBarLinks,
} from "../constants";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Aside() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state?.userInfo?.user);
  console.log(user);

  let sideBarLinks;
  if (user?.role === "admin") {
    sideBarLinks = adminSideBarLinks;
  } else if (user?.role === "doctor") {
    sideBarLinks = doctorSideBarLinks;
  } else {
    sideBarLinks = userSideBarLinks;
  }

  return (
    <section className="sticky left-0 top-0 flex gap-3 h-screen w-fit flex-col justify-start p-6 pt-28 text-black-200 max-sm:hidden lg:w-[320px]">
      <div className="flex flex-col gap-2 bg-black-100 text-white-200 p-6 h-fit rounded-[10px]">
        {sideBarLinks.map((item) => {
          return (
            <Link
              key={item.label}
              to={item.route}
              className={`flex gap-3 items-center justify-start rounded py-3 px-4 hover:bg-blue-700 hover:text-white-200 ${
                pathname == item.route && "bg-blue-700 text-white-100"
              }`}
            >
              <span className="text-3xl ">
                <item.icon />
              </span>
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Aside;
