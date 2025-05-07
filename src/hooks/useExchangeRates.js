import { useEffect, useState } from "react";
import axios from "axios";
import { EXCHANGE_RATE_API } from "../utils/constants";
import { useThemeMode } from "../context/ThemeContextProvider";

const useExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCurrency } = useThemeMode();

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(EXCHANGE_RATE_API + 'USD');
        setRates(response.data.conversion_rates);
      } catch (error) {
        setError("Failed to fetch exchange rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [selectedCurrency]);

  return { rates, loading, error };
};

export default useExchangeRates;
