$(document).ready(function () {

  var name = $("#name");
  var address = $("#address");
  var submit = $("#submit");
  var submit2 = $("#submit2");
  var displayData = $("#whereDataSpitsOut");
  var deleteButton = $(".delete");


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
        displayData.append(`<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].address}</p>
          <button id="edit" type="button" class="btn btn-primary">Edit</button>
          <button onClick="deleteContact()" type="button" class="btn btn-primary">Delete</button>
        </div>
      </div>`)
      }
    });
  }



  submit2.on("click", function () {
    getDataBase();
  });

  deleteButton.on("click", function () {
    deleteContact();
    alert("delete button clicked");

  });
});