---
title: Interactive Map
layout: post
---

<div id="campaignmap" style="height: 600px; width: 98%;"></div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        var map = L.map('campaignmap', {
            crs: L.CRS.Simple,
            minZoom: -1.5,
            maxZoom: 1,
            zoomDelta: 0.5,
        });

        // Define the bounds and add the map image overlay
        var bounds = [[0, 0], [1000, 2000]]; // Adjust to your map dimensions
        L.imageOverlay('/images/worldmap.png', bounds).addTo(map);
        map.fitBounds(bounds);

        // Add an example marker
        L.marker([500, 821]).addTo(map).bindPopup('Mournstead - The Heart of the Campaign');
    });
</script>
