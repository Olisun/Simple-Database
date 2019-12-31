$(document).ready(function () {

  var name = $("#name");
  var address = $("#address");
  var displayData = $("#whereDataSpitsOut");

  $(document).on("click", "#addData", addData);
  $(document).on("click", "#submit2", getDataBase);
  $(document).on("click", ".delete", deleteContact);

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
      console.log(data);
      displayData.empty();
      for (var i = 0; i < data.length; i++) {
        displayData.append(`<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].address}</p>
          <button class="edit btn btn-primary" type="button">Edit</button>
          <button class="delete btn btn-primary" data-id=${data[i].id} type="button">Delete</button>
        </div>
      </div>`)
        displayData.find(".delete").data("id", data.id)
      }
    });
  }

  function deleteContact(event) {
    alert("delete button clicked");
    event.stopPropagation();
    var id = $(this).data("id");
    console.log(this)
    console.log(id)
    console.log($(this).data())
    $.ajax({
      method: "DELETE",
      url: "/api/contacts/" + id
    }).then(getContacts);
  }
});



// function deleteContact(id) {
//   console.log("inside deleteContact")
//   $.ajax({
//     method: "DELETE",
//     url: "/api/contacts/" + id
//   }).then(getContacts);
// }

// function handleDelete() {
//   console.log("inside handleDelete")
//   var currentContactCard = $(this)
//   console.log(currentContactCard)


//   deleteContact(currentContactCard.id);
// }