import Layout from "@/components/dashboard/DashboardLayout";
import HomeCardV1 from "@/components/dashboard/HomeCardV1";
import HomeFlipList from "@/components/dashboard/HomeFlipList";
import HomeHero from "@/components/dashboard/HomeHero";
import FaqAccordion from "@/components/landing-page/faqs";
import DoctorTable from "@/components/shared/DoctorTable";
import PatientTable from "@/components/shared/PatientTable";
import { DefaultTabs } from "@/components/shared/Tabs";
import UserTable from "@/components/shared/UserTable";
import { BACKEND_API_URL } from "@/constants";
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
    fetch(`${BACKEND_API_URL}/api/v1/auth/get-user-info-by-id`, {
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

  const tabsData = [
    { label: 'Users', component: UserTable },
    { label: 'Patients', component: PatientTable },
    { label: 'Doctors', component: DoctorTable },
  ];
  return (
    // <h1>hii</h1>
    <Layout>
      <HomeHero></HomeHero>
      <HomeCardV1></HomeCardV1>
      <DefaultTabs tabsData={tabsData}></DefaultTabs>
      {/* <BasicTable></BasicTable> */}
      {/* <HomeFlipList></HomeFlipList>  */}
    </Layout>
  );
};

export default Home;
