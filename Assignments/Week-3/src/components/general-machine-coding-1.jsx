/*
6th Question

General Machine Coding

Build a simple mortgage calculator widget that takes in a loan amount, interest rate, loan term, and calculates the monthly mortgage payment, total payment amount, and total interest paid.


RequirementsThe user should be able to enter:

1. Loan amount ($)
2. Annual interest rate (%). This is also known as the annual percentage rate (APR)
3. Loan term (in years)

Using the inputs, the calculator should compute the following and display the results to the user:

1. Monthly mortgage payment
2. Total payment amount
3. Total interest paid

If a non-numerical string is entered into any input field, the calculator should display an error message. Additionally, the calculator should handle any other invalid inputs that may arise.

Round the result amounts to 2 decimal places.(The last two requirements might not be given to you during interviews, you're expected to clarify.

The formula for calculating the monthly payment is:

M = P(i(1+i)n)/((1+i)n - 1)

M: Monthly mortgage payment
P: Loan amounti: Monthly interest rate (APR / 12)
n: Total number of payments (loan term in years x 12)


 */

import { useState } from "react";

function Field({ name, value, handleFieldChange, error, displayName }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label htmlFor={name}>{displayName}</label>
      <input id={name} value={value ?? ""} onChange={handleFieldChange} />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

export default function MortagageCalculator() {
  const [data, setData] = useState({
    loanAmount: "",
    annualInterestRate: "",
    loanTerm: "",
  });
  const [error, setError] = useState({});
  const [result, setResult] = useState(null);
  const onFieldChange = (e) => {
    if (result !== null) setResult(null);
    const fieldName = e.target.id;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [fieldName]: value }));
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      setError((prevError) => ({
        ...prevError,
        [fieldName]: "Invalid Input",
      }));
    } else if (error[fieldName]) {
      const updatedError = { ...error };
      delete updatedError[fieldName];
      setError(updatedError);
    }
  };

  const onCalculateMortagage = () => {
    const montlyInterestRate = data.annualInterestRate / 12;
    const montlyInterestRateInPercent = montlyInterestRate / 100;
    const numberOfPayments = data.loanTerm * 12;
    const loanAmount = data.loanAmount;
    const expression = Math.pow(
      1 + montlyInterestRateInPercent,
      numberOfPayments,
    );
    const numerator = loanAmount * montlyInterestRateInPercent * expression;
    const denominator = expression - 1;
    const monthlyMortagagePayment = numerator / denominator;
    const totalPayment = monthlyMortagagePayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    setResult({
      monthlyMortagagePayment: monthlyMortagagePayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };
  return (
    <div
      style={{
        margin: "auto",
        width: "min-content",
        minWidth: "15rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Field
        name="loanAmount"
        displayName="Loan Amount ($)*"
        value={data.loanAmount}
        error={error["loanAmount"]}
        handleFieldChange={onFieldChange}
      />
      <Field
        name="annualInterestRate"
        displayName="Annual interest rate (%)*"
        value={data.annualInterestRate}
        error={error["annualInterestRate"]}
        handleFieldChange={onFieldChange}
      />
      <Field
        name="loanTerm"
        displayName="Loan term (in years)*"
        value={data.loanTerm}
        error={error["loanTerm"]}
        handleFieldChange={onFieldChange}
      />
      <button
        onClick={onCalculateMortagage}
        disabled={
          Object.keys(error).length > 0 ||
          Object.values(data).some((val) => !val?.trim())
        }
        style={{ width: "min-content", alignSelf: "center" }}
      >
        Calculate
      </button>
      {result && (
        <>
          <div>
            Monthly Mortagage payment: <br />
            <b>{result.monthlyMortagagePayment}</b>
          </div>
          <div>
            Total Payment Amount: <br />
            <b>{result.totalPayment}</b>
          </div>
          <div>
            Total Interest Paid: <br />
            <b>{result.totalInterest}</b>
          </div>
        </>
      )}
    </div>
  );
}

/*
1st Attempt - Referred Mortage formula and other terms of Mortagage
Also referred toFixed function

Time taken - 1hr
 */
