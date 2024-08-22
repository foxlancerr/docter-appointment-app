import Layout from "@/components/dashboard/DashboardLayout";
import HomeCardV1 from "@/components/dashboard/HomeCardV1";
import HomeFlipList from "@/components/dashboard/HomeFlipList";
import HomeHero from "@/components/dashboard/HomeHero";
import FaqAccordion from "@/components/landing-page/faqs";
import BasicTable from "@/components/shared/BasicTable";
import { GlobalContext } from "@/context/GlobalContext";
import { logInUser } from "@/store/features/userInfo/userInfoSlice";
import { getItemFromLocalStorage } from "@/utils/webLocalStorage";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const { loguserInfo, setLoad } = useContext(GlobalContext);
  const dispatch = useDispatch();

  // this useEffect authenticate the user based on the token, is the user is authentic or not
  useEffect(() => {
    setLoad(true);
    fetch("http://localhost:3000/api/v1/auth/get-user-info-by-id", {
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
    // <h1>hii</h1>
    <Layout>
      <HomeHero></HomeHero>
      <HomeCardV1></HomeCardV1>
      <BasicTable></BasicTable>
      {/* <HomeFlipList></HomeFlipList>  */}
    </Layout>
  );
};

export default Home;
