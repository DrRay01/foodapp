import { useState } from "react";
import { useEffect } from "react";
import ItemList from "./ItemList";
import styles from "./fooddetails.module.css";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "64a23d48ae9c4707b79dbf9ba5e4f4ed";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>
              ⏰Food will be ready in {food.readyInMinutes} minutes
            </strong>
          </span>
          <span>👩‍👧‍👦Serves{food.servings}</span>
          <span>
            <strong>
              {food.vegetarian ? "🥕Vegetarian" : "🥩Non vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐮Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          ¢
          <span>
            <strong>{food.pricePerServing / 100} per serving</strong>
          </span>
        </div>
        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />

        <h2>Instructions</h2>
        <div className={styles.recipeInstruction}>
          <ol>
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.steps}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
