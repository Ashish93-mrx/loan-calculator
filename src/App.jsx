import { Routes, Route, Link } from "react-router-dom";
import { AppBar } from "@mui/material";
import LoanCalculator from "./components/LoanCalculator";
import CurrencyConversion from "./components/CurrencyConversion";
import NotFound from "../src/components/NotFound";
import Header from "../src/components/Header";

function App() {
  return (
    <>
      <AppBar position="static">
        <Header />
      </AppBar>

      <Routes>
        <Route path="/" element={<LoanCalculator />} />
        <Route path="/exchange_rates_live" element={<CurrencyConversion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
