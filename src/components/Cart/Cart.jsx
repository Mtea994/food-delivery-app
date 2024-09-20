import { useContext } from "react";
import Modal from "../UI/Modal";
import { currencyFormatter } from "../../utils/formatter";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";
import Button from "../UI/Button";
import CartItem from "./CartItem";
export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleModalClose() {
    hideCart();
  }

  function goToCheckoutHandler() {
    showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleModalClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <hr />
      <p className="cart-total">{currencyFormatter(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleModalClose}>
          Close
        </Button>
        {items.length > 0 && (
          <Button className="button" onClick={goToCheckoutHandler}>
            Proceed To Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
