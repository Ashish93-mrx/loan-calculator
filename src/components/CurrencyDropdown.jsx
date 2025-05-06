import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useThemeMode } from "../context/ThemeContextProvider";

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "CAD"];

const CurrencyDropdown = () => {
  const { selectedCurrency, changeCurrency } = useThemeMode();

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="currency-select-label">Currency</InputLabel>
      <Select
        labelId="currency-select-label"
        value={selectedCurrency}
        onChange={(e) => changeCurrency(e.target.value)}
      >
        {currencies.map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencyDropdown;
