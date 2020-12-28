
// Select random pokemon
var crazy = d3.select("#click-me");

// Select the button
var button = d3.select("#filter-btn");

// Selecting the second button
var button2 = d3.select("#filter-btn2");

// Select the form
var form = d3.select("#filter-gen");

// Select the fusion

var fusion = d3.select(#"fusion")


// Create event handlers 

crazy.on("click", bringRandom);

button.on("click", searchName);

button2.on("click", searchName2);

form.on("click", filterGen);

fusion.on("click", fusionTime);


function bringRandom() {
	
	d3.event.preventDefault();

		var rando = pokemonInfo[Math.floor(Math.random()*pokemonInfo.length)];
		console.log(rando);
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

	var gen = d3.select("#generation").property("value");
	var type = d3.select("#type").property("value");

	var filtered = pokemonInfo;

	if (gen) {
  	filter = filtered.filter(pokemon => pokemon.generation === gen)

  	if (type) {
  	rand = filter.filter(pokemon => pokemon.type1 === type)
  
  	var rando = rand[Math.floor(Math.random()*rand.length)]}}

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
			
}


function searchName2() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName2 = d3.select("#input-name2").property("value");
	var filtered2 = pokemonInfo;
	

	if (pokemonName2){
  	filter2 = filtered2.filter(pokemon => pokemon.name === pokemonName2);
  	console.log(filter2[0])}
	
	// Update image and name using D3
	d3.select("#pokemon-image2").attr("src", "static/images/pokemon/" + pokemonName2 + ".jpg");
	d3.select("#pokemon-name2").html(filter2[0].name);
	d3.select("#pokemon-entry2").html(filter2[0].entry);
		
}

function fusionTime() {

	window.open("https://pokemon.alexonsager.net");


}











