$(document).ready(function () {
  var name = $("#name");
  var address = $("#address");
  var displayData = $("#whereDataSpitsOut");

  $(document).on("click", "#addData", addData);
  $(document).on("click", "#addData", showData);
  $(document).on("click", ".delete", deleteContact);

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

  function newContact(userData) {
    console.log(userData)
    $.post("/api/contacts", userData)
      .then(getContacts)
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

  function showData() {
    console.log("inside showDB")
    $.get("/api/contacts", function (data) {
      console.log(data);
      displayData.empty();
      for (var i = 0; i < data.length; i++) {
        displayData.append(`<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <button class="details btn btn-primary" data-id="${data[i].id}" data-name="${data[i].name}" data-address="${data[i].address}" data-toggle="modal" data-target="#exampleModalCenter" type="button">Details</button>
          <button class="delete btn btn-primary" data-id="${data[i].id}" data-name="${data[i].name}" data-address="${data[i].address}" type="button">Delete</button>

          <!-- Modal -->
          <div class="modal fade" id="exampleModalCenter"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
               
                      <h5 class="card-title">${data[i].name}</h5>
                      <p class="card-text">${data[i].address}</p>
                
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

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
});