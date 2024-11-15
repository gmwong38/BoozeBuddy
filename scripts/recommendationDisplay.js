// Retrieve alcohol preferences from localStorage
const storedPreferences = JSON.parse(localStorage.getItem("selectionData"));
console.log(storedPreferences);


console.log(global_cocktails.cocktails);

// Filter cocktails based on preferences, e.g., alcohol preference
const filteredCocktails = cocktails.filter(cocktail =>
    cocktail.alcoholPreferences === "Gin"
);

console.log("Filtered Cocktails:", filteredCocktails);

// Display filtered cocktails in the DOM
const cocktailContainer = document.getElementById('cocktailContainer');

filteredCocktails.forEach(cocktail => {
    const cocktailElement = document.createElement('div');
    cocktailElement.classList.add('cocktail');
    cocktailElement.innerHTML = `
        <h2>${cocktail.name}</h2>
        <p>${cocktail.description}</p>
    `;
    cocktailContainer.appendChild(cocktailElement);
});
