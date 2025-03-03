const baseId = "apphESc74bJHeT81r";
const tableId = "tbll3eDFHff1DsgEa";
const apiKey =
  "patfgfscWJv0YWCiF.618b33069ff9120639f687e92d4a366413c1e40e55659e216c556f716c1b9418";
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

// Fetch quotes from Airtable API
let allQuotes = []; // Cache the quotes

// Fetch quotes from Airtable API
async function fetchQuotes() {
  const maxRecords = 1000;
  let offset = null;
  let progress = 10; // Initial progress percentage

  try {
    // Update the loading percentage every 1 second
    const updateProgressInterval = setInterval(() => {
      if (progress < 100) {
        progress += Math.random() * 10; // Increase progress
        document.getElementById("loading-percentage").textContent = `${Math.min(
          Math.floor(progress),
          100
        )}%`;
      }
    }, 1000);

    // Fetch quotes until we reach the maxRecords (2000 quotes)
    while (allQuotes.length < maxRecords) {
      const response = await fetch(
        `${apiUrl}?pageSize=100${offset ? `&offset=${offset}` : ""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      allQuotes.push(...data.records);
      offset = data.offset;

      // If no more records, break the loop
      if (!offset) break;
    }

    // Limit to 2000 quotes if there are more than 2000 records
    allQuotes = allQuotes.slice(0, maxRecords);

    // Clear the interval once fetching is done and the percentage reaches 100%
    clearInterval(updateProgressInterval);

    // Ensure the percentage reaches 100%
    document.getElementById("loading-percentage").textContent = "100%";
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// Display random quote
// Display random quote from the cached quotes
function displayRandomQuote() {
  if (allQuotes.length === 0) return; // If quotes are not loaded, return

  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  const randomQuote = allQuotes[randomIndex].fields;

  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const refreshButton = document.getElementById("refresh");

  // Fade out the current quote, author, and refresh button
  quoteElement.classList.remove("visible");
  authorElement.classList.remove("visible");
  refreshButton.classList.remove("visible");

  // Wait for the fade-out transition to complete before updating content
  setTimeout(function () {
    // Update the quote content dynamically
    quoteElement.textContent = randomQuote.quote || "No quote available.";
    authorElement.textContent = `— ${randomQuote.author || "Unknown"}`;

    // Fade in the new quote, author, and refresh button
    quoteElement.classList.add("visible");
    authorElement.classList.add("visible");
    refreshButton.classList.add("visible");
  }, 1000); // This matches the transition duration (1s)

  // Update background color
  let hue = Math.floor(Math.random() * 360); // Random initial hue
  document.body.style.backgroundColor = `hsl(${hue}, 72%, 85%)`;

  // Update logo color
  const logo = document.querySelector("#logo circle");
  logo.setAttribute("fill", `hsl(${hue}, 72%, 85%)`);
}

// Load a random quote on page load
// Load initial quotes and display a random one
async function initializeQuotes() {
  await fetchQuotes(); // Fetch the quotes asynchronously
  displayRandomQuote(); // Show a random quote once quotes are fetched
}

// Set up event listener for the "New quote" button click
document
  .getElementById("refresh")
  .addEventListener("click", displayRandomQuote);

// Add initial visible class when the page is loaded
window.onload = function () {
  document.getElementById("quote").classList.add("visible");
  document.getElementById("author").classList.add("visible");
  document.getElementById("refresh").classList.add("visible");

  // Initialize quotes on page load
  initializeQuotes();
};

/*favion change*/
function updateFavicon() {
  const favicon = document.getElementById("dynamic-favicon");

  // Check the preferred color scheme (light or dark mode)
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Set the favicon based on the color scheme
  if (prefersDarkScheme) {
    favicon.setAttribute("href", "favicon-white.svg"); // Dark mode favicon
  } else {
    favicon.setAttribute("href", "favicon-black.svg"); // Light mode favicon
  }
}

// Call the function on page load
window.addEventListener("DOMContentLoaded", updateFavicon);

// Optionally, you can listen for changes in the color scheme preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateFavicon);
