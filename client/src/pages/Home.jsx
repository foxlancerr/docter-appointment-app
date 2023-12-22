import React, { useEffect, useState } from "react";
import { getItemFromLocalStorage } from "../utils/webLocalStorage";

const Home = () => {
  const [loguser, setLogUser] = useState({});
  // this useEffect authenticate the user based on the token, is the user is authentic or not
  useEffect(() => {
    // get-user-info-by-id
    fetch("http://localhost:3000/api/v1/users/get-user-info-by-id", {
      method: "POST", // or 'PUT'
      headers: {
        Authorization: "bearer " + getItemFromLocalStorage("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLogUser(result.data);
        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // const result = await response.json();
    // if (!result?.success) {
    //   toast.error(result.message);
    // } else {
    //   toast.success(result.message);
    //   toast("Redirecting to Home Page");
    //   setItemInLocalStorage("token", result.token);
    //   navigate("/");
    // }
  }, []);

  return (
    <div>
      Home Page
      <p>{loguser?.username}</p>
      <p>{loguser?.email}</p>
    </div>
  );
};

export default Home;
