import { json } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080';

function safeFetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}

async function fetchIngredient(category, name) {
  const url = `${API_BASE_URL}/${category}s/${name}`;
  const data = await safeFetchJson(url);
  return { [name]: data };
}

async function fetchCategoryIngredients(category) {
  const names = await safeFetchJson(`${API_BASE_URL}/${category}s`);
  const ingredientPromises = names.map((name) =>
    fetchIngredient(category, name)
  );
  const ingredients = await Promise.all(ingredientPromises);
  return Object.assign({}, ...ingredients);
}

async function inventoryLoader() {
  const categories = ['foundation', 'protein', 'extra', 'dressing'];
  const categoryPromises = categories.map(fetchCategoryIngredients);
  const categoryResults = await Promise.all(categoryPromises);
  const inventory = Object.assign({}, ...categoryResults);
  return inventory;
}

export default inventoryLoader;
