var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

cities_url = "https://camiloibanez.github.io/Latitude-Weather-Correlations-Visualizations/WebVisualizations/Resources/cities.csv"

var array;

$.get(cities_url, function(data, status) {
    array = $.csv.toObjects(data);
});

var cityMarkers = [];

setTimeout(function() {
    for (var i=0; i < array.length; i++) {
        cityMarkers.push(L.marker([array[i]["Lat"], array[i]["Lng"]]).bindPopup("<h2>" + array[i]["City"] + "</h2>"));
    };

    var cityLayer = L.layerGroup(cityMarkers);

    var baseMaps = {"Street View" : streets};

    var overlayMaps = {Cities: cityLayer};

    var myMap = L.map("map", {
        center: [15, 0],
        zoom: 2,
        layers: [streets, cityLayer]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}, 2000);