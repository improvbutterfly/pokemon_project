
// Select random pokemon
var crazy = d3.select("#filter-danger");

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#filter-gen");

// Create event handlers 

crazy.on("submit", bringRandom());

button.on("submit", searchName());

form.on("submit", runEnter());


function bringRandom() {
	
	d3.event.preventDefault();

		var rando = pokemonInfo[Math.floor(Math.random()*pokemonInfo.length)];

			d3.select("#pokemon-image").attr("src", "static/images/pokemon/" + rando.name + ".jpg");
			d3.select("#pokemon-name").html(rando.name);
			d3.select("#pokemon-entry").html(rando.entry);
			d3.select("#pokemon-gen").html(rando.gen);
			d3.select("#height").html(rando.height);
			d3.select("#weight").html(rando.weight);
			d3.select("#classification").html(rando.weight);
			d3.select("#type1").html(rando.weight);
			d3.select("#type2").html(rando.weight);
};


function runEnter() {

	console.log(pokemonInfo[4])
};


function searchName(event) {

  // Prevent the page from refreshing
  d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName = d3.select("#input-name").property("value");

	console.log(pokemonName);

	var filteredData = info;

	if (pokemonName){
  	filteredData = filteredData.filter(pokemon => pokemon.name === pokemonName)};
	
	// Update image and name using D3
	d3.select("#pokemon-image").attr("src", "static/images/pokemon/" + pokemonName + ".jpg");
	d3.select("#pokemon-name").html(pokemonName);
	d3.select("#pokemon-entry").html(filterData.entry);

}