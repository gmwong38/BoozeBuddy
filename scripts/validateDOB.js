function validateDOB(event) {
    const dobInput = document.querySelector('.dob-input').value;
    const today = new Date();
    const birthDate = new Date(dobInput);

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // If the age is less than 18, prevent form submission and show an error dialog
    if (age < 18) {
        event.preventDefault(); // Prevent form submission
        
        // Create modal with error message and GIF
        const errorModal = document.createElement('div');
        errorModal.classList.add('error-modal');
        
        const errorContent = `
            <div class="error-message">
                <p>You must be at least 18 years old to proceed.</p>
                <img src="https://media.tenor.com/FVvN-n6Z028AAAAM/apt-ros%C3%A9.gif" alt="Error GIF" />
                <button class="close-btn">Close</button>
            </div>
        `;
        
        errorModal.innerHTML = errorContent;
        document.body.appendChild(errorModal);
        
        // Add event listener to the close button
        const closeButton = errorModal.querySelector('.close-btn');
        closeButton.addEventListener('click', () => {
            errorModal.remove(); // Remove the modal when the close button is clicked
        });
    }
}
