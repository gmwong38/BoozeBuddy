// Retrieve preferences from localStorage
const storedPreferences = JSON.parse(localStorage.getItem("selectionData"));
console.log(storedPreferences);

function getFilteredCocktails(cocktails, storedPreferences) {
  // Step 1: Full match on all criteria
  let filteredCocktails = cocktails.filter(cocktail => {
    const matchesAlcoholPreference = storedPreferences.alcoholPreferences.includes(cocktail.alcoholPreferences);
    const matchesCaloriePreference = cocktail.caloriePreference === storedPreferences.caloriePreference;
    const matchesFlavorProfile = storedPreferences.flavorProfile.includes(cocktail.flavorProfile);
    console.log(matchesAlcoholPreference && matchesCaloriePreference && matchesFlavorProfile);
    return matchesAlcoholPreference && matchesCaloriePreference && matchesFlavorProfile;
  });
  
  // Step 2: If not enough results, remove flavorProfile filter
  if (filteredCocktails.length < 3) {
    filteredCocktails = cocktails.filter(cocktail => {
      const matchesAlcoholPreference = storedPreferences.alcoholPreferences.includes(cocktail.alcoholPreferences);
      const matchesCaloriePreference = cocktail.caloriePreference === storedPreferences.caloriePreference;
      console.log(matchesAlcoholPreference && matchesCaloriePreference);
      return matchesAlcoholPreference && matchesCaloriePreference;
    });
  }
  
  // Step 3: If still not enough results, remove caloriePreference filter
  if (filteredCocktails.length < 3) {
    filteredCocktails = cocktails.filter(cocktail => {
      const matchesAlcoholPreference = storedPreferences.alcoholPreferences.includes(cocktail.alcoholPreferences);
      return matchesAlcoholPreference;
    });
  }

  // Step 4: If still more than 3, randomly pick 3
  while (filteredCocktails.length > 3) {
    filteredCocktails.splice(Math.floor(Math.random() * filteredCocktails.length), 1);
  }

  // Return the filtered list (guaranteed to have exactly 3 results)
  return filteredCocktails;
}

// Example usage
const filteredCocktails = getFilteredCocktails(cocktails, storedPreferences);

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
    <p>${cocktail.ingredients}</p>
    <p>${cocktail.recipe}</p>
  `;
  cocktailContainer.appendChild(cocktailElement);
});
