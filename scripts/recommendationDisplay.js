// Function to fetch and filter cocktails based on selectionData
function loadAndFilterCocktails() {
  fetch('/assets/cocktails.json')
    .then(response => response.json())
    .then(data => {
      // Retrieve selectionData from localStorage
      const selectionData = JSON.parse(localStorage.getItem('selectionData'));

      if (!selectionData || !selectionData.alcoholPreferences || !Array.isArray(selectionData.alcoholPreferences)) {
        console.error("selectionData or valid alcoholPreferences array not found in localStorage");
        return;
      }

      // Filter cocktails where alcoholPreferences matches any value in selectionData.alcoholPreferences
      const filteredCocktails = data.alcohol.filter(cocktail => 
        selectionData.alcoholPreferences.includes(cocktail.alcoholPreferences)
      );

      // Call a function to display the filtered cocktails on the page
      displayCocktails(filteredCocktails);
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error);
    });
}

// Function to display the filtered cocktails on the page
function displayCocktails(cocktails) {
  const cocktailContainer = document.getElementById('cocktailContainer');
  cocktailContainer.innerHTML = ''; // Clear any previous content

  cocktails.forEach(cocktail => {
    const cocktailDiv = document.createElement('div');
    cocktailDiv.classList.add('cocktail');

    cocktailDiv.innerHTML = `
      <h3>${cocktail["Cocktail Name"]}</h3>
      <p>${cocktail.Description}</p>
      <p><strong>Ingredients:</strong><br>${cocktail.Ingredients.replace(/\n/g, '<br>')}</p>
      <p><strong>Recipe:</strong><br>${cocktail.Recipe.replace(/\n/g, '<br>')}</p>
      <p><strong>Calories:</strong> ${cocktail.Kcal} kcal</p>
      <p><strong>Flavor Profile:</strong> ${cocktail.flavorProfile}</p>
      <img src="${cocktail.Location}" alt="${cocktail["Cocktail Name"]}" class="cocktail-image">
    `;

    cocktailContainer.appendChild(cocktailDiv);
  });
}

// Load and filter cocktails when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadAndFilterCocktails);
