function Navbar() {
  return (
    <nav className="flex justify-between fixed z-50 w-full items-center bg-white-300 px-6 py-4 lg:px-10">
      <div className="" id="top_nav_right_side">
        <h1 className="font-extrabold text-3xl gradiant-blue-l text-gradiant">
          Docterz
        </h1>
      </div>
      <div className="flex justify-between gap-2">
        <h1>Login</h1>
        <h1>user</h1>
      </div>
    </nav>
  );
}

export default Navbar;
