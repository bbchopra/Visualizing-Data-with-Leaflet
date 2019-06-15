# Visualizing Earthquake Data with Leaflet

## Data
- Earthquake data: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
- Tectonic plates data: https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json  

## Steps
1. Copy all files/folders 
2. Update Config.js file with your api_key to access map.box
3. Open GitBash and run "python -m http.server"
4. In browswer go to "http://127.0.0.1:8000/"
5. Go to the folder link where the files/folders are placed

-> The map is displayed showing both Earthquaks (based on their longitude and latitude) and Tectonic plates line
-> You can use base maps to choose from different maps and selection of earthquake and/or tectonic plates to display

## Other Info
- Earth Quake markers size and color are based on earthquake magnitude.
- Popups for each earth quake market provides additional information about the earthquake when a marker is clicked.
- Legend is created showing the color code of earth quake markers.

## Copyright
Bharat Chopra (C) UCB Data Boot Camp (C) 2019. All Rights Reserved.
