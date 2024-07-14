import React, { useContext, useEffect, useState } from "react";
import { getItemFromLocalStorage } from "../utils/webLocalStorage";
import { GlobalContext } from "../context/GlobalContext";
import Layout from "../components/Layout";
import HomeHero from "../components/HomeHero";
import HomeFlipList from "../components/HomeFlipList";
import { useDispatch } from "react-redux";
import { logInUser } from "../store/features/userInfo/userInfoSlice";
import { Button } from "@/components/ui/button";
import FaqAccordion from "@/components/landing-page/faqs";

const Home = () => {
  const { loguserInfo, setLoad } = useContext(GlobalContext);
  const dispatch = useDispatch();

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
        dispatch(logInUser(result.data));
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err.message);
      });
  }, []);

  return (
    <Layout>
      <FaqAccordion></FaqAccordion>
      <HomeHero></HomeHero>
      <HomeFlipList></HomeFlipList>
    </Layout>
  );
};

export default Home;
