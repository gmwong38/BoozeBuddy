// Retrieve preferences from localStorage
const storedPreferences = JSON.parse(localStorage.getItem("selectionData"));
console.log(storedPreferences);

function getFilteredCocktails(cocktails, storedPreferences) {
  // Full match on all criteria
  let filteredCocktails = cocktails.filter(cocktail => {
    const matchesAlcoholPreference = storedPreferences.alcoholPreferences.includes(cocktail.alcoholPreferences);
    const matchesCaloriePreference = cocktail.caloriePreference === storedPreferences.caloriePreference;
    const matchesFlavorProfile = storedPreferences.flavorProfile.includes(cocktail.flavorProfile);
    return matchesAlcoholPreference && matchesCaloriePreference && matchesFlavorProfile;
  });
  
  // If not enough results, remove flavorProfile filter
  if (filteredCocktails.length < 3) {
    filteredCocktails = cocktails.filter(cocktail => {
      const matchesAlcoholPreference = storedPreferences.alcoholPreferences.includes(cocktail.alcoholPreferences);
      const matchesCaloriePreference = cocktail.caloriePreference === storedPreferences.caloriePreference;
      return matchesAlcoholPreference && matchesCaloriePreference;
    });
  }
  
  // If still not enough results, remove caloriePreference filter
  if (filteredCocktails.length < 3) {
    filteredCocktails = cocktails.filter(cocktail => {
      const matchesAlcoholPreference = storedPreferences.alcoholPreferences.includes(cocktail.alcoholPreferences);
      return matchesAlcoholPreference;
    });
  }

  // If still more than 3, randomly pick 3
  while (filteredCocktails.length > 3) {
    filteredCocktails.splice(Math.floor(Math.random() * filteredCocktails.length), 1);
  }

  // Return the filtered list (guaranteed to have exactly 3 results)
  return filteredCocktails;
}

// Example usage
const filteredCocktails = getFilteredCocktails(cocktails, storedPreferences);

// Display filtered cocktails in the DOM
const cocktailContainer = document.getElementById('cocktailContainer');
cocktailContainer.innerHTML = ''; // Clear existing content

filteredCocktails.forEach(cocktail => {
  // Create a wrapper for each cocktail
  const cocktailElement = document.createElement('div');
  cocktailElement.classList.add('cocktail');

  // Function to replace newlines (\n) with <br> tags
  function formatTextWithLineBreaks(text) {
    return text.replace(/\n/g, "<br>");
  }

  const alcoholIcon = `<i class="fas fa-wine-glass alcohol-icon"></i> ${cocktail.alcoholPreferences}`;
  const kcalIcon = `<i class="fas fa-calculator kcal-icon"></i> ${cocktail.Kcal} Kcal`;
  
  cocktailElement.innerHTML = `
    <img src="${cocktail.location}" class="cocktail-image">
    <div class="cocktail-details">
      <h2>${cocktail.cocktailName}</h2>
      <div class="alcohol-and-kcal">
        <span>${alcoholIcon}</span>
        <span>${kcalIcon}</span>
      </div>
        <p class="cocktail-description">${cocktail.description}</p>
      <button class="toggle-button">How to make</button>
      <div class="collapsible-content">
        <p><strong>Ingredients<br></strong>${formatTextWithLineBreaks(cocktail.ingredients)}</p>
        <p><strong>Recipe<br></strong>${formatTextWithLineBreaks(cocktail.recipe)}</p>
      </div>
    </div>
  `;
  

  // Add event listeners for collapsible functionality
  const toggleButtons = cocktailElement.querySelectorAll('.toggle-button');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const collapsibleContent = button.nextElementSibling;
      collapsibleContent.classList.toggle('collapsed');
    });
  });

  // Append to the container
  cocktailContainer.appendChild(cocktailElement);
});
