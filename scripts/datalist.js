// Example list of alcohol options
const alcoholOptions = [
    "Vodka", "Gin", "Tequila", "Rum", "Whiskey", "Brandy", "Cognac", "Wine", "Beer", "Sake", "Soju", "Non-Alcoholic"
];

let selectedPreferences = []; // Stores selected preferences

// Function to filter the datalist based on the user's input
function filterSuggestions(inputId, listId) {
    const inputElement = document.getElementById(inputId);
    const datalist = document.getElementById(listId);
    const query = inputElement.value.toLowerCase();

    // Clear current options in the datalist
    datalist.innerHTML = "";

    // Add filtered options to the datalist
    alcoholOptions.filter(item => item.toLowerCase().includes(query)).forEach(filteredItem => {
        const option = document.createElement('option');
        option.value = filteredItem;
        datalist.appendChild(option);
    });
}

// Function to handle the selection of an option
function handleSelection(selectedValue) {
    // If "Non-Alcoholic" is selected, disable other selections
    if (selectedValue === "Non-Alcoholic") {
        selectedPreferences = ["Non-Alcoholic"];
        document.getElementById("search1").disabled = true;
    } else if (!selectedPreferences.includes(selectedValue)) {
        selectedPreferences.push(selectedValue);
    }

    updateSelectedPreferences();
}

// Function to remove a selected option
function removeSelection(option) {
    const index = selectedPreferences.indexOf(option);
    if (index !== -1) {
        selectedPreferences.splice(index, 1);
        if (option === "Non-Alcoholic") {
            document.getElementById("search1").disabled = false; // Re-enable input if Non-Alcoholic is removed
        }
    }
    updateSelectedPreferences();
}

// Function to update the displayed selected preferences
function updateSelectedPreferences() {
    const selectedContainer = document.getElementById("selectedPreferences");
    selectedContainer.innerHTML = ""; // Clear current selections

    selectedPreferences.forEach(option => {
        const span = document.createElement("span");
        span.textContent = option;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function () {
            removeSelection(option);
        };

        span.appendChild(removeBtn);
        selectedContainer.appendChild(span);
    });
}

// Attach an event listener to the search input field to call the filterSuggestions function
document.getElementById("search1").addEventListener("input", function () {
    filterSuggestions('search1', 'alcoholList');
});

// Attach event listener for selecting an option
document.getElementById("search1").addEventListener("change", function () {
    const selectedValue = this.value;
    if (alcoholOptions.includes(selectedValue)) {
        handleSelection(selectedValue);
        this.value = ''; // Clear input field after selection
    }
});
