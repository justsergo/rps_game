import { RESPONSE_USER_STATUS, USER_STATUS_TEXT } from "../../../constants/names";
import {
  StyledTypography, StyledWrapper,
} from "./styles";

const PlayerIconContent = ({ status }) => {
  return (
    <StyledWrapper container item xs={12} sx={{ display: "inline-block" }}>
      <StyledTypography variant="h2" status={status}>{
        status === RESPONSE_USER_STATUS.READY
          ? USER_STATUS_TEXT.READY
          : USER_STATUS_TEXT.WAITING
      }
      </StyledTypography>
    </StyledWrapper>
  );
};

export default PlayerIconContent;
