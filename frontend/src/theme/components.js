import { GAME_ITEMS } from "../constants/names";

const createComponents = (palette) => ({
  MuiButton: {
    variants: [
      {
        props: { variant: "gameText" },
        style: {
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "1.2rem",
          letterSpacing: "0.2rem",
          padding: "0.5rem 0",
          color: palette.button.textBlue,
          backgroundColor: palette.button.background,
          width: "15rem",
          height: "3rem",
          boxSizing: "border-box",
          "&:hover": {
            color: palette.button.textRed,
            backgroundColor: palette.button.background,
          },
        },
      },

      {
        props: { variant: "iconWrap" },
        style: {
          width: "8rem",
          height: "8rem",
          borderRadius: "50%",
          backgroundColor: palette.button.background,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0.7rem 0 -0.3rem #c7b7ba inset",
          boxSizing: "border-box",
          padding: 0,
          position: "relative",
          "&:hover": {
            backgroundColor: palette.button.background,
          },
          "&::before": {
            content: "\"\"",
            borderRadius: "50%",
            position: "absolute",
            boxShadow: "0 -0.15rem 0 0.1rem rgba(0, 0, 0, 0.4) inset",
            display: "block",
            width: "10rem",
            height: "10rem",
            zIndex: -1,
          },

          "@media (max-width:600px)": {
            width: "5rem",
            height: "5rem",
            "&::before": {
              width: "7rem",
              height: "7rem",
            },
          },
        },
      },

      {
        props: { variant: "iconWrapXl" },
        style: {
          width: "10rem",
          height: "10rem",
          borderRadius: "50%",
          backgroundColor: palette.button.background,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0.7rem 0 -0.3rem #c7b7ba inset",
          boxSizing: "border-box",
          padding: 0,
          position: "relative",
          "&:hover": {
            backgroundColor: palette.button.background,
          },
          "&::before": {
            content: "\"\"",
            borderRadius: "50%",
            position: "absolute",
            boxShadow: "0 -0.15rem 0 0.1rem rgba(0, 0, 0, 0.4) inset",
            display: "block",
            width: "12rem",
            height: "12rem",
            zIndex: -1,
          },

          "@media (max-width:600px)": {
            width: "8rem",
            height: "8rem",
            "&::before": {
              width: "10rem",
              height: "10rem",
            },
          },
          "@media (max-width:400px)": {
            width: "6rem",
            height: "6rem",
            "&::before": {
              width: "8rem",
              height: "8rem",
            },
          },
        },
      },

      {
        props: { figure: GAME_ITEMS.ROCK },
        style: {
          "&::before": {
            backgroundColor: palette.gradient.rockGradient,
          },
        },
      },

      {
        props: { figure: GAME_ITEMS.PAPER },
        style: {
          "&::before": {
            backgroundColor: palette.gradient.paperGradient,
          },
        },
      },

      {
        props: { figure: GAME_ITEMS.SCISSORS },
        style: {
          "&::before": {
            backgroundColor: palette.gradient.scissorsGradient,
          },
        },
      },
    ],
  },
});

export default createComponents;
