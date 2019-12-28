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
  }

  function getContacts() {
    console.log("inside getContacts")
    $.get("/api/contacts", function (data) {
      name.val("");
      address.val("");
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);
        console.log(data[i].address);
        displayData.append(data[i].name);
        displayData.append(data[i].address);
      }
    });
  }

  submit2.on("click", function () {
    alert("Clicked");
  });

  submit.on("click", function () {
    alert("Thank you! Message sent.")
  });

  function getDataBase() {
    console.log("inside getDB")
    $.get("/api/contacts", function (data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createRow(data[i]));
      }
      console.log(data)
      renderList(rowsToAdd);
      nameInput.val("");
    });
  }

  // function renderList(rows) {
  //   dataList.children().not(":last").remove();
  //   dataContainer.children(".alert").remove();
  //   if (rows.length) {
  //     console.log(rows);
  //     dataList.prepend(rows);
  //   }
  //   else {
  //     renderEmpty();
  //   }
  // }
});