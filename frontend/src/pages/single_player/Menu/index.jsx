import { Box } from "@mui/material";

import { TriangleImage } from "../../../assets/images";
import RenderButton, { buttonsNames } from "../../../components/RenderMenuButtons";
import { StyledGrid } from "./styles";

const Menu = () => {
  return (
    <StyledGrid container xs={12}>

      <Box sx={{
        position: "relative", alignSelf: "center", top: "15%", display: "flex", justifyContent: "center", alignItems: "center", height: "370px",
      }}
      >
        <TriangleImage />;
        <>
          { buttonsNames.map((item) => <RenderButton name={item} key={item} />) }
        </>
      </Box>

    </StyledGrid>
  );
};

export default Menu;
