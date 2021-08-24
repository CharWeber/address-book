// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};



AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};


AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};
// Business logic for Address ---------
function Address(street, city, state, zip){
  this.street = street
  this.city = city
  this.state = state
  this.zip = zip
}
//Added by Anthony
// AddressBook.prototype.addressContact = function(address) {
//   address.id = this.assignId();
//   this.address[address.id] = address;
// };


// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address = {};
  this.addressId = 0;
}
Contact.prototype.addAddress = function(address) {
  address.id = this.assignAddressId();
  this.address[address.id] = address;
};

Contact.prototype.assignAddressId = function() {
  this.addressId += 1;
  return this.addressId;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName + " ";
};



// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}
function displayContactDropdown(addressBookToDisplay) {
  let contactsdrop = $("select#contactList");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<option value=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</option>";
  });
  contactsdrop.html(htmlForContactInfo);
}

function showContact(contactId){
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class ='deleteButton' id=" + contact.id +">Delete</button>");
}
function attachContactListeners(){
  $("ul#contacts").on("click","li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");

    
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);

    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    displayContactDropdown(addressBook);


    // address form submission
    $("form#new-address").submit(function(event) {

      const selectInput = $("#contactList option:selected").val();
      const inputtedStreet = $("input#new-street").val();
      const inputtedCity = $("input#new-city").val();
      const inputtedState = $("input#new-state").val();
      const inputtedZip = $("input#new-zip").val();
      const selectedContact = addressBook.findContact(selectInput)

      $("input#new-street").val("");
      $("input#new-city").val("");
      $("input#new-state").val("");
      $("input#new-zip").val("");

      let newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedZip);
      selectedContact.addAddress(newAddress);
      console.log(addressBook)
      event.preventDefault();
    });
  });
});