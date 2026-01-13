import { useEffect, useState } from "react";
import api from "../api/api";
import FoodCard from "../components/FoodCard";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("foods/")
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load food items");
      });
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Menu</h1>

      {foods.length === 0 ? (
        <p className="text-center">No food items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

