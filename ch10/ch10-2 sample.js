var mainPage;   // HTML文件中的主页面内容区域div
var dataStore;  // Array of stock items
var storeName;  // name of save data in local storage
var activeItem; // currently active stock item (for entry and edit)

const STORE_LOAD_OK = 0;
const STORE_EMPTY = 1;
const STORE_INVALID = 2;

function loadDataStore() {

    // get the data array from local storage
    var dataArrayJSON = localStorage.getItem(storeName);

    // if there is no data make an empty store
    if (dataArrayJSON == null) {
        dataStore = [];
        return STORE_EMPTY;
    }

    // read the stored contacts
    dataStore = [];

    try {
        var dataArray=JSON.parse(dataArrayJSON);

        for (dataLine of dataArray) {
            dataStore[dataStore.length] = StockItem.JSONparse(dataLine);
        }
    }
    catch {
        // if the parse fails make an empty store
        dataStore = [];
        return STORE_INVALID;
    }

    return STORE_LOAD_OK;
}

function saveDataStore() {
    var dataArray = [];

    for(item of dataStore)
    {
        dataArray[dataArray.length] = item.JSONstringify();
    }

    var dataJSON = JSON.stringify(dataArray);

    localStorage.setItem(storeName, dataJSON);
}

// 删除原页面内容，载入新内容（新页面）功能
function clearPage() {
    // clear the display
    while (mainPage.children.length > 0)
        mainPage.removeChild(mainPage.children[0]);
}

function openPage(title) {
    clearPage();
    let titlePar = document.createElement("p");
    titlePar.innerText = title;
    titlePar.className = "pageTitle";
    mainPage.appendChild(titlePar);
}

// 显示页面内容功能
function showMenu(schema) {
    for (const buttonDesc of schema) {
        let buttonPar = document.createElement("p");
        buttonPar.className = "menuPar";

        let descriptionPar = document.createElement("p");
        descriptionPar.innerText = buttonDesc.desc;
        descriptionPar.className = "menuButtonCaption";
        buttonPar.appendChild(descriptionPar);

        let button = document.createElement("button");
        button.innerText = buttonDesc.label;
        button.className = "menuButton";
        button.setAttribute("onclick", buttonDesc.func);
        buttonPar.appendChild(button);

        mainPage.appendChild(buttonPar);
    }
}




// 生成主页面内容
function doShowMainMenu() {
    openPage("Main Menu");

    showMenu(
        [{ desc: "Add Dress", label: "Dress", func: "doAddDress()" },
        { desc: "Add Pants", label: "Pants", func: "doAddPants()" },
        { desc: "Add Skirt", label: "Skirt", func: "doAddSkirt()" },
        { desc: "Add Top", label: "Top", func: "doAddTop()" },
        { desc: "Update stock item", label: "Update", func: "doUpdateStock()" },
        { desc: "List stock items", label: "List", func: "doListFashionShop()" }]);
}




// 选择Add项目后的页面，存储/取消
function addStock(StockClass) {

    activeItem = new StockClass();

    openPage("Add " + activeItem.type);
// getHTML怎么使用
    activeItem.getHTML(mainPage);

    showMenu(
        [{ desc: "Save item", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function doAddDress() {
    addStock(Dress);
}

function doAddPants() {
    addStock(Pants);
}

function doAddSkirt() {
    addStock(Skirt);
}

function doAddTop() {
    addStock(Top);
}

// 新建项目储存
function doSaveAdd() {
    // loadFromHTML怎么使用 
    activeItem.loadFromHTML();
    // getLargestStockRef怎么使用
    activeItem.stockRef = StockItem.getLargestStockRef(dataStore) + 1;
    dataStore[dataStore.length] = activeItem;
    alert(activeItem.type + " " + activeItem.stockRef + " added");
    saveDataStore();
    doShowMainMenu();
}




// list stock items页面内容
function doListFashionShop() {

    openPage("Stock List");

    for (let item of dataStore) {
        let itemPar = document.createElement("p");

        let openButton = document.createElement("button");
        openButton.innerText = "Update";
        openButton.className = "itemButton";
        let editFunctionCall = "doUpdateItem('" + item.stockRef + "')";
        openButton.setAttribute("onclick", editFunctionCall);
        itemPar.appendChild(openButton);

        let detailsElement = document.createElement("p");
        detailsElement.innerText = item.getDescription();
        detailsElement.className = "itemList";
        itemPar.appendChild(detailsElement);

        mainPage.appendChild(itemPar);
    }
}

// list stock item页面update按钮功能
// 查找
function findItem(stockRef) {
    for (let item of dataStore) {
        if (item.stockRef == stockRef) {
            return item;
        }
    }
    return null;
}
// 显示该项目的更新页面
function doUpdateItem(stockRef) {

    var item = findItem(stockRef);

    if (item == null) {
        return false;
    }

    activeItem = item;

    openPage("Update " + item.type + " " + stockRef);

    item.getHTML(mainPage);

    item.sendToHTML();

    showMenu(
        [{ desc: "Save updates", label: "Save", func: "doSaveUpdate()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);

    return true;
}

// 更新
function doSaveUpdate() {
    activeItem.loadFromHTML();
    alert(activeItem.type + " " + activeItem.stockRef + " updated");
    saveDataStore();
    doShowMainMenu();
}

// 取消更新，返回主页
function doCancelUpdate() {
    doShowMainMenu();
}




//  Update stock item页面内容
function doUpdateStock() {
    openPage("Update Stock");
    // 
    StockItem.buildElementsFromSchema(mainPage,
        [{ id: "findStockRef", prompt: "Reference", type: "input" }]);

    showMenu(
        [{ desc: "Find item", label: "Find", func: "doFindItem()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);
}

function doFindItem() {
    var searchRefElement = document.getElementById("findStockRef");
    var searchRef = searchRefElement.value;

    if (!doUpdateItem(searchRef)) {
        alert("Item " + searchRef + " not found");
    }
}

// 这里不太懂
function doListStock() {
    openPage("List Stock");
    doListFashionShop();
}

function doMakeTestFashionShop() {
    dataStore = [];
    Dress.getTestItems(dataStore);
    Pants.getTestItems(dataStore);
    Skirt.getTestItems(dataStore);
    Top.getTestItems(dataStore);
}

function doStartFashionShop(mainPageId, storeNameToUse) {
    mainPage = document.getElementById(mainPageId);

    storeName = storeNameToUse;

    doMakeTestFashionShop();

    doShowMainMenu();
}