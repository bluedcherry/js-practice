let dataStore = [];
let storeName = "test";
// 创建全局数组对象
const schema =  [
    {id:'name', prompt:'Name', type:'input'},
    {id:'score', prompt:'Score',type:'input'},
    {id:'duration', prompt:'Duration', type:'input'}
];

// 本地储存功能
let saveDataStore = () => {
    const storeJson = JSON.stringify (dataStore);
    localStorage.setItem(storeName, storeJson);
}

let loadDataStore = () => {
    const dataString = localStorage.getItem(storeName);
    // console.log("dataString", dataString);
    if (dataString==null) {
        dataStore = [];
        return false;
    }
    else {
        dataStore = JSON.parse(dataString);
        return true;
    }
}

// 小函数，精简代码便于使用（待用）
let getElementValue = (id) => {
    const element = document.getElementById(id);
    return element.value;
}

let displayElementValue = (id, text) => {
    const element = document.getElementById(id);
    element.value = text;
}

let findDataPos = (name) => {
    // console.log(dataStore, "dataStore");
    // console.log(dataStore.length);
    for (let pos=0; pos<dataStore.length;pos=pos+1) {
        // console.log(dataStore[pos].name);
        if (dataStore[pos].name==name) {
            return pos;
        }
    }
    return NaN;
}

// 存储与展示数据（待用）
let saveData = (pos) => {
    const newData = {};
    const dataSchema = schema;
    for (property of dataSchema) {
        let itemData = getElementValue(property.id)
        newData[property.id] = itemData;
    }
    dataStore[pos] = newData;
    saveDataStore();     
}

let displayElement = (pos) => {
    const data = dataStore[pos];
    displayElementValue("name", data.name);
    displayElementValue("score", data.score);
    displayElementValue("duration", data.duration);
}

// 加载时自动生成页面
let makeElement = (element) => {
    let inputPar = document.createElement("p");

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", element.id);
    labelElement.innerText = element.prompt + ": ";
    labelElement.className = "inputLabel";
    inputPar.appendChild(labelElement);

    let inputElement = document.createElement("input");
    inputElement.setAttribute("id", element.id);
    inputElement.setAttribute("value", "");
    inputElement.className = "inputText";
    inputPar.appendChild(inputElement);

    return inputPar;
}

let doBuildPage = (containerElemenId, schema) => {
    const dataSchema = schema;
    const containerElement = document.getElementById(containerElemenId);
    for (item of dataSchema) {
        let itemElement = makeElement(item);
        containerElement.appendChild(itemElement);
    }
}

// 页面中的save和find交互功能getElementValue("name")
let doSave = () => {
    const name = getElementValue("name");
    // console.log("name", name);
    // 从Input获取数据，组装成对象
    // const schema = ;
    let pos = findDataPos(name);
    // console.log(pos, "pos sss");
    if (isNaN(pos)) {
        pos = dataStore.length;
    }
    // console.log(pos, "pos after should be zero");
    saveData(pos);
    alert("The information has been saved!");
}

let doFind = () => {
    const name = getElementValue("name");
    let pos = findDataPos(name);
    if (isNaN(pos)) {
        alert("No information found!")
    }
    else {
        displayElement(pos);
    }
}

const doLoad = () => {
    doBuildPage('gameItems', schema);
    loadDataStore();
}
// /**
//  * 
//  * @returns objects 从input获取的对象，用于存储到localStorage
//  */
// const getInputData = () => {
//     const retArray = {};
//     const name = document.querySelector("#name").value;
//     const score = document.querySelector("#score").value;
//     const duration = document.querySelector("#duration").value;
//     const nameObj = {};
//     nameObj.id = 'name';
//     return retArray;
// };

document.addEventListener("DOMContentLoaded", ()=>doLoad());