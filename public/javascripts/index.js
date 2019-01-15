function loadContacts() {
    $.ajax('data/contacts.json').done(function (contacts) {
        console.info('contact loaded', contacts);
        displayContacts(contacts);
    });
}

function displayContacts(contacts) {
    var rows = contacts.map(function (contact) {
        console.log('transform contact', contact);
        return `<tr>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            <td><a href="/contacts/delete?phone=${contact.phone}">x</a></td>
             </tr>`;
    });
    console.warn('rows', rows);
    document.querySelector('tbody').innerHTML = rows.join('');
}


loadContacts();
