// Function to read and process the Excel file and filter based on alcohol preferences
function readExcelFile() {
    // Get the alcohol preferences from localStorage
    const alcoholPreferences = JSON.parse(localStorage.getItem("selectionData")) || [];
    console.log(alcoholPreferences);
    
    if (alcoholPreferences.length === 0) {
      console.log("No alcohol preferences found in localStorage");
      return;
    }
  
    // Fetch the Excel file from the assets folder
    fetch('../assets/cocktails.xlsx')
      .then(response => response.arrayBuffer()) // Get the file as ArrayBuffer
      .then(data => {
        // Parse the Excel file
        const workbook = XLSX.read(data, { type: 'array' });
  
        // Assuming the first sheet contains the data
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
  
        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // header: 1 means treating the first row as headers
  
        // Filter the data based on alcohol preferences
        const filteredCocktails = filterCocktailsByAlcohol(jsonData, alcoholPreferences);
  
        // Display the filtered cocktails
        displayFilteredCocktails(filteredCocktails);
      })
      .catch(error => {
        console.error('Error reading the Excel file:', error);
      });
  }
  
  // Function to filter cocktails based on alcohol preferences
  function filterCocktailsByAlcohol(data, preferences) {
    // Assuming that the alcohol type is in the first column of the sheet
    const alcoholColumnIndex = 0; // Update this index based on your Excel structure
  
    // Filter the cocktails where the alcohol type matches the user's preferences
    return data.filter(row => {
      const alcohol = row[alcoholColumnIndex]; // Get the alcohol type for each cocktail
      return preferences.includes(alcohol); // Check if the alcohol is in the preferences
    });
  }
  
  // Function to display the filtered cocktails
  function displayFilteredCocktails(cocktails) {
    // Check if there are any filtered cocktails
    if (cocktails.length === 0) {
      document.body.insertAdjacentHTML('beforeend', '<p>No cocktails match your preferences.</p>');
    } else {
      // Display each cocktail (you can modify this as per your Excel data structure)
      cocktails.forEach(cocktail => {
        const cocktailName = cocktail[0]; // Update this based on your Excel structure
        document.body.insertAdjacentHTML('beforeend', `<p>Cocktail: ${cocktailName}</p>`);
      });
    }
  }
  
  // Call the function to read the Excel file and process the data
  readExcelFile();
  