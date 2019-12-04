import "leaflet/dist/leaflet.css";
import "leaflet";
import "./js/leaflet-fix";
import "./js/iframe-check";
import data from "./data.json";
import markerIcon from "./marker.png";

//Uncomment this line to put the project in "collaboration mode"
//import collabMode from "./js/collab-mode";

//Event handler to dismiss the intro screen
document.querySelector("#dismiss-overlay").addEventListener("click", () => {
  document.querySelector("body").classList.add("explore");
});

//Customize the marker icon
let customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14]
});

//Max bounds of our map
let bounds = [
  [-210, 3],
  [-46, 253]
];

//Create a new map instance
let bigWall = new L.map("map", {
  crs: L.CRS.Simple,
  zoom: 3,
  attributionControl: false,
  center: [-130, 130],
  minZoom: 0,
  maxZoom: 6,
  maxBounds: bounds
});

//Change zoom control location
bigWall.zoomControl.setPosition("topright");

//Fit bounds to current zoom level + 1. This may crop some, but fills the screen better on viewports with an extreme aspect ratio
let zoomLevel = bigWall.getBoundsZoom(bounds);
bigWall.setZoom(zoomLevel + 1).setMinZoom(zoomLevel);

//Create a new tilelayer
L.tileLayer("map-tiles/{z}/{y}/{x}.jpg").addTo(bigWall);

//Load the markers
if (typeof collabMode === "undefined") {
  data.forEach(n => {
    L.marker([n.coords[0], n.coords[1]], {
      icon: customIcon
    })
      .addTo(bigWall)
      .bindPopup(n.text, { keepInView: true });
  });
} else {
  collabMode(bigWall, customIcon);
}
