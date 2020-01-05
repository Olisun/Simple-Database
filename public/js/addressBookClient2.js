$(document).ready(function () {
  var $newContactInput = $("input.new-contact");
  var $whereTheDataSpitsOut = $(".whereTheDataSpitsOut");

  $(document).on("submit", "#new-contact-form", insertContact);

  var contacts = [];
  getContacts();

  function insertContact(event) {
    event.preventDefault();
    var contact = {
      name: name.val().trim(),
      address: address.val().trim()
    };
    $.post("api/contacts, contact, getContacts");
    $newContactInput.val("");
  }

  function getContacts() {
    $.get("api/contacts", function (data) {
      contacts = data;
      initializeRows();
    });
  }

  function createNewRow(contact) {
    var $newInputRow = $(
      [
        "<li class='list-group-item contact-item'>",
        "<span>",
        contact.text,
        "<span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );
    $newInputRow.find("button.delete").data("id", contact.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("contact", contact);
    if (contact.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  function initializeRows() {
    $whereTheDataSpitsOut.empty();
    var rowsToAdd = [];
    for (var i = 0; i < contacts.length; i++) {
      rowsToAdd.push(createNewRow(contacts[i]));
    }
    $whereTheDataSpitsOut.prepend(rowsToAdd);
  }
})