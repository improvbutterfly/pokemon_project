
// Select the button
var opponentButton = d3.select("#name-search");

// Selecting the stats button
var statsButton = d3.select("#view-stats");

// filter select options
var genFilter = d3.select("#generation")
var typeFilter = d3.select("#type")
var pokemonNameList = d3.select("#pokemon-name-list");
    


// Create event handlers 

opponentButton.on("click", searchName);

statsButton.on("click", viewStats);

genFilter.on("change", updateNames);
typeFilter.on("change", updateNames);


function viewStats() {

	// Prevent the page from refreshing
	d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName = capitalize(d3.select("#pokemon-name-list").property("value"));
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
		// create variable to use for id to get correct battle data
		var battleRow = filtered[0]._id-1;
		// Update image and name using D3
		d3.select("#chosen_image")
		.attr("src", "static/images/pokemon/" + imageString(pokemonName) + ".jpg");
		d3.select("#chosen_name").html(filtered[0].name);
		d3.select("#chosen_entry").html(filtered[0].entry);
		d3.select("#chosen_id").html(filtered[0]._id);
		d3.select("#chosen_gen").html(filtered[0].generation);
		d3.select("#chosen_height").html(filtered[0].height_m + " m");
		d3.select("#chosen_weight").html(filtered[0].weight_kg + " kg");
		d3.select("#chosen_classification").html(filtered[0].classfication);
		d3.select("#chosen_type1").html(filtered[0].type1);
		d3.select("#chosen_type2").html(filtered[0].type2);
		d3.select("#chosen_hp").html(filtered[0].hp);
		d3.select("#chosen_speed").html(filtered[0].speed);
		d3.select("#chosen_attack").html(battleInfo[battleRow].attack);
		d3.select("#chosen_defense").html(battleInfo[battleRow].defense);
		d3.select("#chosen_sp_attack").html(battleInfo[battleRow].sp_attack);
		d3.select("#chosen_sp_defense").html(battleInfo[battleRow].sp_defense);

		console.log(battleInfo[battleRow].abilities);
		var abilitiesList = battleInfo[battleRow].abilities;
		d3.select("#chosen_abilities").html(function(){
			abilitiesList
			var returnString = "";
			for (var i = 0; i < abilitiesList.length; i++){
				if (i+1 < abilitiesList.length){
					returnString += abilitiesList[i] + ", "
				}
				else {
					returnString += abilitiesList[i]
				}
			}
    		return returnString;
		});
	}
	else {
		// Print error, empty stats
		d3.select("#chosen_image").attr("src", "");
		d3.select("#chosen_name").html("Error");
		d3.select("#chosen_entry").html("'" + pokemonName + "'" + " does not exist in database, or is not \
			in the generation filter used. Try again.");
		d3.select("#chosen_id").html("");
		d3.select("#chosen_gen").html("");
		d3.select("#chosen_height").html("");
		d3.select("#chosen_weight").html("");
		d3.select("#chosen_classification").html("");
		d3.select("#chosen_type1").html("");
		d3.select("#chosen_type2").html("");
		d3.select("#chosen_hp").html("");
		d3.select("#chosen_speed").html("");
		d3.select("#chosen_attack").html("");
		d3.select("#chosen_defense").html("");
		d3.select("#chosen_sp_attack").html("");
		d3.select("#chosen_sp_defense").html("");
		d3.select("#chosen_abilities").html("");
	}
}

function updateNames() {
	// Work on this section
	var filteredPokemon = filterGen();
	console.log(filteredPokemon);


	pokemonNameList.html("");

    // Print all the filtered pokemon names in the dropdown
    pokemonNameList.selectAll("option").data(filteredPokemon)
    .enter()
    .append("option")
    .attr("value", function(d){
    	return d.name;
    })
    .html(function(d){
    	return d.name;
    });

	pokemonNameList.exit().remove();
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
  
	return filtered;
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
		// create variable to use for id to get correct battle data
		var battleRow = filtered[0]._id-1;

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
		d3.select("#attack").html(battleInfo[battleRow].attack);
		d3.select("#defense").html(battleInfo[battleRow].defense);
		d3.select("#sp_attack").html(battleInfo[battleRow].sp_attack);
		d3.select("#sp_defense").html(battleInfo[battleRow].sp_defense);

		console.log(battleInfo[battleRow].abilities);
		var abilitiesList = battleInfo[battleRow].abilities;
		d3.select("#abilities").html(function(){
			abilitiesList
			var returnString = "";
			for (var i = 0; i < abilitiesList.length; i++){
				if (i+1 < abilitiesList.length){
					returnString += abilitiesList[i] + ", "
				}
				else {
					returnString += abilitiesList[i]
				}
			}
    		return returnString;
		});
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
		d3.select("#attack").html("");
		d3.select("#defense").html("");
		d3.select("#sp_attack").html("");
		d3.select("#sp_defense").html("");
		d3.select("#abilities").html("");
	}
}


// function to make sure pokemon name search string is formatted correctly
function capitalize(string) {
	// Capitalize the first letter of each word
	var separateWord = string.toLowerCase().split(' ');
	for (var i = 0; i < separateWord.length; i++){
		separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].slice(1).toLowerCase();
	}
	var newString = separateWord.join(' ').split('');

	// Now check if there is a - in the name, because the following character needs to be capitalized.
	for (var j = 0; j < newString.length-1; j++){
		if (newString[j] === '-'){
			newString[j+1] = newString[j+1].toUpperCase();
		}
	}
	return newString.join('');
}

// Image strings are letters only, plus - in place of a space. This function fixes the 
//name string to display the images properly.
function imageString(string) {
	string = string.replace(/[\.']/, '');
	string = string.replace(/♀/, '-f'); // Replace female character with '-f'
	string = string.replace(/♂/, '-m'); // Replace male character with '-f'
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

    // Print all pokemon names
    pokemonNameList.selectAll("option").data(pokemonInfo)
    .enter()
    .append("option")
//    .merge(pokemonNameList)
    .attr("value", function(d){
    	return d.name;
    })
    .html(function(d){
    	return d.name;
    });

	pokemonNameList.exit().remove();

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
