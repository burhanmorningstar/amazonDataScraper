### Amazon Data Scraper

This project implements a web scraping application to extract data from Amazon search results for a given keyword. It provides a simple web interface where users can enter a keyword, initiate the scraping process, and view the extracted product information.

#### Setup Instructions:

1. **Clone the Repository:**
   ```
   git clone https://github.com/burhanmorningstar/amazonDataScraper.git
   ```

2. **Navigate to the Project Directory:**
   ```
   cd amazonDataScraper
   ```

3. **Install Dependencies:**
   ```
   npm install
   ```

#### Running the Application:

1. **Start the Node.js Server:**
   ```
   npm start
   ```

2. **Access the Web Interface:**
   - Open index.html with live server , open a web browser and go to 127.0.0.1:5500/index.html.
   - Enter a keyword in the input field and click the "Scrape" button.
   - The application will fetch data from Amazon and display the results on the page.

#### Project Structure:

- **script.js:** Client-side JavaScript code for handling user interactions and displaying scraped data.
- **index.js:** Node.js server implementation using Express.js to serve the scraping API endpoint and Functions for scraping data from Amazon and extracting relevant information.
- **README.md:** Documentation file providing setup instructions and an overview of the project.
- **index.html:** HTML file defining the structure of the web interface.
- **style.css:** CSS file for styling the web interface.

#### Additional Notes:

- Modify the port configuration in `index.js` and `script.js` if needed.
- Ensure the scraping API endpoint is accessible and returns the expected data format.
- Refer to code comments and relevant documentation for troubleshooting or customization.

#### Resources:

- [Express.js Documentation](https://expressjs.com/): Learn more about setting up a Node.js server with Express.js.
- [MDN Web Docs on Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises): Understand asynchronous JavaScript programming and handling promises.
- Articles on [error handling patterns](https://sourcemaking.com/design_patterns/error_handling) and [retry strategies](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/) for best practices.
