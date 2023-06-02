let makeElement = (description) => {
    const inputPar = document.createElement("p");

    const labelElement = document.createElement("label");
    labelElement.setAttribute ("for", description.id);
    labelElement.className = "inputLabel";
    inputPar.appendChild(labelElement);

    switch(description.type) {
        case "input":
            inputElement = document.createElement("input");
            inputElement.className = "inputText";

        case "textarea":
            inputElement = document.createElement("textarea");
            inputElement.className = "inputTextarea";
    }

    inputElement.setAttribute ("id", description.id);
    inputElement.setAttribute ("value", "");
    inputPar.appendChild(inputElement);
    return inputPar;
}

let doBuildPage = (containerElementId, schema) => {
    const dataSchema = schema;
    let containerElement = document.getElementById(containerElementId);

    for (let item of dataSchema) {
        let itemElement = makeElement(item);
        containerElement.appendChild(itemElement);
    }
}

let getElementValue = (id) => {
    const element = document.getElementById(id);
    return element.value;
}

let storeData = (pos) => {
    const newData = {};

    for (property of dataSchema) {
        let itemData = getElementValue(property.id);
        newData[pos] = itemData;
    }
    dataStore[pos] = newData;
    saveDataStore();
}