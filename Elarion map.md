---
title: Interactive Map
---
```leaflet  
id: campaignmap ### Must be unique with no spaces  
image: [[worldmap.png]] ### Link to the map image file  
bounds: [[0,0], [1000, 2000]] ### Size of the map in px Width_x, Height_y  
height: 600px ### Size of the leaflet embed in px on your screen  
width: 98% ### Size of the leaflet embed in your note  
lat: 1024 ### To center the map, make this half of the map width.  
long: 821 ### To center the map, make this half of the map height.  
minZoom: -1.5 ### Controls how far away from the map you can zoom out. Hover over the target icon to see the current level.  
maxZoom: 1 ### Controls how far towards the map you can zoom in. Hover over the target icon to see the current level.  
defaultZoom: -1 ### Sets the default zoom level when the map loads. Hover over the target icon to see the current level.  
zoomDelta: 0.5 ### Adjust how much the zoom changes when you zoom in or out.  
unit: km ### The value displayed when measuring so you know what type of unit is being measure.  
scale: 0.09328358208955223 ### Only required if you are using the measurement tool. Real units/px (resolution) of your map  
recenter: false  
darkmode: false ### marker  
```



