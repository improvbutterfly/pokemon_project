// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#filter-form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName = d3.select("#input-name").property("value");

	console.log(pokemonName);

	// Find the pokemon in the json data


	// Update the card info using D3

}