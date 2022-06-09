import { Box } from "@mui/material";
import RenderButton, { buttonsNames } from "frontend/src/components/RenderMenuButtons";
import { StyledGrid } from "frontend/src/pages/single_player/Menu/styles";

import { TriangleImage } from "../../../assets/images";

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
