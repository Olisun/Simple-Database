$(document).ready(function () {

  var name = $("#name");
  var address = $("#address");
  var submit = $("#submit");

  $(document).on("click", "#addData", function (event) {
    event.preventDefault();
    console.log('on-click running')
    addData();
  })

  getContacts();

  function addData() {
    // event.preventDefault();
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
    console.log(userData);
  }

  function getContacts() {
    $.get("/api/contacts", function (data) {
      name.val("");
      address.val("");
    });
  }

  submit.on("click", function () {
    alert("Thank you! Message sent.")
  });
});