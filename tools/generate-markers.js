const tabletop = require("tabletop");
const fs = require("fs");
const sheetsKey = require("../package.json").data;

//Download markers data from our sheets file and spit out a json file
tabletop.init({
  key: sheetsKey,
  callback: function(data, tabletop) {
    let newData = [];
    data.forEach((n, i) => {
      let coords = n.coordinates.split(",").map(y => y.trim());
      newData.push({
        coords: coords,
        text: n.text
      });
    });
    fs.writeFileSync("src/data.json", JSON.stringify(newData));
    console.log("wrote files");
  },
  simpleSheet: true
});
