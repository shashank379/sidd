document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("playlist-form");
    const optionSelect = document.getElementById("option");
    const additionalFields = document.getElementById("additional-fields");
    const responseContainer = document.getElementById("response-container");

    // Dynamically update form fields based on the selected option
    optionSelect.addEventListener("change", () => {
        additionalFields.innerHTML = ""; // Clear previous fields

        const option = optionSelect.value;
        if (option === "1") {
            additionalFields.innerHTML = `
                <label for="genre">Enter Genre:</label>
                <input type="text" id="genre" name="genre" placeholder="e.g., Pop, Rock">
            `;
        } else if (option === "3") {
            additionalFields.innerHTML = `
                <label for="danceability">Danceability (0 to 1):</label>
                <input type="number" id="danceability" name="danceability" step="0.1" min="0" max="1">

                <label for="energy">Energy (0 to 1):</label>
                <input type="number" id="energy" name="energy" step="0.1" min="0" max="1">

                <label for="valence">Valence (0 to 1):</label>
                <input type="number" id="valence" name="valence" step="0.1" min="0" max="1">
            `;
        } else if (option === "7") {
            additionalFields.innerHTML = `
                <label for="artist">Enter Artist Name:</label>
                <input type="text" id="artist" name="artist" placeholder="e.g., Adele">
            `;
        }
    });

    // Handle form submission
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Make a POST request to the Flask backend
            const response = await fetch("/create-playlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            if (result.playlist_name) {
                responseContainer.textContent = `Playlist "${result.playlist_name}" created successfully!`;
                responseContainer.style.color = "green";
            } else if (result.error) {
                responseContainer.textContent = `Error: ${result.error}`;
                responseContainer.style.color = "red";
            }
        } catch (error) {
            responseContainer.textContent = `Error: ${error.message}`;
            responseContainer.style.color = "red";
        }
    });
});
