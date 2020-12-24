
// Select random pokemon
var crazy = d3.select("#click-me");

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#filter-gen");


// Create event handlers 

crazy.on("click", bringRandom);

button.on("click", searchName);

form.on("click", filterGen);


function bringRandom() {
	
	d3.event.preventDefault();

		var rando = pokemonInfo[Math.floor(Math.random()*pokemonInfo.length)];

			d3.select("#pokemon-image").attr("src", "static/images/pokemon/" + rando.name + ".jpg");
			d3.select("#pokemon-name").html(rando.name);
			d3.select("#pokemon-entry").html(rando.entry);
			d3.select("#gen").html(rando.generation);
			d3.select("#height").html(rando.height_m);
			d3.select("#weight").html(rando.weight_kg);
			d3.select("#classification").html(rando.classfication);
			d3.select("#type1").html(rando.type1);
			d3.select("#type2").html(rando.type2);

}


function filterGen() {
	
	d3.event.preventDefault();

	console.log("A button was clicked");
}


function searchName() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName = d3.select("#input-name").property("value");
	var filtered = pokemonInfo;
	

	if (pokemonName){
  	filter = filtered.filter(pokemon => pokemon.name === pokemonName);
  	console.log(filter[0])}
	
	// Update image and name using D3
	d3.select("#pokemon-image").attr("src", "static/images/pokemon/" + pokemonName + ".jpg");
			d3.select("#pokemon-name").html(filter[0].name);
			d3.select("#pokemon-entry").html(filter[0].entry);
			d3.select("#gen").html(filter[0].generation);
			d3.select("#height").html(filter[0].height_m);
			d3.select("#weight").html(filter[0].weight_kg);
			d3.select("#classification").html(filter[0].classfication);
			d3.select("#type1").html(filter[0].type1);
			d3.select("#type2").html(filter[0].type2);
}

