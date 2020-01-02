$(document).ready(function () {
  var name = $("#name");
  var updateName = $(".updateName.form-control");
  var address = $("#address");
  var updateAddress = $(".updateAddress.form-control");
  var displayData = $("#whereDataSpitsOut");
  var editData = $(".updateData");

  showData();

  $(document).on("click", "#addData", addData);
  $(document).on("click", "#addData", showData);
  $(document).on("click", ".delete", deleteContact);
  $(document).on("click", ".edit", editContact);
  // $(document).on("click", ".updateData", editContact);



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

  function updateData() {
    event.preventDefault();
    console.log("updateData() running")
    if (!updateName.val().trim() || !updateAddress.val().trim()) {
      return;
    }
    updateContact({
      name: updateName.val().trim(),
      address: updateAddress.val().trim()
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
    console.log("inside showDB")
    $.get("/api/contacts", function (data) {
      var editData = $(".updateData");
      console.log(data);
      displayData.empty();
      for (var i = 0; i < data.length; i++) {
        displayData.append(`<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].address}</p>
          <button class="edit btn btn-primary" data-id="${data[i].id}" data-name="${data[i].name}" data-address="${data[i].address}" type="button">Edit</button>
          <button class="delete btn btn-primary" data-id="${data[i].id}" data-name="${data[i].name}" data-address="${data[i].address}" type="button">Delete</button>
          <form class="updateData" data-form-id="${data[i].id}" data-state="hide" style="backgroundColor: white;" data-state="show" style="backgroundColor: yellow;">
            <div class="form-group">
              <label for="updateName">Name</label>
              <input type="text" class="updateName form-control" aria-describedby="emailHelp">
              <small class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="updateAddress">Address</label>
              <input type="text" class="updateAddress form-control" aria-describedby="emailHelp">
              <small class="form-text text-muted"></small>
            </div>
            <button type="button" class="btn btn-primary" class="submitUpdate">Update</button>
        </form>
        </div>
      </div>`)
      }
    });
  }

  $(document).on("click", ".edit", showForm);


  function showForm() {
    var state = $(this).attr("data-state");
    if (state === "hide") {
      var show = $(this).attr("data-show");
      $(this).attr("src", show);
      $(this).attr("data-state", "show");
    } else {
      $(this).attr("src", $(this).attr("data-hide"));
      $(this).attr("data-state", "hide");
    }
  };

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

  function editContact(event) {
    // click on the edit button and an input box shows for name and address. 
    // type in the input boxes and the values are captured. 
    // make an ajax call to database to update those fields. 
    // call showData to display on the page. 

    // $(".updateData").css("backgroundColor", "yellow")

    var formID = $("form.updateData.data-id");
    console.log(formID)
    formID.css("backgroundColor", "yellow");

    console.log("edit button clicked");
    var id = $(this).data("id");
    console.log(id);
    console.log(this);
    var name = $(this).data("name");
    console.log(name);
    var address = $(this).data("address");
    console.log(address);
    event.preventDefault();
    updateData();
    var updateContact = {
      name: updateName.val().trim(),
      address: updateAddress.val().trim()
    };
    console.log(updateContact)
    $.ajax({
      method: "PUT",
      url: "/api/contacts/" + id,
      data: updateContact
    }).then(getContacts);
  }
});
