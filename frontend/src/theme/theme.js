import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        primary: {
            main: "#2563eb",
        },

        secondary: {
            main: "#7c3aed",
        },

        background: {
            default: "#f8fafc",
        },

    },

    typography: {

        fontFamily: "Inter, sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

    },

});

export default theme;