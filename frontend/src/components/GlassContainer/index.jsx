import { StyledContainer } from "./styles";

const GlassContainer = ({ children, sx }) => {
  return (
    <StyledContainer container sx={sx}>
      {children}
    </StyledContainer>
  );
};

export default GlassContainer;
