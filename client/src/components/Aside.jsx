import { sideBarLinks } from "../constants";
import { Link, useLocation } from "react-router-dom";

function Aside() {
  const { pathname } = useLocation();
  console.log(pathname)
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-coljustify-between  bg-white-300 p-6 pt-28 text-black max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-3">
        {sideBarLinks.map((item) => {
          return (
            <Link

              key={item.label}
              to={item.route}
              className={`flex gap-3 items-center justify-start rounded p-4 hover:bg-blue-700 ${
                pathname == item.route && "bg-blue-700"
              }`}
            >
              <span className="text-2xl">
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
