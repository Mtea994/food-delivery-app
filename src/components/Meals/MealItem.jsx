import { useContext } from "react";
import { currencyFormatter } from "../../utils/formatter";
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";

function MealItem({ data }) {
  const { addItem } = useContext(CartContext);

  function addItemHandler() {
    addItem(data);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${data.image}`} alt={data.image} />
        <div>
          <h3>{data.name}</h3>
          <p className="meal-item-price">{currencyFormatter(data.price)}</p>
          <p className="meal-item-description">{data.description}</p>
        </div>
        <p className="meal-item-action">
          <Button className={"button"} onClick={addItemHandler}>
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
}
export default MealItem;
