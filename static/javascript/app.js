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
	console.log(pokemonInfo);

	// Update image and name using D3
	d3.select("#pokemon-image").attr("src", "static/images/pokemon/" + pokemonName + ".jpg");
	d3.select("#pokemon-name").html(pokemonName);

	const entry = info.find( ({ entry }) => info.name === pokemonName );
	console.log(entry)

	d3.select("#pokemon-entry").html(entry)

	

	// Find the pokemon in the json data
	
    // Build Table

	// Update the card info using D3








