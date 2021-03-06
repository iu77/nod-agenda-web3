
var phoneToEdit = '';

function loadContacts() {
    $.ajax('contacts').done(function (contacts) {
        console.info('contact loaded', contacts);
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
}



function saveContact() {
    console.debug('saveContact...');
    var firstName = document.querySelector('input[name=firstName]').value;
    var lastName = $('input[name=lastName]').val();
    var phone = $('input[name=phone]').val();
    console.debug('saveContact...', firstName, lastName, phone);

    var actionUrl = phoneToEdit ? 'contacts/update?id=' + phoneToEdit : 'contacts/create';
    $.post(actionUrl, {
        firstName, //shortcut frome ES6(key is the same as value variable name)
        lastName,
        phone: phone //ES5 (key=value)
    }).done(function (response) {
        console.warn('done create contact', response);
        phoneToEdit = "";
        if (response.success) {
            loadContacts();
        }
    });
}
function displayContacts(contacts) {
    var rows = contacts.map(function (contact) {
        // console.log('transform contact', contact);
        return `<tr>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            <td>
                <a href="/contacts/delete?id=${contact.id}">&#10006;</a>
                <a href='#' class="edit" data-id="${contact.id}" >&#9998;</a>
            </td>
             </tr>`;
    });
    //console.warn('rows', rows);

    document.querySelector('tbody').innerHTML = rows.join('');
}

function initEvents() {
    $("tbody").delegate("a.edit", "click", function () {
        phoneToEdit = this.getAttribute('data-id');

        var contact = globalContacts.find(function (contact) {
            return contact.id == phoneToEdit;
        });
        console.log('edit', phoneToEdit, contact);

        document.querySelector('input[name=firstName]').value = contact.firstName;
        $('input[name=lastName]').val(contact.lastName);
        $('input[name=phone]').val(contact.phone);
    });

    document.getElementById("search").addEventListener("input", doSearch);
}


function doSearch(ev) {
    var value = this.value.toLowerCase();
    //sau:  //var value = document.getElementById("search").value;
    console.warn('please... search', value, ev);

    var filteredContacts = globalContacts.filter(function (contact) {
        console.log(contact.firstName, value);
        return contact.firstName.toLowerCase().includes(value) ||
            contact.lastName.toLowerCase().includes(value)||
            contact.phone.toLowerCase().includes(value);
    });

    displayContacts(filteredContacts);
}

// start app

loadContacts();
initEvents();
