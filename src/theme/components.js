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
          width: "5rem",
          height: "5rem",
          borderRadius: "50%",
          overflow: "hidden",
          border: "1rem solid #f5b904",
          backgroundColor: palette.button.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          "&:hover": {
            backgroundColor: palette.button.background,
          },
        },
      },
    ],
  },
});

export default createComponents;
