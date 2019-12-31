$(document).ready(function () {
  var name = $("#name");
  var address = $("#address");
  var displayData = $("#whereDataSpitsOut");

  showData();

  $(document).on("click", "#addData", addData);
  $(document).on("click", "#addData", showData);
  $(document).on("click", ".delete", deleteContact);
  $(document).on("click", ".edit", editContact);


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

  function showData() {
    console.log("inside getDB")
    $.get("/api/contacts", function (data) {
      console.log(data);
      displayData.empty();
      for (var i = 0; i < data.length; i++) {
        displayData.append(`<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].address}</p>
          <button class="edit btn btn-primary" data-id=${data[i].id} data-name=${data[i].name} data-address=${data[i].address} type="button">Edit</button>
          <button class="delete btn btn-primary" data-id=${data[i].id} type="button">Delete</button>
        </div>
      </div>`)
      }
    });
  }

  function deleteContact(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    console.log(this)
    console.log(id)
    console.log($(this).data())
    $.ajax({
      method: "DELETE",
      url: "/api/contacts/" + id
    }).then(getContacts)
      .then(showData);
  }

  function editContact(data) {
    // click on the edit button and an input box shows for name and address. 
    // type in the input boxes and the values are captured. 
    // make an ajax call to database to update those fields. 
    // call showData to display on the page. 

    console.log("edit button clicked");
    console.log(this);
    var name = $(this).data("name");
    console.log(name);
    var address = $(this).data("address");
    console.log(address);
    var updateContact = {
      name: name,
      address: address
    };
    $.ajax({
      method: "PUT",
      url: "/api/contacts/",
      data: updateContact
    }).then(getContacts)
      .then(showData);
  }
});





  // var currentContact = $(this).data("name")
  // $(this).children().hide();
  // $(this).children("input").val(currentContact.text);
  // $(this).children("input.edit").show();
  // $(this).children("input.edit").focus();