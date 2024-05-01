// script.js
document.getElementById('scrapeButton').addEventListener('click', async () => {
    // Get the keyword from the input field
    const keyword = document.getElementById('keyword').value.trim();
    if (keyword) {
        try {
            // Scrape data with retry logic
            const data = await scrapeWithRetry(keyword);
            // Log the retrieved data to the console
            console.log(data);
            // Display the results on the UI
            displayResults(data);
        } catch (error) {
            // Handle errors if any occurred during scraping
            console.error('An error occurred:', error);
        }
    }
});

// Asynchronous function to scrape data with retry logic
async function scrapeWithRetry(keyword) {
    // Define the maximum number of retry attempts
    const maxRetries = 3;
    // Define the delay between retry attempts (in milliseconds)
    const retryDelay = 5000;
    // Initialize the retry count
    let retries = 0;

    // Retry fetching data until reaching the maximum number of retries
    while (retries < maxRetries) {
        try {
            // Fetch data from the scraping API endpoint
            const response = await fetch(`http://127.0.0.1:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
            // Parse the response data as JSON
            const data = await response.json();
            // Return the retrieved data
            return data;
        } catch (error) {
            // Log the error occurred during fetching with retry count
            console.error(`An error occurred while fetching data (retry ${retries + 1}):`, error);
            // Increment the retry count
            retries++;
            // Check if further retries are allowed
            if (retries < maxRetries) {
                // Log the retry attempt and delay before next retry
                console.log(`Retrying in ${retryDelay / 1000} seconds...`);
                // Wait for the specified delay before retrying
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    }

    // Throw an error if maximum retries are exceeded
    throw new Error(`Failed to fetch data after ${maxRetries} retries`);
}

// Function to display the scraped results on the UI
function displayResults(data) {
    // Get the container element for displaying results
    const resultsContainer = document.getElementById('results');
    // Clear the existing content of the results container
    resultsContainer.innerHTML = '';

    // Check if the retrieved data contains an error
    if (data.error) {
        // Log and display the error message
        console.error('An error occurred:', data.error);
        resultsContainer.textContent = `An error occurred: ${data.error}`;
    } else if (Array.isArray(data)) {
        // Process and display each product in the retrieved data
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const title = document.createElement('h3');
            title.textContent = product.title;

            const rating = document.createElement('p');
            rating.textContent = `Rating: ${product.rating}`;

            const reviews = document.createElement('p');
            reviews.textContent = `Reviews: ${product.reviews}`;

            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.title;

            productDiv.appendChild(title);
            productDiv.appendChild(rating);
            productDiv.appendChild(reviews);
            productDiv.appendChild(image);

            resultsContainer.appendChild(productDiv);
        });
    } else {
        // Log and display an error for invalid data format
        console.error('Invalid data format:', data);
    }
}
