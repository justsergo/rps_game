import { Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import { StyledPaper } from "./style";

const ModalWrapper = ({
  children, isOpen, close, background, width, height, padding, smWidth, smHeight,
}) => {
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
      <StyledPaper
        background={background}
        width={width}
        height={height}
        padding={padding}
        smwidth={smWidth}
        smheight={smHeight}
      >
        {children}
      </StyledPaper>
    </Modal>
  );
};

export default ModalWrapper;
