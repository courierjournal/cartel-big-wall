const MapSlicer = require("mapslice");

const mapSlicer = new MapSlicer({
  file: "raw-map/BIGWALL2.jpg",
  output: "raw-map/map-tiles/{z}/{y}/{x}.jpg",
  tileSize: 256,
  imageMagick: true,
  background: "#222222FF",
  tmp: "raw-map/tmp",
  parallelLimit: 3,
  skipEmptyTiles: true,
  autoStart: false
});

mapSlicer.on("start", (files, options) =>
  console.info(`Starting to process ${files} files.`)
);
mapSlicer.on("error", err => console.error(err));
mapSlicer.on("warning", err => console.warn(err));
mapSlicer.on("progress", progress =>
  console.info(`Progress: ${Math.round(progress * 100)}%`)
);
mapSlicer.on("end", () => console.info("Finished processing slices."));
mapSlicer.start();
