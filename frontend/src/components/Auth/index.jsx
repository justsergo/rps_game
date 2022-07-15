import {
  Grid,
  Tab, Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import TabPanel from "../TabPanel";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { StyledPaper } from "./styles";

const AuthContainer = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tabNameToIndex = {
    0: "signIn",
    1: "signUp",
  };

  const indexToTabName = {
    signIn: 0,
    signUp: 1,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[type]);

  // check for incorrect path in browser
  useEffect(() => {
    if (location.pathname !== `/auth/${tabNameToIndex[selectedTab]}`) {
      navigate(`/auth/${tabNameToIndex[0]}`);
      setSelectedTab(0);
    }
  }, [selectedTab, location]);

  const handleChange = (event, newTab) => {
    navigate(`/auth/${tabNameToIndex[newTab]}`);
    setSelectedTab(newTab);
  };

  return (
    <Grid
      container
      xs={11}
      sm={9}
      md={5}
      lg={4}
      sx={{
        height: "100vh", justifyContent: "center", alignItems: "center", margin: "auto",
      }}
    >
      <StyledPaper elevation={1}>
        <Tabs
          value={selectedTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >

          <Tab label="Sign In" />
          <Tab label="Sign Up" />

        </Tabs>
        <TabPanel value={selectedTab} index={0}>
          <SignIn />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <SignUp />
        </TabPanel>
      </StyledPaper>
    </Grid>
  );
};

export default AuthContainer;
