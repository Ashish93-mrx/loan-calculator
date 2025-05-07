import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import useLoanCalculator from "../hooks/useLoanCalculator";
import CurrencyDropdown from "./CurrencyDropdown";
import useExchangeRates from "../hooks/useExchangeRates";
import { useThemeMode } from "../context/ThemeContextProvider";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);
  const [principalError, setPrincipalError] = useState("");
  const [rateError, setRateError] = useState("");
  const [yearsError, setYearsError] = useState("");
  const { selectedCurrency } = useThemeMode();
  const { rates, loading } = useExchangeRates();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rateMultiplier, setRateMultiplier] = useState(null);
  const [localMonthlyEmi, setLocalMonthlyEmi] = useState(null);
  const [localAmortization, setLocalAmortization] = useState([]);

  const { monthlyEMI, amortizationSchedule, calculateEMI } =
    useLoanCalculator();

  const numberInputStyles = {
    "& input[type=number]::-webkit-outer-spin-button": { display: "none" },
    "& input[type=number]::-webkit-inner-spin-button": { display: "none" },
    "& input[type=number]": { MozAppearance: "textfield" },
  };

  let dollarsMonthlyEmi = monthlyEMI;
  const handleCalculate = () => {
    let hasError = false;

    if (principal === "") {
      setPrincipalError("Principal cannot be empty");
      hasError = true;
    } else if (Number(principal) <= 0) {
      setPrincipalError("Principal must be positive");
      hasError = true;
    } else {
      setPrincipalError("");
    }

    if (rate === "") {
      setRateError("Rate cannot be empty");
      hasError = true;
    } else if (Number(rate) <= 0) {
      setRateError("Rate must be positive");
      hasError = true;
    } else {
      setRateError("");
    }

    if (years === "") {
      setYearsError("Tenure cannot be empty");
      hasError = true;
    } else if (Number(years) <= 0) {
      setYearsError("Tenure must be positive");
      hasError = true;
    } else {
      setYearsError("");
    }

    if (!hasError) {
      calculateEMI(principal, rate, years);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const columns = ["Month", "Principal", "Interest", "Remaining Balance"];

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setYears("");
    setPrincipalError("");
    setRateError("");
    setYearsError("");
    calculateEMI(0, 0, 0);
  };

  useEffect(() => {
    setLocalMonthlyEmi(monthlyEMI);
    setLocalAmortization(amortizationSchedule);
    setRateMultiplier(
      selectedCurrency === "USD" ? 1 : rates[selectedCurrency] || 1
    );
  }, [selectedCurrency, monthlyEMI, amortizationSchedule]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="left">
        Loan EMI Calculator
      </Typography>

      <Box component={Paper} p={3} mb={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="number"
              value={principal}
              error={!!principalError}
              helperText={principalError}
              onChange={(e) => setPrincipal(e.target.value)}
              margin="normal"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              sx={numberInputStyles}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Interest Rate (%)"
              type="number"
              value={rate}
              error={!!rateError}
              helperText={rateError}
              onChange={(e) => setRate(e.target.value)}
              margin="normal"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              sx={numberInputStyles}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Term (Years)"
              type="number"
              value={years}
              error={!!yearsError}
              helperText={yearsError}
              onChange={(e) => setYears(e.target.value)}
              margin="normal"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              sx={numberInputStyles}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: "left", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Calculate EMI
        </Button>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <CurrencyDropdown />
        <h4>
          Converted EMI:{" "}
          {localMonthlyEmi &&
          selectedCurrency !== "USD" &&
          rates[selectedCurrency]
            ? (localMonthlyEmi * rates[selectedCurrency]).toFixed(2)
            : localMonthlyEmi ?? 0}
          {selectedCurrency}
        </h4>
        <Button variant="contained" onClick={() => handleReset()}>
          Reset Table
        </Button>
      </Box>

      {amortizationSchedule?.length > 0 && localMonthlyEmi != null && (
        <Box component={Paper} p={3} mb={4}>
          <Typography variant="h6">
            Monthly EMI: $ {dollarsMonthlyEmi}
          </Typography>
        </Box>
      )}

      {amortizationSchedule?.length > 0 && (
        <Box component={Paper} p={3}>
          <Typography variant="h6" gutterBottom>
            Amortization Schedule
          </Typography>

          <TableContainer sx={{ overflowX: "auto", maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col}>
                      <strong>{col}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {localAmortization
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.month}</TableCell>
                      <TableCell>
                        {(item.principalComponent * rateMultiplier).toFixed(2)}{" "}
                        {selectedCurrency}
                      </TableCell>
                      <TableCell>
                        {(item.interestComponent * rateMultiplier).toFixed(2)}{" "}
                        {selectedCurrency}
                      </TableCell>
                      <TableCell>
                        {(item.remainingBalance * rateMultiplier).toFixed(2)}{" "}
                        {selectedCurrency}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <FormControl size="small">
              <InputLabel>Rows per page</InputLabel>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                label="Rows per page"
              >
                {[5, 10, 20, 50].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Pagination
              count={Math.ceil(amortizationSchedule.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default LoanCalculator;
