import React, { useContext, useEffect, useState } from "react";
import { getItemFromLocalStorage } from "../utils/webLocalStorage";
import { GlobalContext } from "../context/GlobalContext";

const Home = () => {
  const { loguser, setLogUser } = useContext(GlobalContext);

  // this useEffect authenticate the user based on the token, is the user is authentic or not
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users/get-user-info-by-id", {
      method: "POST",
      headers: {
        Authorization: "bearer " + getItemFromLocalStorage("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLogUser(result.data);
        // console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
