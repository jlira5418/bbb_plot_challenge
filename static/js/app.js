const url = "samples.json";
const dataPromise =d3.json(url);
//console.log(dataPromise);

d3.json(url).then(function(data) 
{
    var dropdown = document.getElementById("selDataset");
    var options = data.names;

    for(var i = 0; i < options.length; i++) 
    {
        var optValue = options[i];
        var optElem = document.createElement("option");
        //<option></option>
        optElem.textContent = optValue;
        //<option>Banana</option>
        optElem.value = optValue;
        //<option value="Banana">Banana</option>
        dropdown.appendChild(optElem);
    }
});
