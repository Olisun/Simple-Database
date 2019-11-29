var db = require('../models');

module.exports = function (app) {

  app.get("/api/contacts", function (req, res) {

    db.addressBook.findAll({}).then(function (dbaddressBook) {
      res.json(dbaddressBook);
    });

  });

  app.post("/api/contacts", function (req, res) {

    console.log("api/contacts route hit successfully")
    console.log(req)
    console.log(res)
    db.addressBook.create(req.body).then(function (dbaddressBook) {
      res.json(dbaddressBook);
    });

  });

  app.get("/api/:name/:message", function (req, res) {

    db.addressBook.findOne({
      where: {
        name: req.params.name,
        address: req.params.address
      }
    }).then(function (dbaddressBook) {
      res.json(dbaddressBook);
    });

  });

}