import React, { useState } from "react";
import useExchangeRates from "../hooks/useExchangeRates";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useThemeMode } from "../context/ThemeContextProvider";

const CurrencyConversion = () => {
  const { rates, loading, error } = useExchangeRates();
  const { selectedCurrency } = useThemeMode();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const currencyData = Object.entries(rates).map(([currency, rate]) => ({
    currency,
    rate,
  }));

  const paginatedData = currencyData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress color="primary" />
        <Typography variant="subtitle1" sx={{ ml: 2 }}>
          Fetching exchange rates...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!currencyData.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert severity="warning">
          No exchange rate data available at the moment.
        </Alert>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
      Live Exchange Rates (Base: {selectedCurrency})
      </Typography>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Currency</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Rate</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(({ currency, rate }) => (
              <TableRow key={currency}>
                <TableCell>{currency}</TableCell>
                <TableCell align="right">{rate.toFixed(2)}</TableCell>
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
          count={Math.ceil(currencyData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default CurrencyConversion;
