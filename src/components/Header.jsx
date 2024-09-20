import { useContext, useState } from "react";
import Logo from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import React from "react";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

function Header() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [openCart, setOpenCart] = useState(false);
  const totalNumberOfCartItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleCartClick() {
    userProgressCtx.showCart();
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={Logo} alt="logo" />
          <h1>Morhshe</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleCartClick}>
            Cart({totalNumberOfCartItems})
          </Button>
        </nav>
      </header>
    </>
  );
}

export default Header;
