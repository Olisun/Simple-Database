$(document).ready(function () {
  var name = $("#name");
  var address = $("#address");
  var displayData = $("#whereDataSpitsOut");

  $(document).on("click", "#addData", addData);
  $(document).on("click", "#addData", showData);
  $(document).on("click", ".delete", deleteContact);
  $(document).on("click", ".updateData", updateData);


  showData();

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
    console.log("inside updateData")
    console.log("updateData() running")
    if (!name.val().trim() || !address.val().trim()) {
      return;
    }
    updateContact({
      name: name.val().trim(),
      address: address.val().trim()
    });;
  }

  function newContact(userData) {
    console.log(userData)
    $.post("/api/contacts", userData)
      .then(getContacts)
      .then(showData);
  }

  function updateContact(newData) {
    event.preventDefault();
    console.log("updateContact() running")
    console.log("inside updateContact")
    var id = $(this).data("id");
    console.log(this)
    console.log(id)
    console.log($(this).data())
    var update = {
      name: name.val().trim(),
      address: address.val().trim()
    }
    console.log(update)
    $.ajax({
      method: "PUT",
      url: "/api/contacts/" + id,
      data: update
    }).then(getContacts)
      .then(showData);
  }

  function getContacts() {
    console.log("inside getContacts")
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

  function showData() {
    console.log("inside showDB")
    $.get("/api/contacts", function (data) {
      console.log(data);
      displayData.empty();
      for (var i = 0; i < data.length; i++) {
        displayData.append(
          `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${data[i].name}</h5>
              <p class="card-text">${data[i].address}</p>
              <button class="edit btn btn-primary" data-id="${data[i].id}" data-toggle="modal" data-target="#exampleModal2" type="button">Edit</button>
              <button class="delete btn btn-primary" data-id="${data[i].id}" type="button">Delete</button>
            </div>
          </div>
          
          <!-- Modal -->
          <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"   aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Enter Updates</h5>
                </div>
                <div class="modal-body">
                  <form class="updateData">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" class="form-control" class="name" aria-describedby="emailHelp">
                      <small class="form-text text-muted"></small>
                    </div>
                  <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" class="address" aria-describedby="emailHelp">
                    <small class="form-text text-muted"></small>
                  </div>
                  <button type="button" data-id="${data[i].id}" class="edit btn btn-primary" data-dismiss="modal">Submit</button>
                </form>
                </div>
              </div>
            </div>
          </div>`
        )
      }
    });
  }
});
