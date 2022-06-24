import { StyledContainer } from "./styles";

const GlassContainer = ({ children }) => {
  return (
    <StyledContainer container>
      {children}
    </StyledContainer>
  );
};

export default GlassContainer;
