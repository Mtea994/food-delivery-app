import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatter";
import useHttp from "../hooks/useHttp";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", config);

  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleModalClose() {
    hideCheckout();
  }

  function handleFinishCheckout() {
    clearCart();
    clearData();
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleModalClose}>
        Close
      </Button>
      <Button className="button">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinishCheckout}>
        <h2>Success!</h2>
        <p>Your Order was Submitted Successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <div className="modal-actions">
          <Button type="button" onClick={handleFinishCheckout}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleModalClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter(cartTotal)}</p>
        <div>
          <Input label={"Full Name"} id="name" type="text" />
          <Input label={"E-mail Address"} id="email" type="email" />
          <Input label={"Street"} id="street" type="text" />
          <div className="control-row">
            <Input label={"Postal Code"} id="postal-code" type="text" />
            <Input label={"City"} id="city" type="text" />
          </div>
        </div>
        {error && <ErrorPage tile="failed to submit order" message={error} />}
        <div className="modal-actions">{actions}</div>
      </form>
      ;
    </Modal>
  );
}

export default Checkout;
