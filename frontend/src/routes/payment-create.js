import { useNavigate } from "react-router";
import { usePayment } from "../hooks/usePayment";
import { Alert } from "../components";

function PaymentCreate() {
  const navigate = useNavigate();
  const { createData, error } = usePayment();

  // The payment can be created with `POST /api/payments`
  const submit = async (ev) => {
    ev.preventDefault();

    // Create object with new payment details from the submitted form.
    const payment = Object.fromEntries(new FormData(ev.target));
    const returnValue = await createData(payment);
    if (returnValue) {
      navigate("/");
    }
  };

  const handleClick = () => {
    navigate("/");
  }

  return (
    <>
    <form onSubmit={submit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Card Number</label>
        <input type="text" name="cardNumber" required />
      </div>
      <div>
        <label>Currency</label>
        <select name="currency" required>
          <option value="BRL">BRL</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div>
        <label>Amount</label>
        <input type="text" name="amount" required />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
      <Alert message={error} />
    </form>
    <div>
      <button onClick={handleClick}>Voltar</button>
    </div>
    </>
  );
}

export default PaymentCreate;
