
// Select random pokemon
var crazy = d3.select("#click-me");

// Select the button
var button = d3.select("#filter-btn");

// Selecting the second button
var button2 = d3.select("#filter-btn2");

// Select the form
var form = d3.select("#filter-gen");

// Select the fusion

var fusion = d3.select("#fusion")


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
	d3.select("#pokemon-image").attr("src", "static/images/pokemon/" + imageString(rando.name) + ".jpg");
	d3.select("#pokemon-name").html(rando.name);
	d3.select("#pokemon-entry").html(rando.entry);
	d3.select("#_id").html(rando._id);
	d3.select("#gen").html(rando.generation);
	d3.select("#height").html(rando.height_m + " m");
	d3.select("#weight").html(rando.weight_kg + " kg");
	d3.select("#classification").html(rando.classfication);
	d3.select("#type1").html(rando.type1);
	d3.select("#type2").html(rando.type2);
	d3.select("#hp").html(rando.hp);
	d3.select("#speed").html(rando.speed);

}


function filterGen() {
	
	d3.event.preventDefault();

	var gen = d3.select("#generation").property("value");
	var type = d3.select("#type").property("value");

	var filtered = pokemonInfo;


	if (gen != "all") {
	  	filtered = filtered.filter(pokemon => pokemon.generation === parseInt(gen));
	}
  	if (type != "all") {
  		filtered = filtered.filter(pokemon => pokemon.type1 === type || pokemon.type2 === type);
  	}
  
  	var rando = filtered[Math.floor(Math.random()*filtered.length)];

  	d3.select("#pokemon-image").attr("src", "static/images/pokemon/" + imageString(rando.name) + ".jpg");
	d3.select("#pokemon-name").html(rando.name);
	d3.select("#pokemon-entry").html(rando.entry);
	d3.select("#_id").html(rando._id);
	d3.select("#gen").html(rando.generation);
	d3.select("#height").html(rando.height_m + " m");
	d3.select("#weight").html(rando.weight_kg + " kg");
	d3.select("#classification").html(rando.classfication);
	d3.select("#type1").html(rando.type1);
	d3.select("#type2").html(rando.type2);
	d3.select("#hp").html(rando.hp);
	d3.select("#speed").html(rando.speed);
}


function searchName() {

	// Prevent the page from refreshing
	d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName = capitalize(d3.select("#input-name").property("value"));
	var filtered = pokemonInfo;
	
	var matched = false;
	if (pokemonName){
	  	filtered = filtered.filter(pokemon => pokemon.name === pokemonName);
  		console.log(filtered[0]);
  		if (filtered[0]){
  			matched = true;
  		}
  	}
	
	// If name is found, update the stats
	if (matched){
		// Update image and name using D3
		d3.select("#pokemon-image")
		.attr("src", "static/images/pokemon/" + imageString(pokemonName) + ".jpg");
		d3.select("#pokemon-name").html(filtered[0].name);
		d3.select("#pokemon-entry").html(filtered[0].entry);
		d3.select("#_id").html(filtered[0]._id);
		d3.select("#gen").html(filtered[0].generation);
		d3.select("#height").html(filtered[0].height_m + " m");
		d3.select("#weight").html(filtered[0].weight_kg + " kg");
		d3.select("#classification").html(filtered[0].classfication);
		d3.select("#type1").html(filtered[0].type1);
		d3.select("#type2").html(filtered[0].type2);
		d3.select("#hp").html(filtered[0].hp);
		d3.select("#speed").html(filtered[0].speed);
	}
	else {
		// Print error, empty stats
		d3.select("#pokemon-image").attr("src", "");
		d3.select("#pokemon-name").html("Error");
		d3.select("#pokemon-entry").html("'" + pokemonName + "'" + " does not exist in database, or is not \
			in the generation filter used. Try again.");
		d3.select("#_id").html("");
		d3.select("#gen").html("");
		d3.select("#height").html("");
		d3.select("#weight").html("");
		d3.select("#classification").html("");
		d3.select("#type1").html("");
		d3.select("#type2").html("");
		d3.select("#hp").html("");
		d3.select("#speed").html("");
	}
}


function searchName2() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName2 = capitalize(d3.select("#input-name2").property("value"));
	var filtered2 = pokemonInfo;
	

	var matched = false;
	
	if (pokemonName2){
	  	filter2 = filtered2.filter(pokemon => pokemon.name === pokemonName2);
	  	console.log(filter2[0])
		if (filter2[0]){
  			matched = true;
  		}
  	}
	
	// If name is found, update the stats
	if (matched){
		// Update image and name using D3
		d3.select("#pokemon-image2").attr("src", "static/images/pokemon/" + imageString(pokemonName2) + ".jpg");
		d3.select("#pokemon-name2").html(filter2[0].name);
		d3.select("#pokemon-entry2").html(filter2[0].entry);
	}
	else {
		// Print error, empty stats
		d3.select("#pokemon-image2").attr("src", "");
		d3.select("#pokemon-name2").html("Error");
		d3.select("#pokemon-entry2").html("'" + pokemonName2 + "'" + " does not exist in database, or is not \
			in the generation filter used. Try again.");
	}
}

function fusionTime() {

	window.open("https://pokemon.alexonsager.net");


}

// function to make sure pokemon name search string is formatted correctly
function capitalize(string) {
	var separateWord = string.toLowerCase().split(' ');
	for (var i = 0; i < separateWord.length; i++){
		separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].slice(1).toLowerCase();
	}
	return separateWord.join(' ');
}

// Image strings are letters only, plus - in place of a space. This function fixes the 
//name string to display the images properly.
function imageString(string) {
	string = string.replace(/[\.']/, '');
	var separateWord = string.toLowerCase().split(' ');
	for (var i = 0; i < separateWord.length; i++){
		if (i === 0){
			separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].slice(1).toLowerCase();
		}
		else {
			separateWord[i] = separateWord[i].toLowerCase();
		}
	}
	return separateWord.join('-');
}
// Set up the drop-down menu for type
function init() {
//console.log(pokemonInfo);
	// Create empty array for types
	var types = ["all"];

	// loop through pokemonInfo
	for (var i = 0; i < pokemonInfo.length; i++){

    var typeFound = false;
    // Check if type is already in types array
    for (var j = 0; j < types.length; j++){
      if (types[j] === pokemonInfo[i].type1){
        typeFound = true;
        break;
      }
    }
    if(!typeFound){
      // Append unique types to list
      types.push(pokemonInfo[i].type1);
    }
	}

    // Print the type options
    console.log(types);
    d3.select("#type").selectAll("option")
    .data(types)
    .enter()
    .append("option")
    .attr("value", function(d){
    	return d;
    })
    .html(function(d){
    	return d;
    });

};

init();
