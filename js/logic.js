// Create the map object with options
var myMap = L.map("map",{
    center: [40.7, -94.5],
    zoom: 4,
});

// Link to GeoJSON for earth quake data and tectonic plates data
var url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var plates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

//setting the different layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
}).addTo(myMap);

var lightscale = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);

// Creating a geoJSON layer groups
var earthquakes = new L.layerGroup();
var plates = new L.layerGroup();

//Create overlay object 
var overlayMaps = { 
    "Earthquakes": earthquakes,
    "Fault Lines": plates
};

//Create a baseMap object 
var baseMaps = {
    "Street Map": streetmap,
    "Satellite": satellite,
    "Light Scale": lightscale
    };

//Create the layer control 
L.control.layers(baseMaps,overlayMaps).addTo(myMap);

// Perform d3 request to the URL query
d3.json(url, function(data){
    //function to set the style of earthquake circles
    function styleData(feature){
        return {
            fillColor: getColor(feature.properties.mag),
            radius: getRadius(feature.properties.mag),
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        };
    }
    //function to set different colors depending the earthquake magnitude
    function getColor(magnitude) {
        if (magnitude > 5) return '#800026'
        else if (magnitude > 4) return '#BD0026'
        else if (magnitude > 3) return '#E31A1C'
        else if (magnitude > 2) return '#FC4E2A'
        else if (magnitude > 1) return '#FD8D3C'
        else return '#FEB24C'
    }
    //function to set the radius of the earthquake circles depending on the earthquake magnitude
    function getRadius(magnitude) {  
        if (magnitude > 5) return 25
        else if (magnitude > 4) return 20
        else if (magnitude > 3) return 15
        else if (magnitude > 2) return 10
        else if (magnitude > 1) return 5
        else return 1
    }
    //function to set the earthquake cirlce based on the earthquake location
    function pointToLayer(feature, latlng) {
        return new L.CircleMarker(latlng, styleData(feature)) 
    }
    //function to set the earthquake popup text
    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>"+ feature.properties.place + "</h3><hr><p>" + 
                        new Date(feature.properties.time) + "</p><p> Magnitude: " + feature.properties.mag + "</p>");
    }
    //calling the functions with the data to get the data as per earthquake data
    L.geoJson(data, {pointToLayer: pointToLayer, onEachFeature: onEachFeature, style: styleData, color:getColor}).addTo(earthquakes);
    //addiing the earthquake circles to the map
    earthquakes.addTo(myMap)

    // Perform the request to the tectonic URL, setting the color of the tectonic lines, adding to the map
    d3.json(plates_url, function(data){
        L.geoJson(data, {
            color: "orange",
            weight: 3
        }).addTo(plates);
        plates.addTo(myMap)
    })

    // Setting up the legend
    var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div', 'info legend');
        categories = [0, 1, 2, 3, 4, 5];
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(categories[i] + 1) + '"></i> ' +
                categories[i] + (categories[i + 1] ? '&ndash;' + categories[i + 1] + '<br>' : '+');
        }
        return div;
    };
    // Adding legend to the map
    legend.addTo(myMap);
})