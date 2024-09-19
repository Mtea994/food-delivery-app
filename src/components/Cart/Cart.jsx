import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";

export default function Cart() {
  const { items } = useContext(CartContext);
  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  return (
    <Modal className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li className="cart-item" key={item.id}>
            <p>
              {item.name} - {item.price}
            </p>
          </li>
        ))}
      </ul>
      <hr />
      <p className="cart-total">{cartTotal}</p>
      <div className="cart-item-actions">
        <Button textonly>Cancel</Button>
        <Button className="button">Proceed To Checkout</Button>
      </div>
    </Modal>
  );
}
