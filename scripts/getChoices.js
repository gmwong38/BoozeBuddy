let choices = {};

// Function to save the input from each row
function saveChoice(row, value) {
    choices[row] = value;
}

// // Function to send the choices (for now just logs it)
// function sendData() {
//     console.log('Choices:', choices);
//     // Replace with actual code to send the data to a server
//     // Example: fetch('/submit', { method: 'POST', body: JSON.stringify(choices) });
// }
