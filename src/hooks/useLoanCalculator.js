import { useState } from "react";

const useLoanCalculator = () => {
  const [monthlyEMI, setMonthlyEMI] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = (
    principalAmount,
    annualInterestRate,
    loanTenureYears
  ) => {
    const totalMonths = loanTenureYears * 12;
    const monthlyInterestRate = annualInterestRate / 12 / 100;

    const emi =
      (principalAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    const paymentSchedule = [];
    let remainingBalance = principalAmount;
    let totalInterestPaid = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const interestForMonth = remainingBalance * monthlyInterestRate;
      const principalForMonth = emi - interestForMonth;
      remainingBalance -= principalForMonth;
      totalInterestPaid += interestForMonth;

      paymentSchedule.push({
        month,
        principalComponent: Number(principalForMonth.toFixed(2)),
        interestComponent: Number(interestForMonth.toFixed(2)),
        remainingBalance: Number(
          remainingBalance > 0 ? remainingBalance.toFixed(2) : 0
        ),
      });
    }

    const totalPaymentAmount = emi * totalMonths;

    setMonthlyEMI(Number(emi.toFixed(2)));
    setAmortizationSchedule(paymentSchedule);
    setTotalPayment(Number(totalPaymentAmount.toFixed(2)));
    setTotalInterest(Number(totalInterestPaid.toFixed(2)));
  };

  return {
    monthlyEMI,
    amortizationSchedule,
    totalPayment,
    totalInterest,
    calculateEMI,
  };
};

export default useLoanCalculator;
