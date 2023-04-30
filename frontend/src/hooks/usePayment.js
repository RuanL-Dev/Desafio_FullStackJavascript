import { useState } from "react";

export function usePayment() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setError(undefined);
    setLoading(true);
    try {
      const data = await fetch("http://localhost:3001/api/payments");
      const raw = await data.json();
      raw.error ? setError(raw.error) : setPayments(raw.payments);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function createData(payload) {
    setError(undefined);
    setLoading(true);

    let returnValue;
    try {
      const data = await fetch("http://localhost:3001/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      const raw = await data.json();
      if (raw.error) {
        setError(raw.error);
        return returnValue;
      }
      returnValue = raw;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    return returnValue;
  }

  return {
    error,
    payments,
    loading,
    fetchData,
    createData,
  };
}
