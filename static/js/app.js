const url = "samples.json";
const dataPromise = d3.json(url);
var all_data;



dataPromise.then(function (data) {
    all_data = data;
    var dropdownSelect = document.getElementById("selDataset");
    var listOfNames = data.names;
    
    
    for (var i = 0; i < listOfNames.length; i++) {
        var name = listOfNames[i];
        var optElem = document.createElement("option");
     
        optElem.textContent = name;
        
        optElem.value = name;
       
        dropdownSelect.appendChild(optElem);
    }

    //Select first item
    var firstItem = listOfNames[0];
    buildBarChart(firstItem, data);
    buildBubbleChart(firstItem, data);
    buildMetaData(firstItem);

    console.log(all_data);


});

function buildBarChart(itemid, data) {
    

    if (data === undefined)
        data = all_data;


    var samples = data.samples;
    
    var sampleFilter = samples.filter(sampleObject => sampleObject.id == itemid);
    
    var result = sampleFilter[0];
    var dataBar = [
        {
          x: result.sample_values.slice(0, 10).reverse(),
          y: result.otu_ids.slice(0, 10).map(val=>"OTU " + val).reverse(),
          type: 'bar',
          orientation: "h",
          text: result.otu_labels.slice(0, 10).reverse()

        }
      ];
      
    Plotly.newPlot("bar", dataBar);
    
   
}

function buildBubbleChart(itemid, data) {
    

    if (data === undefined)
        data = all_data;


    var samples = data.samples;
    
    var sampleFilter = samples.filter(sampleObject => sampleObject.id == itemid);
    
    var result = sampleFilter[0];
    var OTUids = result.otu_ids;
    var OTUlbls = result.otu_labels;
    var OTUsample = result.sample_values;
   
    var layoutBubble = { title: "Belly Button Biodiversity", xaxis: { title: "OTU ID" }, };
    var dataBubble = [{ x: OTUids, y: OTUsample, text: OTUlbls, mode: "markers", marker: { size: OTUsample, color: OTUids, colorscale: "Earth" } }];
    Plotly.newPlot("bubble", dataBubble, layoutBubble);



}

function buildMetaData(itemid, data) {
    

    if (data === undefined)
        data = all_data;


    var samples = data.metadata;
    
    var sampleFilter = samples.filter(sampleObject => sampleObject.id == itemid);
    var result = sampleFilter[0];
    var metadatapanel = d3.select("#sample-metadata");
    metadatapanel.html("");
    metadatapanel.append("h6").text("id: " +itemid);
    metadatapanel.append("h6").text("ethnicity: " +result.ethnicity);
    metadatapanel.append("h6").text("gender: " +result.gender);
    metadatapanel.append("h6").text("age: " +result.age);
    metadatapanel.append("h6").text("location: "  +result.location);
    metadatapanel.append("h6").text("bbtype: " +result.bbtype);
    metadatapanel.append("h6").text("wfreq: " +result.wfreq);
    //console.log(result);

    

}

function optionChanged(item) {
    buildBarChart(item);
    buildBubbleChart(item);
    buildMetaData(item);
}




