var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

var cities_url = "https://camiloibanez.github.io/Latitude-Weather-Correlations-Visualizations/WebVisualizations/Resources/cities.csv"

var array;

$.get(cities_url, function(data, status) {
    array = $.csv.toObjects(data);
});

var cityMarkers = [];

setTimeout(function() {
    for (var i=0; i < array.length; i++) {
        cityMarkers.push(L.marker([array[i]["Lat"], array[i]["Lng"]]).bindPopup(
            "<h2 class='header'>" + array[i]["City"] + "</h2>" +
            "<hr>" + 
            "<h6 class='header'>Max Temp: " + array[i]["Max Temp"] + "</h6>" +
            "<h6 class='header'>Humidity: " + array[i]["Humidity"] + "</h6>" +
            "<h6 class='header'>Wind Speed: " + array[i]["Wind Speed"] + "</h6>")
            );
    };

    var cityLayer = L.layerGroup(cityMarkers);

    var baseMaps = {"Street View" : streets,
        "light View" : light,
        "Dark View" : dark
    };

    var overlayMaps = {Cities: cityLayer};

    var myMap = L.map("map", {
        center: [15, 0],
        zoom: 2,
        layers: [streets, cityLayer]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}, 1000);