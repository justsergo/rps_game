import {
  Tab, Tabs,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserName } from "../../common/localstorageGetItems";
import TabPanel from "../ui/TabPanel";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";
import ModalWrapper from "./modalWrapper";

const RoomsModalContainer = ({ isOpen, close }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const username = useMemo(() => getUserName(), []);
  const navigate = useNavigate();
  const handleChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  useEffect(() => {
    if (!username) {
      navigate("/auth");
    }
  }, []);

  return (
    <ModalWrapper isOpen={isOpen} close={close} width="35%" height="35%" smwidth="90%" smheight="50%">
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
