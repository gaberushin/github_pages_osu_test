// Summary: This script reads car mileage data from a JSON file, processes the top 10 cars by mileage, 
// and creates a horizontal bar chart using Plotly.js. The x-axis shows the mileage, and the y-axis shows the car license plates.

// Use D3.js to read the JSON file located in "data/data.json".
// The data from the JSON file is passed to the function as "importedData".
d3.json("data/data.json").then((importedData) => {
  
   // Store the imported data into the variable "data".
   let data = importedData;
 
   // Sort the data array in descending order by the "miles" value.
   // The "parseFloat" function converts string values to numbers before comparison.
   data.sort(function(a, b) {
     return parseFloat(b.miles) - parseFloat(a.miles);
   });
 
   // Slice the first 10 entries from the sorted data array for plotting.
   data = data.slice(0, 10);
 
   // Reverse the array order to match Plotly's default layout which shows data from bottom to top.
   data = data.reverse();
 
   // Create a trace object for the bar chart using the processed data.
   let trace1 = {
     x: data.map(row => row.miles),             // Set the x-axis values (car miles).
     y: data.map(row => row.license_plate),     // Set the y-axis values (license plate numbers).
     text: data.map(row => row.license_plate),  // Set the hover text (license plate numbers).
     name: "Car Miles",                         // Name the data series.
     type: "bar",                               // Define the chart type as "bar".
     orientation: "h"                           // Make the bar chart horizontal.
   };
 
   // Combine the trace(s) into an array to define the chart data.
   let chartData = [trace1];
 
   // Define the layout for the bar chart.
   let layout = {
     title: "Car Miles for Employee Used Cars",  // Set the chart title.
     margin: {                                  // Define the chart margins.
       l: 100,                                  // Left margin.
       r: 100,                                  // Right margin.
       t: 100,                                  // Top margin.
       b: 100                                   // Bottom margin.
     }
   };
 
   // Render the bar chart to the HTML div with id="plot" using the chart data and layout.
   Plotly.newPlot("plot", chartData, layout);
 });
 
 
 /*
 Detailed Breakdown:
 
 1. `d3.json("data/data.json").then((importedData) => {...})`:
    - This line uses D3.js to load and read the data from a JSON file.
    - The `then()` method is used to handle the data once the JSON file has been successfully loaded. 
    - The `importedData` is the JSON data passed into the function.
 
 2. `data.sort(function(a, b) {...})`:
    - This sorts the data array in descending order based on the "miles" field. 
    - `parseFloat` ensures that the "miles" values are treated as numbers, not strings, during sorting.
    - The result is that the cars with the highest mileage are at the beginning of the array.
 
 3. `data = data.slice(0, 10);`:
    - This keeps only the top 10 elements (cars) from the sorted data array for plotting, limiting the chart to just 10 cars.
 
 4. `data.reverse();`:
    - Reverses the order of the data. Plotly plots bars from bottom to top by default, so reversing the array makes sure the highest value is at the top.
 
 5. `trace1 = {...}`:
    - This defines the data structure (trace) for the bar chart.
    - `x`: The x-axis data represents the mileage of each car.
    - `y`: The y-axis data represents the license plates.
    - `text`: This sets the hover information when a user hovers over a bar (license plates in this case).
    - `type: "bar"` specifies that this is a bar chart.
    - `orientation: "h"` makes the bars horizontal.
 
 6. `chartData = [trace1];`:
    - `chartData` is an array holding one or more traces (in this case, just one). 
    - It's passed to Plotly for plotting.
 
 7. `layout = {...}`:
    - This defines how the chart will look.
    - The `title` is the chart’s title.
    - The `margin` object specifies the left, right, top, and bottom margins for the chart, giving space for labels and title.
 
 8. `Plotly.newPlot("plot", chartData, layout);`:
    - This renders the chart using Plotly.
    - The first argument `"plot"` is the id of the HTML element where the chart will be displayed.
    - The second argument is the data (`chartData`), and the third argument is the layout configuration.
 */