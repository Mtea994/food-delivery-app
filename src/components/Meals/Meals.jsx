import MealItem from "./MealItem";
import useHttp from "../../hooks/useHttp";
import ErrorMessage from "../Error";

const config = {};

function Meals() {
  // const [mealData, setMealData] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState(false);

  const {
    data: mealData,
    isLoading: isFetching,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     setIsFetching(true);
  //     const response = await fetch("http://localhost:3000/meals");
  //     const resData = await response.json();
  //     if (!response.ok) {
  //       setError(true);
  //       setIsFetching(false);
  //       return;
  //     }
  //     setMealData(resData);
  //     setIsFetching(false);
  //   }
  //   fetchMeals();
  // }, []);

  if (isFetching) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <ErrorMessage title={"Failed to Fetch Meals"} message={error} />;
  }
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
