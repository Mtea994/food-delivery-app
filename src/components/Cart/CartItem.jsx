import React from "react";
import { currencyFormatter } from "../../utils/formatter";
import CartContext from "../../store/CartContext";

export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <button>{item.quantity}</button>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
