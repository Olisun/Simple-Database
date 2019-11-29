var path = require("path");

module.exports = function (app) {

  // index route loads user.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

};