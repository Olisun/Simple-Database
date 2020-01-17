
$(document).ready(function () {
  var name = $("#name");
  var address = $("#address");
  var displayData = $("#whereDataSpitsOut");

  $(document).on("click", "#addData", addData);
  $(document).on("click", "#addData", showData);
  $(document).on("click", ".delete", deleteContact);
  $(document).on("click", ".edit", beginEditName);
  $(document).on("click", ".editName", finishEditName);
  $(document).on("click", ".edit", beginEditAddress);
  $(document).on("click", ".editAddress", finishEditAddress);

  showData();

  function addData() {
    event.preventDefault();
    if (!name.val().trim() || !address.val().trim()) {
      return;
    }
    newContact({
      name: name.val().trim(),
      address: address.val().trim()
    });
  }

  function newContact(userData) {
    $.post("/api/contacts", userData)
      .then(getContacts)
      .then(showData);
  }

  function getContacts() {
    $.get("/api/contacts", function (data) {
      name.val("");
      address.val("");
      console.log(data);
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

  function editName(newName) {
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/contacts/" + id,
      data: newName
    }).then(getData)
      .then(showContacts)
  }

  function beginEditName() {
    $.get("/api/contacts", function (data) {
      console.log(data);
    })
    var currentName = $(this).data();
    console.log(currentName);
    $(this).siblings("h5").hide();
    $(this).siblings("input.editName").val(currentName.text);
    $(this).siblings("input.editName").show();
    $(this).siblings("input.editName").focus();
  };

  function finishEditName(event) {
    $.get("/api/contacts", function (data) {
      console.log(data);
    })
    var newName = $(this).data();
    console.log(newName)
    if (event.which === 13) {
      newName.text = $(this).siblings("input.editName").val().trim();
      $(this).blur();
      editName(newName);
    };
  }

  function editAddress(newAddress) {
    var id = $(this).data("id");
    $.ajax({
      method: "PUT",
      url: "/api/contacts/" + id,
      data: newAddress
    }).then(getData)
      .then(showContacts)
  }

  function beginEditAddress() {
    $.get("/api/contacts", function (data) {
      console.log(data);
    })
    var currentAddress = $(this).data();
    console.log(currentAddress);
    $(this).siblings("p").hide();
    $(this).siblings("input.editAddress").val(currentAddress.text);
    $(this).siblings("input.editAddress").show();
    $(this).siblings("input.editAddress").focus();
  };

  function finishEditAddress(event) {
    $.get("/api/contacts", function (data) {
      console.log(data);
    })
    var newAddress = $(this).data();
    console.log(newAddress)
    if (event.which === 13) {
      newAddress.text = $(this).siblings("input.editAddress").val().trim();
      $(this).blur();
      editAddress(newAddress);
    };
  }

  function showData() {
    $.get("/api/contacts", function (data) {
      console.log(data);
      displayData.empty();
      for (var i = 0; i < data.length; i++) {
        displayData.append(
          `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="name card-title">${data[i].name}</h5>
              <input class="editName" type="text" data-name="${data[i].name}" data-id="${data[i].id}" style="display: none;">
              <p class="card-text">${data[i].address}</p>
              <input class="editAddress" type="text" data-address="${data[i].address}" data-id="${data[i].id}" style="display: none;">
              <br>
              <button class="edit btn btn-primary" data-id="${data[i].id}" type="button">Edit</button>
              <button class="delete btn btn-primary" data-id="${data[i].id}" type="button">Delete</button>
            </div>
          </div>`
        )
      }
    });
  }
});

// ************************************************************* //

// var id = data[i].id;
// var name = data[i].name;
// var address = data[i].address;
// console.log(id);
// console.log(name);
// console.log(address);
// var card = $("<div class='card' style='width: 18rem;'>");
// var cardBody = $("<div class='card-body'>");
// var cardTitle = $("<h5 class='card-title'>").text(name);
// var cardText = $("<P class='card-text'>").text(address);
// var editButton = $("<button class='edit btn btn-primary'>Edit</button>");
// var deleteButton = $("<button class='delete btn btn-primary'>Delete</button>");
// editButton.attr("data-id", id);
// deleteButton.attr("data-id", id);
// displayData.append(card);
// displayData.append(cardBody)
// displayData.append(cardTitle);
// displayData.append(cardText);
// displayData.append(editButton);
// displayData.append(deleteButton);


// $(document).on("click", ".edit", edit);

// function edit() {
//   console.log("clicked");
//   var idd = $(this).data("id");
//   console.log(idd)
//   var title = $(this).data("name");
//   console.log(title)
// }