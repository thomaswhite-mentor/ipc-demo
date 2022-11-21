const electron = require("electron");
const { GoogleMap } = require("./ui/google-map");
const subscribe = require("./marker-subscriber");

let centerofMap = { lat: 38.48679992210361, lng: -79.31082158237545 };
let googleMap = new GoogleMap(centerofMap);

googleMap.appendToElement(document.body);

subscribe((marker) => {
  googleMap.addMarker(marker);
  document.getElementById("count").innerHTML = marker.latLong;
});
