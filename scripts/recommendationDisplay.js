// Retrieve preferences from localStorage
const storedPreferences = JSON.parse(localStorage.getItem("selectionData"));
console.log(storedPreferences.alcoholPreferences, storedPreferences.caloriePreference);

// Filter cocktails based on alcohol and calorie preferences
const filteredCocktails = cocktails.filter(cocktail => {
  const matchesAlcoholPreference = storedPreferences.alcoholPreferences.includes(cocktail.alcoholPreferences);
  const matchesCaloriePreference = cocktail.caloriePreference === storedPreferences.caloriePreference;
  return matchesAlcoholPreference && matchesCaloriePreference;
});

console.log("Filtered Cocktails:", filteredCocktails);

// Display filtered cocktails in the DOM
const cocktailContainer = document.getElementById('cocktailContainer');
cocktailContainer.innerHTML = ''; // Clear existing content

filteredCocktails.forEach(cocktail => {
  const cocktailElement = document.createElement('div');
  cocktailElement.classList.add('cocktail');
  cocktailElement.innerHTML = `
    <h2>${cocktail.cocktailName}</h2>
    <p>${cocktail.description}</p>
    <p><strong>Calorie Preference:</strong> ${cocktail.caloriePreference}</p>
  `;
  cocktailContainer.appendChild(cocktailElement);
});
