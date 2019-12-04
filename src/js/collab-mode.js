import tabletop from "tabletop";
import sheetsKey from "../../package.json";

/**
 * This module pulls enables collab mode which does 3 things:
 * 1.) pulls directly from the google sheets
 * 2.) allows users to create new marke locations by clicking anywhere on the map
 * 3.) allows users to move existing markers by clicking and dragging
 */
export default (mapInstance, markerInstance) => {
  tabletop.init({
    key: sheetsKey.data,
    callback: function(data) {
      data.forEach((n, i) => {
        let coords = n.coordinates.split(",").map(y => y.trim());
        L.marker([coords[0], coords[1]], {
          icon: markerInstance,
          rowNum: i + 2,
          draggable: true
        })
          .addTo(mapInstance)
          .bindPopup(`<b>Row ${i + 2}</b><br>${n.text}`)
          .on("dragend", function(e) {
            let coords = this.getLatLng();
            alert(
              `Row ${e.target.options.rowNum}, New location: ${coords.lat}, ${coords.lng}`
            );
          });
      });
    },
    simpleSheet: true
  });

  //Make sure it's clear we're in Collab mode by appending a banner to the bottom right
  let body = document.querySelector("body");
  body.insertAdjacentHTML(
    "beforeend",
    `<div style="position:fixed;bottom:0;right:0;color:#fff;background:#aa1e23;padding:1.5em;z-index:999999999">Collaboration Mode. Do not share this link!</div>`
  );
  body.classList.remove("standalone");

  //Fire an alert if user clicks so they can copy the coordinates
  mapInstance.on("click", e => {
    alert(`New marker: ${e.latlng.lat}, ${e.latlng.lng}`);
  });

  return true;
};
