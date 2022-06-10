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
        },
      },
      {
        props: { figure: "rock" },
        style: {
          "&::before": {
            backgroundColor: "#ff0d56",
          },
        },
      },
      {
        props: { figure: "paper" },
        style: {
          "&::before": {
            backgroundColor: "#3e75ff",
          },
        },
      },
      {
        props: { figure: "scissors" },
        style: {
          "&::before": {
            backgroundColor: "#f5b904",
          },
        },
      },
    ],
  },
});

export default createComponents;
