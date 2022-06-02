export const createOverrides = (/* theme */) => ({
  MuiTypography: {
    root: {
      letterSpacing: 2,
    },
  },

  MuiButton: {
    root: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1.2rem",
      letterSpacing: "0.2rem",
      padding: "0.5rem 0",
      color: "#1b2b4c",
      backgroundColor: "#f3f3f3",
      width: "15rem",
      height: "3rem",
      boxSizing: "border-box",
      "&:hover": {
        color: "#cf0808",
        backgroundColor: "#f3f3f3",
      },
    },
  },

});

export default createOverrides;
