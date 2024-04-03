import React, { useContext, useEffect, useState } from "react";
import { getItemFromLocalStorage } from "../utils/webLocalStorage";
import { GlobalContext } from "../context/GlobalContext";
import { Header } from "../components";

const Home = () => {
  const { loguserInfo, setLogUserInfo, setLoad } = useContext(GlobalContext);

  // this useEffect authenticate the user based on the token, is the user is authentic or not
  useEffect(() => {
    setLoad(true);
    fetch("http://localhost:3000/api/v1/users/get-user-info-by-id", {
      method: "POST",
      headers: {
        Authorization: "bearer " + getItemFromLocalStorage("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLogUserInfo(result.data);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <Header></Header>
    </div>
  );
};

export default Home;
