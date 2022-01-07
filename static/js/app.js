const url = "samples.json";
const dataPromise =d3.json(url);
//console.log(dataPromise);

function initialRun(){
    d3.json(url).then(function(data) 
    {
        var dropdownSelect = document.getElementById("selDataset");
        var listOfNames = data.names;
        var optElem = document.createElement("option");
        // optElem.textContent = " ";
        //optElem.value = " ";
        //dropdownSelect.appendChild(optElem);

        for(var i = 0; i < listOfNames.length; i++) 
        {
            var name = listOfNames[i];
            var optElem = document.createElement("option");
            //<option>name</option>
            optElem.textContent = name;
            //<option>Banana</option>
            optElem.value = name;
            //<option value="Banana">Banana</option>
            dropdownSelect.appendChild(optElem);
        }

        //Select first item
        var firstItem = listOfNames[0];
        buildBubbleChart(firstItem);
        //buildMetaData(firstItem);



    });
}

function buildBubbleChart(itemid){
   // alert(itemid);
   d3.json(url).then(function(data)

   { 
        var samples  = data.samples;
        //alert(samples);
        var sampleFilter = samples.filter(sampleObject => sampleObject.id == itemid);
        //alert(sampleFilter);
        var result = sampleFilter[0];
        var OTUids = result.otu_ids;
        var OTUlbls = result.otu_labels;
        var OTUsample = result.sample_values;
        //alert(OTUids);
        //alert(OTUlbls);
        //alert(OTUsample);
        var layoutBubble = {title:"Belly Button Biodiversity", xaxis:{title:"OTU ID"}, };
        var dataBubble = [{x:OTUids, y:OTUsample, text: OTUlbls, mode:"markers", marker:{size:OTUsample, color:OTUids, colorscale:"Earth" }}];
        Plotly.newPlot("bubble", dataBubble, layoutBubble);
   });
}

function optionChanged(item){
    buildBubbleChart(item);   
}


initialRun();
