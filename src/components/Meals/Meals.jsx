import { useState, useEffect } from "react";
import MealItem from "./MealItem";

function Meals() {
  const [mealData, setMealData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/meals");
      const resData = await response.json();
      if (!response.ok) {
        setError(true);
        setIsFetching(false);
        return;
      }
      setMealData(resData);
      setIsFetching(false);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {!isFetching &&
        mealData.map((mealItem) => {
          return <MealItem data={mealItem} key={mealItem.id} />;
        })}
    </ul>
  );
}

export default Meals;
