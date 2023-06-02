// const contactNames = [];
// const contactAddresses = [];
// const contactPhones = [];

let getElementValue = (id) => {
    const element = document.getElementById(id);
    return element.value;
}

let displayElementValue = (id, text) => {
    const element = document.getElementById(id);
    element.value = text;
}

const contactStore = [];

// 使用对象{}储存数据
let storeContact = (pos) => {
    let contact = {};
    contact.name = getElementValue("name");
    contact.address = getElementValue("address");
    contact.phone = getElementValue("phone");
    contactStore[pos] = contact;
}
// let storeContact = (pos) => {
//     contactNames[pos] = getElementValue("name");
//     contactAddresses[pos] = getElementValue("address");
//     contactPhones[pos] = getElementValue("phone");
// }

let displayContact = (pos) => {
    const contact = contactStore[pos];
    displayElementValue("name", contact.name);
    displayElementValue("address", contact.address);
    displayElementValue("phone", contact.phone);
}

let findContactPos = (name) => {
    for (let pos=0; pos<contactStore.length; pos=pos+1) {
        // if (contactNames[pos]==name) {
        let storedName = contactStore[pos].name;
        if (storedName==name) {
            return pos;
        }
    return NaN;
    }
}

let doSave = () => {
    const name = getElementValue("name");
    let pos = findContactPos(name);
    if (isNaN(pos)) {
        pos = contactStore.length;
    }
    storeContact(pos);
    alert ("The information has been saved in the store");
}

let doFind = () => {
    const name = getElementValue("name");
    const pos = findContactPos(name);
    if (isNaN(pos)) {
        alert ("No information found in the contacts.")
    }
    else {
        displayContact(pos);
    }
} 
