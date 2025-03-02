const baseId = "apphESc74bJHeT81r";
const tableId = "tbll3eDFHff1DsgEa";
const apiKey =
  "patfgfscWJv0YWCiF.618b33069ff9120639f687e92d4a366413c1e40e55659e216c556f716c1b9418";
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

// Fetch quotes from Airtable API
async function fetchQuotes() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.records; // List of all quotes
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
}

// Display random quote
async function displayRandomQuote() {
  const quotes = await fetchQuotes();
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex].fields;

  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const refreshButton = document.getElementById("refresh");

  // Step 1: Fade out the current quote, author, and refresh button
  quoteElement.classList.remove("visible");
  authorElement.classList.remove("visible");
  refreshButton.classList.remove("visible");

  // Step 2: Wait for the fade-out transition to complete before updating content
  setTimeout(function () {
    // Update the quote content dynamically
    quoteElement.textContent = randomQuote.quote || "No quote available.";
    authorElement.textContent = `— ${randomQuote.author || "Unknown"}`;

    // Step 3: Fade in the new quote, author, and refresh button
    quoteElement.classList.add("visible");
    authorElement.classList.add("visible");
    refreshButton.classList.add("visible");
  }, 1000); // This matches the transition duration (1s)

  // Update the background color
  let hue = Math.floor(Math.random() * 360); // Random initial hue
  document.body.style.backgroundColor = `hsl(${hue}, 72%, 85%)`;

  // Update the logo color (assuming the logo is an inline SVG)
  const logo = document.querySelector("#logo circle");
  logo.setAttribute("fill", `hsl(${hue}, 72%, 85%)`);
}

// Load a random quote on page load
window.addEventListener("DOMContentLoaded", displayRandomQuote);

// Set up event listener for the "New quote" button click
document
  .getElementById("refresh")
  .addEventListener("click", displayRandomQuote);

// Add initial visible class when the page is loaded
window.onload = function () {
  document.getElementById("quote").classList.add("visible");
  document.getElementById("author").classList.add("visible");
  document.getElementById("refresh").classList.add("visible");
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
