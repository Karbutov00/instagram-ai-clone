import { createTheme } from "@mui/material/styles";

const AIOTheme = createTheme({
    palette: {
        primary: {
            main: "#05050B", // very dark blue
        },
        secondary: {
            main: "rgba(5, 5, 11, 0.5)", // very dark blue with 50% transparency
        },
        error: {
            main: "#DD591B", // orange
        },
        warning: {
            main: "#6A9290", // greenish gray
        },
        info: {
            main: "#01567A", // dark blue
        },
        success: {
            main: "#4E4346", // dark gray
        },
        background: {
            default: "#EDEDED", // light gray
            paper: "#F6F8FC", // white
        },
        text: {
            primary: "#05050B", // very dark blue
            secondary: "#B6B7BC", // light gray
            disabled: "#6A9290", // greenish gray
        },
    },
    typography: {
        fontFamily: [
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
        ].join(","),
        h1: {
            fontWeight: 700,
            fontSize: "4.5rem",
            lineHeight: 1.2,
            letterSpacing: "-0.01562em",
        },
        h2: {
            fontWeight: 700,
            fontSize: "3.5rem",
            lineHeight: 1.2,
            letterSpacing: "-0.00833em",
        },
        h3: {
            fontWeight: 700,
            fontSize: "2.5rem",
            lineHeight: 1.2,
            letterSpacing: "0em",
        },
        h4: {
            fontWeight: 700,
            fontSize: "1.75rem",
            lineHeight: 1.2,
            letterSpacing: "0.00735em",
        },
        h5: {
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.2,
            letterSpacing: "0em",
        },
        h6: {
            fontWeight: 700,
            fontSize: "1.25rem",
            lineHeight: 1.2,
            letterSpacing: "0.0075em",
        },
        subtitle1: {
            fontWeight: 400,
            fontSize: "1.25rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
        },
        subtitle2: {
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.57,
            letterSpacing: "0.00714em",
        },
        body1: {
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
        },
        body2: {
            fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
        },
        button: {
            fontWeight: 700,
            fontSize: "0.875rem",
            lineHeight: 1.75,
            letterSpacing: "0.02857em",
            textTransform: "none",
        },
        caption: {
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.0,
            letterSpacing: "0.03333em",
        },
        overline: {
            fontWeight: 700,
            fontSize: "0.75rem",
            lineHeight: 2.66,
            letterSpacing: "0.08333em",
            textTransform: "uppercase",
        },
    },
});

export default AIOTheme;
