// Fetch the JSON file
fetch('/assets/cocktails.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.status}`);
        }
        return response.json(); // Parse JSON content
    })
    .catch(error => console.error('Error loading cocktails:', error));