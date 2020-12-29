// Select the form
var button = d3.select("#filter-graph");
var form = d3.select("#filter-form")

// Redraw the graph when the filters change
button.on("click", filterGraph);
form.on("submit", filterGraph);

// Set up the drop-down menu for type and plot the unfiltered graph
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

	// This needs work
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

	// plot graph
	plotGraph(pokemonInfo, svgChart, chartGroup);


};


// Set up the chart
//= ================================
var svgWidth = 900;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 85,
  left: 95
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svgChart = d3
  .select("#scatter")
  .append("svg")
  .attr("class", "pokemon-chart")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svgChart.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create variable for what to plot on each axis, so we can choose what to plot later
// Set default values
var chosenXAxis = "weight_kg";
var chosenYAxis = "height_m";

// function used for updating x-scale var upon click on axis label
function xScale(pokemonData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(pokemonData, d => d[chosenXAxis] * -0.04), d3.max(pokemonData, d => d[chosenXAxis] * 1.05)])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating y-scale var upon click on axis label
function yScale(pokemonData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(pokemonData, d => d[chosenYAxis] * -0.04), d3.max(pokemonData, d => d[chosenYAxis] * 1.1)])
    .range([height, 0]);

  return yLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles when x axis is changed
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with a transition to
// new circles when y axis is changed
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}


// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
  var xLabel;
  var yLabel;

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([100, -60])
    .html(function(d) {
      // Create labels for the different options
      
	  if (chosenXAxis === "weight_kg") {
	    xLabel = `Weight: ${d[chosenXAxis]}kg`;
	  }
	  else if (chosenXAxis === "speed")
	    xLabel = `Speed: ${d[chosenXAxis]}`;
	  else {
	    xLabel = `HP: ${d[chosenXAxis]}`;
	  }

	  if (chosenYAxis === "height_m") {
	    yLabel = `Height:  ${d[chosenYAxis]}m`;
	  }
	  else if (chosenYAxis === "speed")
	    yLabel = `Speed:  ${d[chosenYAxis]}`;
	  else {
	    yLabel = `HP: ${d[chosenYAxis]}`;
	  }
	  
      return (`<strong>Pok&eacute;mon Name: </strong>${d.name}<br>\
        <strong>Pok&eacute;dex #: </strong>${d._id}<br>\
        <strong>Generation: </strong>${d.generation}<br>\
        <strong>Type 1: </strong>${d.type1}<br>\
        <strong>Type 2: </strong>${d.type2}<br>\
        ${yLabel}<br>${xLabel}`);
    });

  chartGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
    d3.select(this)
      .classed("circleActive", true)
      .classed("stateCircle", false);
  })
    // onmouseout event
    .on("mouseout", function(data) {
      toolTip.hide(data);
    d3.select(this)
      .classed("circleActive", false)
      .classed("stateCircle", true);
    });

  return circlesGroup;
}


// Function to draw the graph 
function filterGraph() {
	
	d3.event.preventDefault();

	var gen = d3.select("#generation").property("value");
	var type = d3.select("#type").property("value");
	console.log(gen);
	console.log(type);

	var filtered = pokemonInfo;

	console.log(filtered);

	if (gen != "all") {
	  	filtered = filtered.filter(pokemon => pokemon.generation === parseInt(gen));
	}
  	if (type != "all") {
	  	filtered = filtered.filter(pokemon => (pokemon.type1 === type || pokemon.type2 === type));
	}  

	console.log(filtered);
	// Empty old graph
	svgChart.remove();

  svgChart = d3
  .select("#scatter")
  .append("svg")
  .attr("class", "pokemon-chart")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svgChart.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

	// Plot the filtered graph
	plotGraph(filtered, svgChart, chartGroup);
}

// Function to draw the graph 
function plotGraph(pokemonData, svg, chartGroup) {
  console.log(pokemonData[1]);
	// Plot the graph

  // xLinearScale function above csv import
  var xLinearScale = xScale(pokemonData, chosenXAxis);
  console.log(chosenXAxis);

  // yLinearScale function above csv import
  var yLinearScale = yScale(pokemonData, chosenYAxis);
  console.log(chosenYAxis);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(pokemonData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 10)
    .classed("stateCircle", true);

  // Create group for x-axis labels
  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var weightLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "weight_kg") // value to grab for event listener
    .classed("active", true)
    .text("Weight (kg)");

  var speedXLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "speed") // value to grab for event listener
    .classed("inactive", true)
    .text("Speed");

  var hpXLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "hp") // value to grab for event listener
    .classed("inactive", true)
    .text("HP");

  // Create group for y-axis labels
  var yLabelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)");

  var heightLabel = yLabelsGroup.append("text")
    .attr("y", 0 - margin.left + 45)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "height_m") // value to grab for event listener
    .classed("active", true)
    .text("Height (m)");

  var hpYLabel = yLabelsGroup.append("text")
    .attr("y", 0 - margin.left + 25)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "hp") // value to grab for event listener
    .classed("inactive", true)
    .text("HP");

  var speedYLabel = yLabelsGroup.append("text")
    .attr("y", 0 - margin.left + 5)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "speed") // value to grab for event listener
    .classed("inactive", true)
    .text("Speed");

  // updateToolTip function 
  circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // x axis labels event listener
  xLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(pokemonData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "weight_kg") {
          weightLabel
            .classed("active", true)
            .classed("inactive", false);
          speedXLabel
            .classed("active", false)
            .classed("inactive", true);
          hpXLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "speed"){
          weightLabel
            .classed("active", false)
            .classed("inactive", true);
          speedXLabel
            .classed("active", true)
            .classed("inactive", false);
          hpXLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          weightLabel
            .classed("active", false)
            .classed("inactive", true);
          speedXLabel
            .classed("active", false)
            .classed("inactive", true);
          hpXLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

  // y axis labels event listener
  yLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenYAxis with value
        chosenYAxis = value;

        console.log(chosenYAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(pokemonData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "height_m") {
          heightLabel
            .classed("active", true)
            .classed("inactive", false);
          hpYLabel
            .classed("active", false)
            .classed("inactive", true);
          speedYLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "hp"){
          heightLabel
            .classed("active", false)
            .classed("inactive", true);
          hpYLabel
            .classed("active", true)
            .classed("inactive", false);
          speedYLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          heightLabel
            .classed("active", false)
            .classed("inactive", true);
          hpYLabel
            .classed("active", false)
            .classed("inactive", true);
          speedYLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

}


// initialize the page
init();