import { Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import { StyledBox } from "./styles";

const ModalComponent = ({ children, isOpen, close }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <StyledBox>
          {children}
        </StyledBox>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
