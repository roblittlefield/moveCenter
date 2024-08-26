# addHandlerMoveCenter - README

## Overview

`addHandlerMoveCenter` is a JavaScript function designed to enhance the user experience on maps created using the Leaflet library. It automatically opens the popup of the marker closest to the center of the map when the user pans or moves the map, ensuring that relevant information is always readily accessible. This functionality is especially useful for applications like `SFPDcalls.com`, where users may want to quickly view details of events or locations as they navigate the map.

## Features

- **Automatic Popup Handling:** Opens the popup for the marker closest to the map's center after the user moves the map.
- **Tolerance Control:** Configurable tolerance for how close a marker needs to be to the center before its popup is automatically opened.
- **Prevents Repetitive Looping:** A slight delay ensures that the function does not trigger excessively, avoiding performance issues or unintended repetitive actions.
- **Dynamic Popup Content:** Updates the content of specified HTML elements with information from the marker's options when the popup is opened.

## How It Works

1. **Event Listening:** The function attaches an event listener to the map's `move` event.
2. **Marker Proximity Calculation:** It calculates the distance between the center of the map and each marker to identify the closest one.
3. **Popup Management:** If the closest marker is within the specified tolerance, its popup is automatically opened, and the content of the popup is displayed in the designated HTML elements. If no marker is close enough, any open popups are closed.
4. **Loop Prevention:** A small delay (`setTimeout`) prevents the function from executing too frequently during rapid map movements, ensuring smooth performance.

## Usage

### Parameters

- **leafletMarkers (`L.LayerGroup`)**: A Leaflet layer group containing the markers to be used for centering the map and managing popups.
- **map (`L.Map`)**: The Leaflet map instance to which the handler is added.

### Example

```javascript
import { addHandlerMoveCenter } from './path-to-your-module';

const map = L.map('map-id').setView([37.7749, -122.4194], 13);
const leafletMarkers = L.layerGroup().addTo(map);

addHandlerMoveCenter(leafletMarkers, map);```
```

### Integration with HTML ### 
Ensure that your HTML contains the following elements to display marker information:
```html
<div id="title-text"></div>
<div id="description-text"></div>
```

These elements will be dynamically updated with the marker's title and description when the popup is opened.

## Important Notes

### Tolerance Control

The `centerPopupTolerance` variable controls how close a marker must be to the center of the map for its popup to be opened. This value can be adjusted to suit your application's needs.

### Performance Considerations

The small delay (`5ms`) in the `setTimeout` function is crucial for preventing the function from executing too frequently, which could lead to performance issues on maps with many markers.

## License

This code is licensed under the MIT License.

## Acknowledgments

This functionality is inspired by the need to efficiently manage popup interactions in map-based applications like `SFPDcalls.com`. Special thanks to the developers and contributors of the Leaflet library for providing a robust platform for web mapping.
