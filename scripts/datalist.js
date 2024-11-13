const alcoholOptions = [
    "Vodka", "Gin", "Tequila", "Rum", "Whiskey", "Brandy", "Cognac", "Wine", "Beer", "Sake", "Soju", "Non-Alcoholic"
];
const styleOptions = [
    "Classic", "Trendy", "Experimental", "Refreshing"
];


let selectedPreferences = []; // Stores selected alcohol preferences
let selectedStyles = []; // Stores selected drink styles

function filterSuggestions(inputId, listId, options) {
    const inputElement = document.getElementById(inputId);
    const datalist = document.getElementById(listId);
    const query = inputElement.value.toLowerCase();

    datalist.innerHTML = ""; // Clear current options

    // If no query, show all options; otherwise, filter options
    const filteredOptions = query ? 
        options.filter(item => item.toLowerCase().includes(query)) : 
        options;

    // Add options to the datalist
    filteredOptions.forEach(filteredItem => {
        const option = document.createElement('option');
        option.value = filteredItem;
        datalist.appendChild(option);
    });
}

function handleAlcoholSelection(selectedValue) {
    if (selectedValue === "Non-Alcoholic") {
        selectedPreferences = ["Non-Alcoholic"];
        document.getElementById("search1").disabled = true;
    } else if (!selectedPreferences.includes(selectedValue)) {
        selectedPreferences.push(selectedValue);
    }
    updateSelectedPreferences();
}

function handleStyleSelection(selectedValue) {
    if (!selectedStyles.includes(selectedValue)) {
        selectedStyles.push(selectedValue);
    }
    updateSelectedPreferences();
}

function removeSelection(option, isAlcohol = true) {
    const list = isAlcohol ? selectedPreferences : selectedStyles;
    const index = list.indexOf(option);
    if (index !== -1) {
        list.splice(index, 1);
        if (isAlcohol && option === "Non-Alcoholic") {
            document.getElementById("search1").disabled = false;
        }
    }
    updateSelectedPreferences();
}

function updateSelectedPreferences() {
    // Display selected alcohol preferences
    const alcoholContainer = document.getElementById("selectedPreferences");
    alcoholContainer.innerHTML = "";
    selectedPreferences.forEach(option => {
        const span = document.createElement("span");
        span.textContent = option;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function () {
            removeSelection(option, true);
        };
        span.appendChild(removeBtn);
        alcoholContainer.appendChild(span);
    });

    // Display selected drink styles
    const styleContainer = document.getElementById("selectedStyles");
    styleContainer.innerHTML = "";
    selectedStyles.forEach(option => {
        const span = document.createElement("span");
        span.textContent = option;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function () {
            removeSelection(option, false);
        };
        span.appendChild(removeBtn);
        styleContainer.appendChild(span);
    });
}

// Attach event listeners to the search inputs
document.getElementById("search1").addEventListener("input", function () {
    filterSuggestions('search1', 'alcoholList', alcoholOptions);
});

// Trigger filter suggestions on focus to show all options initially
document.getElementById("search1").addEventListener("focus", function () {
    filterSuggestions('search1', 'alcoholList', alcoholOptions);
});

document.getElementById("search2").addEventListener("input", function () {
    filterSuggestions('search2', 'styleList', styleOptions);
});

document.getElementById("search2").addEventListener("focus", function () {
    filterSuggestions('search2', 'styleList', styleOptions);
});

// Attach event listeners for selecting options
document.getElementById("search1").addEventListener("change", function () {
    const selectedValue = this.value;
    if (alcoholOptions.includes(selectedValue)) {
        handleAlcoholSelection(selectedValue);
        this.value = ''; // Clear input field after selection
    }
});

document.getElementById("search2").addEventListener("change", function () {
    const selectedValue = this.value;
    if (styleOptions.includes(selectedValue)) {
        handleStyleSelection(selectedValue);
        this.value = ''; // Clear input field after selection
    }
});

// sliding bar for calorie option
function updateCaloriePreference(value) {
    let preference;
    if (value == 1) {
        preference = "Low";
    } else if (value == 2) {
        preference = "Medium";
    } else if (value == 3) {
        preference = "Indulgent";
    }
    document.getElementById("calorieDisplay").textContent = "Selected: " + preference;
    // saveChoice('row5', preference);
}
