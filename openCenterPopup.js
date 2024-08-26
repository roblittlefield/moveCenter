window.moving = false;
const centerPopupTolerance = 100;
let currentPopup = null;
let isPopupOpen = false;

/**
 * Add a handler to move the center of the map based on the location of markers and open popups.
 *
 * @param {L.LayerGroup} leafletMarkers - The layer group containing markers to be used for centering the map.
 * @param {L.Map} map - The Leaflet map instance to which the handler is added.
 */
export const addHandlerMoveCenter = function (leafletMarkers, map) {
  let timer = null;
  
  map.on("move", () => {
    // Check if the 'moving' flag is set; if true, exit the function
    if (moving) return;

    // Clear any previously scheduled timer to avoid rapid execution
    clearTimeout(timer);
    timer = setTimeout(() => {
      // Get the dimensions of the map
      const { x, y } = map.getSize();

      // Calculate the center of the map
      const centerX = x / 2;
      const centerY = y / 2 + 50;

      // Initialize variables to find the closest marker
      let minDistance = Infinity;
      let closestCoords = null;

      // Iterate over each layer in 'leafletMarkers'
      leafletMarkers.eachLayer((layer) => {
        // Extract latitude and longitude from the marker's _latlng property
        const lat = layer._latlng.lat;
        const lng = layer._latlng.lng;
        const latlng = [lat, lng];

        // Convert the marker's latitude and longitude to screen coordinates
        const { x: markerX, y: markerY } = map.latLngToContainerPoint(latlng);

        // Calculate the distance between the marker and the map center
        const distance = Math.sqrt(
          Math.pow(markerX - centerX, 2) + Math.pow(markerY - centerY, 2)
        );

        // Update 'minDistance' and 'closestCoords' if the current marker is closer
        if (distance < minDistance) {
          minDistance = distance;
          closestCoords = [markerX, markerY];
        }
      });

      // Check if the closest marker is within a tolerance of the map center
      if (minDistance <= centerPopupTolerance) {
        callsLayer.eachLayer((layer) => {
          if (layer instanceof L.CircleMarker || layer instanceof L.Marker) {
            // Convert the marker's latitude and longitude to screen coordinates
            const { x: markerX, y: markerY } = map.latLngToContainerPoint(
              layer.getLatLng()
            );
            // Check if the marker's screen coordinates are close to the closest marker's coordinates
            if (
              Math.abs(markerX - closestCoords[0]) < 1e-6 &&
              Math.abs(markerY - closestCoords[1]) < 1e-6
            ) {
              if (!isPopupOpen && currentPopup !== layer) {
                layer.openPopup();
                isPopupOpen = true;
                currentPopup = layer;
              }
              // Get the 'markerTitle' and 'markerDescription' data from the marker's options
              const { markerTitle, markerDescription } =
                layer.options.data;
              document.getElementById("title-text").textContent =
                markerTitle;
              document.getElementById("description-text").textContent =
                markerDescription;
            } else if (currentPopup === layer) {
              
              // Close the popup if it's already open
              isPopupOpen = false;
              layer.closePopup();
            }
          }
        });
      } else {
        // If no marker is close to the center, close all Circle Marker popups
        leafletMarkers.eachLayer((layer) => {
          if (layer instanceof L.CircleMarker) {
            layer.closePopup();
          }
        });
      }
    }, 5);
  });
};
