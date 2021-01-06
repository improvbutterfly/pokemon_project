
// Select the opponent button
var opponentButton = d3.select("#name-search");

// Select the stats button
var statsButton = d3.select("#view-stats");

// Select the reset button
var resetButton = d3.select("#reset");



// filter select options
var genFilter = d3.select("#generation")
var typeFilter = d3.select("#type")
var pokemonNameList = d3.select("#pokemon-name-list");
    
// Set names array for drop-down to update in various functions
var names = []

// Create event handlers 

opponentButton.on("click", searchName);
resetButton.on("click", resetCounterFilters);

statsButton.on("click", viewStats);

genFilter.on("change", updateNames);
typeFilter.on("change", updateNames);

// default option for filters
var defaultOptionName = "all";

function viewStats() {

	// Prevent the page from refreshing
	d3.event.preventDefault();

	// Grab the pokemon name from the form
	var pokemonName = capitalize(pokemonNameList.property("value"));
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
		resetChosenPokemon();
		d3.select("#chosen_name").html("Error");
		d3.select("#chosen_entry").html("'" + pokemonName + "'" + " does not exist in database. Try again.");
	}
}

function resetChosenPokemon(){
	// Empty stats
	d3.select("#chosen_image").attr("src", "");
	d3.select("#chosen_name").html("Choose a Pok&eacute;mon");
	d3.select("#chosen_entry").html("");
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

function resetOpponentPokemon(){
	// Empty stats
	d3.select("#pokemon-image").attr("src", "");
	d3.select("#pokemon-name").html("Choose a Pok&eacute;mon");
	d3.select("#pokemon-entry").html("");
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

function updateNames() {
	// Grab filtered data
	var filteredPokemon = filterGen();
	console.log(filteredPokemon);

	// repopulate the name drop down based on filters
	populateNameDropDown(filteredPokemon);

	// repopulate the type drop down based on filters
	repopulateTypeDropDown(filteredPokemon);

	// repopulate the gen drop down based on filters
	repopulateGenDropDown(filteredPokemon);
}

function filterGen() {
	
	d3.event.preventDefault();

	var gen = genFilter.property("value");
	var type = typeFilter.property("value");

	// Create a list of names currently in the drop-down menu
	console.log(names);

	var filtered = pokemonInfo;

	// Make sure this is filtered down to just the names already in the name drop-down
	// TODO fix this
  	filtered = filtered.filter(function(d){
  		//console.log(d.name);
  		//var filteredByName = [];
  		for (var i = 0; i < names.length; i++){
  			if (d.name === names[i]){
  				return d.name;
  			}
  		}
  		//return filteredByName;
  	});
  	console.log(filtered); 


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
	resetChosenPokemon();

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

		// Next we have to filter the pokemon for the form on the right
		// TODO
		var battlePokemon = pokemonInfo;

		// get effectiveness to filter
		var effectiveness = parseFloat(d3.select("#effectiveness").property("value"));
		console.log(effectiveness);

		// find pokemon that are strong against opponent pokemon's type
		var againstType = "against_" + filtered[0].type1;
		console.log(againstType);
		var battleFilter = battleInfo.filter(function(pokemon){
			//console.log(pokemon[againstType]);
			return pokemon[againstType] === effectiveness;
		});
		console.log(battleFilter);


		// If no pokemon are "0.25" (super effective) strong against opponent's pokemon type1, check type2
		if (battleFilter.length === 0){
			battleFilter = battleInfo.filter(function(pokemon){
				// Search by second type instead
				againstType = "against_" + filtered[0].type2;
				//console.log(pokemon[againstType]);
				return pokemon[againstType] === effectiveness;
			});
		}
		console.log(battleFilter);

		// This extra one is needed in cases where, for example, there is no secondary type for 
		// opponent's pokemon, and/or there are no matching effectiveness values against that pokemon
		// (This may be common for "extra super effective '0'" or "super weak '4'")
		if (battleFilter.length === 0){
			battleFilter = battleInfo.filter(function(pokemon){
				// Search by first type again
				//againstType = "against_" + filtered[0].type1;
				//console.log(pokemon[againstType]);
				d3.select("#chosen_name").html("Uh-oh!")
				d3.select("#chosen_entry").html("Couldn't find any pok&eacute;mon with that effectiveness rating.");
				return 0;
			});
		}
		console.log(battleFilter);

		// Now we have to filter the pokemon by pokedex number from battleFilter
		var pokedex = [];

		for (var x = 0; x < battleFilter.length; x++){
			pokedex.push(battleFilter[x]._id);
		}
		console.log(pokedex);


		// Filter selected pokemon by pokedex values
	  	battlePokemon = battlePokemon.filter(function(d){
	  		//console.log(d.name);
  			for (var i = 0; i < pokedex.length; i++){
	  			if (d._id === pokedex[i]){
	  				return d._id;
	  			}
  			}
	  	});
	  	console.log(battlePokemon); 

		// Repopulate the name drop-down with filtered data
		populateNameDropDown(battlePokemon);

		// Repopulate the type drop-down with filtered data
		populateTypeDropDown(battlePokemon);

		// Repopulate the generation drop-down with filtered data
		populateGenDropDown(battlePokemon);

	}
	else {
		// Print error, empty stats
		resetOpponentPokemon();
		d3.select("#pokemon-name").html("Error");
		d3.select("#pokemon-entry").html("'" + pokemonName + "'" + " does not exist in database. Try again.");
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

function resetCounterFilters(){
	populateTypeDropDown(pokemonInfo);
	populateGenDropDown(pokemonInfo);
	populateNameDropDown(pokemonInfo);
	resetChosenPokemon()
}

// Set up the drop-down menu for type
function repopulateTypeDropDown(pokemonData){
	// Create empty array for types
	var types = ["all"];

	// grab current type value to make sure it stays selected
	var selectedType = typeFilter.property("value");
	if (!selectedType){
		selectedType = "all";
	}

	// loop through pokemonInfo
	for (var i = 0; i < pokemonData.length; i++){

	    var typeFound = false;
	    // Check if type is already in types array
	    for (var j = 0; j < types.length; j++){
	      if (types[j] === pokemonData[i].type1){
	        typeFound = true;
	        break;
	      }
	    }
	    if(!typeFound){
	      // Append unique types to list
	      types.push(pokemonData[i].type1);
	    }
	}

	// Empty the type drop-down
	typeFilter.html("");

    // Print the type options
    console.log(types);
    typeFilter.selectAll("option")
    .data(types)
    .enter()
    .append("option")
    .attr("value", function(d){
    	return d;
    })
	// Change selection to previously selected value
	.property("selected", function(d){ 
		return d === selectedType;
	})
    .html(function(d){
    	return d;
    });

}

// Set up the drop-down menu for type
function populateTypeDropDown(pokemonData){
	// Create empty array for types
	var types = ["all"];

	// loop through pokemonInfo
	for (var i = 0; i < pokemonData.length; i++){

	    var typeFound = false;
	    // Check if type is already in types array
	    for (var j = 0; j < types.length; j++){
	      if (types[j] === pokemonData[i].type1){
	        typeFound = true;
	        break;
	      }
	    }
	    if(!typeFound){
	      // Append unique types to list
	      types.push(pokemonData[i].type1);
	    }
	}

	// Empty the type drop-down
	typeFilter.html("");

    // Print the type options
    console.log(types);
    typeFilter.selectAll("option")
    .data(types)
    .enter()
    .append("option")
    .attr("value", function(d){
    	return d;
    })
    .html(function(d){
    	return d;
    });

}

// Set up the drop-down menu for gen when pre-selected
function repopulateGenDropDown(pokemonData){
	// Create empty array for types
	var gens = ["all"];

	// grab current gen value to make sure it stays selected
	var selectedGen = parseInt(genFilter.property("value"));
	if (!selectedGen){
		selectedGen = "all";
	}

	// loop through pokemonInfo
	for (var i = 0; i < pokemonData.length; i++){

	    var genFound = false;
	    // Check if type is already in types array
	    for (var j = 0; j < gens.length; j++){
	      if (gens[j] === pokemonData[i].generation){
	        genFound = true;
	        break;
	      }
	    }
	    if(!genFound){
	      // Append unique types to list
	      gens.push(pokemonData[i].generation);
	    }
	}

	// Empty the type drop-down
	genFilter.html("");

    // Print the type options
    console.log(gens);
    genFilter.selectAll("option")
    .data(gens)
    .enter()
    .append("option")
    .attr("value", function(d){
    	return d;
    })
	// Change selection to previously selected value
	.property("selected", function(d){ 
		return d === selectedGen;
	})
    .html(function(d){
    	return d;
    });

}

// Set up the drop-down menu for gen
function populateGenDropDown(pokemonData){
	// Create empty array for types
	var gens = ["all"];

	// loop through pokemonInfo
	for (var i = 0; i < pokemonData.length; i++){

	    var genFound = false;
	    // Check if type is already in types array
	    for (var j = 0; j < gens.length; j++){
	      if (gens[j] === pokemonData[i].generation){
	        genFound = true;
	        break;
	      }
	    }
	    if(!genFound){
	      // Append unique types to list
	      gens.push(pokemonData[i].generation);
	    }
	}

	// Empty the type drop-down
	genFilter.html("");

    // Print the type options
    console.log(gens);
    genFilter.selectAll("option")
    .data(gens)
    .enter()
    .append("option")
    .attr("value", function(d){
    	return d;
    })
    .html(function(d){
    	return d;
    });

}

// Set up the drop-down menu for pokemon names
function populateNameDropDown(pokemonData){
	// Empty current drop-down list
	pokemonNameList.html("")

	// Reset names list
	names = [];

    // Print all pokemon names
    pokemonNameList.selectAll("option").data(pokemonData)
    .enter()
    .append("option")
//    .merge(pokemonNameList)
    .attr("value", function(d){
    	// Update names array
    	names.push(d.name);
    	// return name
    	return d.name;
    })
    .html(function(d){
    	return d.name;
    });

	//pokemonNameList.exit().remove();

}

// initialize the page
function init() {
//console.log(pokemonInfo);

	resetCounterFilters();
	//populateNameDropDown(pokemonInfo);
	//populateTypeDropDown(pokemonInfo);
};

init();
