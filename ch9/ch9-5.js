let infoStore = [];
let storeName = "recipeStore";

const schema = [
    {id: "recipeName", prompt: "Recipe Name", type: "input"},
    {id: "servings", prompt: "Servings", type: "input"},
    {id: "timeToPrepare", prompt: "Time to Prepare", type: "input"},
    {id: "ingredients", prompt: "Ingredients", type: "textarea", rows: 5, cols: 50},
    {id: "process", prompt: "Process", type: "textarea", rows: 5, cols: 50}
]

let saveInfoStore = () => {
    const dataJson = JSON.stringify(infoStore);
    localStorage.setItem(storeName, dataJson);
}

let loadInfoStore = () => {
    const dataString = localStorage.getItem(storeName);
    if (dataString==null) {
        infoStore = [];
        return false;
    }
    else {
        infoStore = JSON.parse(dataString);
        return true;
    }
}

let saveInfo = (pos) => {
    const newInfo = {};
    const infoSchema = schema;
    for (property of infoSchema) {
        let itemInfo = getElementValue(property.id);
        newInfo[property.id] = itemInfo;
    }
    infoStore[pos] = newInfo;
    saveInfoStore();        
}

let displayInfo = (pos) => {
    const info = infoStore[pos];
    displayElementValue("recipeName", info.recipeName);
    displayElementValue("servings", info.servings);
    displayElementValue("timeToPrepare", info.timeToPrepare);
    displayElementValue("ingredients", info.ingredients);
    displayElementValue("process", info.process);
}

let makeElement = (element) => {
    const inputPar = document.createElement ("p");

    const labelElement = document.createElement ("label");
    labelElement.setAttribute("for", element.id);
    labelElement.innerText = element.prompt + ": ";
    labelElement.className = "inputLabel";
    inputPar.appendChild(labelElement);

    switch(element.type) {
        case "input":
            inputElement = document.createElement("input");
            inputElement.className = "inputText";
            inputElement.setAttribute("id", element.id);
            inputElement.setAttribute("value", "");
            inputPar.appendChild(inputElement);
            break;

        case "textarea":
            inputElement = document.createElement("textarea");
            inputElement.className = "inputTextarea";
            inputElement.setAttribute("rows", element.rows);
            inputElement.setAttribute("cols", element.cols);
            inputElement.setAttribute("id", element.id);
            inputElement.setAttribute("value", "");
            inputPar.appendChild(inputElement);
            break;
    }
    return inputPar;
}

let doBuildPage = (containerElementId, schema) => {
    const containerElement = document.getElementById(containerElementId);
    for (element of schema) {
        const inputPar = makeElement(element);
        containerElement.appendChild(inputPar);
    }
}

let doLoad = () => {
    doBuildPage("recipeItems", schema);
    loadInfoStore();
}

document.addEventListener("DOMContentLoaded", doLoad);

let getElementValue = (id) => {
    const element = document.getElementById(id);
    return element.value;
}

let displayElementValue = (id, text) => {
    const element = document.getElementById(id);
    element.value = text;
}

let findInfoPos = (name)  => {
    for (let pos=0; pos<infoStore.length; pos=pos+1) {
        if (infoStore[pos].recipeName==name) {
            return pos;
        }
        else {
            return NaN;
        }
    }
}

let doSave = () => {
    const name = getElementValue("recipeName");
    let pos = findInfoPos(name);
    if (isNaN(pos)) {
        pos = infoStore.length;
        saveInfo(pos);
        saveInfoStore();
    }
    alert("Recipe saved!");
}

let doFind = () => {
    const name = getElementValue("recipeName");
    let pos = findInfoPos(name);
    if (isNaN(pos)) {
        alert("Recipe not found!");
    }
    else {
        displayInfo(pos);
    }
}