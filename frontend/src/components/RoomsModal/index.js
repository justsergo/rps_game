import {
  Tab, Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserName } from "../../common/utils/localstorageGetItems";
import ModalWrapper from "../Modal";
import TabPanel from "../TabPanel";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

const RoomsModalContainer = ({ isOpen, close }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [username, setUsername] = useState({});
  const navigate = useNavigate();
  const handleChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  useEffect(() => {
    setUsername(() => getUserName());
  }, []);

  if (!username) {
    navigate("/auth");
  }

  return (
    <ModalWrapper isOpen={isOpen} close={close} width="35%" height="35%" smWidth="90%" smHeight="50%">
      <Tabs
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        variant="fullWidth"
      >

        <Tab label="Join room" />
        <Tab label="Create room" />

      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <JoinRoom />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <CreateRoom />
      </TabPanel>
    </ModalWrapper>
  );
};

export default RoomsModalContainer;
