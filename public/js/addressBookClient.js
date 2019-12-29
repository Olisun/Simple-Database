$(document).ready(function () {

  var name = $("#name");
  var address = $("#address");
  var submit = $("#submit");
  var submit2 = $("#submit2");
  var displayData = $("#whereDataSpitsOut")



  $(document).on("click", "#addData", function (event) {
    event.preventDefault();
    console.log('on-click running')
    addData();
  })

  function addData() {
    event.preventDefault();
    console.log("addData() running")
    if (!name.val().trim() || !address.val().trim()) {
      return;
    }
    newContact({
      name: name.val().trim(),
      address: address.val().trim()
    });
  }

  function newContact(userData) {
    console.log(userData)
    $.post("/api/contacts", userData)
      .then(getContacts);
  }

  function getContacts() {
    console.log("inside getContacts")
    $.get("/api/contacts", function (data) {
      name.val("");
      address.val("");
      console.log(data);
    });
  }

  function getDataBase() {
    console.log("inside getDB")
    $.get("/api/contacts", function (data) {
      console.log(data)
      displayData.empty();
      for (var i = 0; i < data.length; i++) {
        displayData.append(`<div>${data[i].name}, ${data[i].address}</div>`);
      }
    });
  }
  submit2.on("click", function () {
    alert("Clicked");
    getDataBase();
  });
});