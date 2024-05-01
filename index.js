const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Endpoint to handle scraping
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword parameter is required' });
    }

    try {
        // Scraping Amazon search results for the provided keyword
        const html = await scrapeAmazon(keyword);
        // Extracting relevant data from the HTML content
        const data = await extractData(html);
        // Sending the extracted data as JSON response
        res.json(data);
    } catch (error) {
        console.error('An error occurred while scraping Amazon:', error);
        // Handling errors and sending appropriate response
        res.status(500).json({ error: 'An error occurred while scraping Amazon', details: error.message });
    }
});

const axios = require('axios');

// Function to scrape Amazon search results page for a given keyword
async function scrapeAmazon(keyword) {
    try {
        // Sending GET request to Amazon with proper user agent to mimic browser request
        const response = await axios.get(`https://www.amazon.com/s?k=${keyword}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        // Returning HTML content of the response
        return response.data;
    } catch (error) {
        console.error('An error occurred while scraping Amazon:', error);
        // Throwing error for further handling
        throw error;
    }
}

module.exports = { scrapeAmazon };

const { JSDOM } = require('jsdom');

// Function to extract relevant data from Amazon search results HTML
async function extractData(html) {
    const dom = new JSDOM(html);
    const products = dom.window.document.querySelectorAll('div[data-component-type="s-search-result"]');

    const scrapedData = [];

    products.forEach(product => {
        // Extracting title, rating, reviews, and image URL for each product
        const title = product.querySelector('h2').textContent.trim();
        const rating = product.querySelector('span.a-icon-alt')?.textContent.split(' ')[0] || 'N/A';
        const reviews = product.querySelector('span.a-size-base')?.textContent || 'N/A';
        const image = product.querySelector('img')?.getAttribute('src') || 'N/A';

        // Storing the extracted data in an array
        scrapedData.push({
            title,
            rating,
            reviews,
            image
        });
    });

    // Returning the array containing all the extracted data
    return scrapedData;
}

module.exports = { scrapeAmazon, extractData };

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
