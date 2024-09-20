import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatter";

function Checkout() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleModalClose() {
    hideCheckout();
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleModalClose}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter(cartTotal)}</p>
        <div>
          <Input label={"Full Name"} id="full-name" type="text" />
          <Input label={"E-mail"} id="email" type="email" />
          <Input label={"Street"} id="address" type="text" />
          <div className="control-row">
            <Input label={"Postal Code"} id="postal-code" type="text" />
            <Input label={"City"} id="city" type="text" />
          </div>
        </div>
        <div className="modal-actions">
          <Button textOnly type="button" onClick={handleModalClose}>
            Close
          </Button>
          <Button className="button">Submit Order</Button>
        </div>
      </form>
      ;
    </Modal>
  );
}

export default Checkout;
