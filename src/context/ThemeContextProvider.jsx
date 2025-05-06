import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const changeCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider
      value={{ mode, toggleTheme, selectedCurrency, changeCurrency }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        {console.log(selectedCurrency, "main currency2")}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
