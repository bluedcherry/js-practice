const es6SortDesc = (array) => array.sort((a, b) => b-a);

let makeInput = (labelName, min, max) => {
    let inputPar = document.createElement("p");

    let labelElement = document.createElement("label");
    labelElement.innerText = labelName + " (" + min + " - " + max + ") ";
    labelElement.setAttribute("for", labelName)
    inputPar.appendChild(labelElement);

    let inputElement = document.createElement("input");
    inputElement.setAttribute("max", max);
    inputElement.setAttribute("min", min);
    inputElement.setAttribute("value", 0);
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("id", labelName);
    inputElement.className="input";
    inputPar.appendChild(inputElement);

    return inputPar;
}

let doBuildItem = (containerElemenId, min, max, placeNames) => {
    let containerElement = document.getElementById(containerElemenId);
    for (let placeName of placeNames) {
        let itemPar = makeInput(placeName, min, max);
        containerElement.appendChild (itemPar);
    }
}

function getNoFromElement(element) {
    // const element = document.getElementById(name);
    const text = element.value;
    const number = Number(text);
    return number;
}

function getTotal(array) {
    return array.reduce((a,b)=>a+b, 0);
}

function getHighest(array) {
    // const sortedArray = es6SortDesc([...array]);
    const sortedArray = es6SortDesc(array);
    return sortedArray.shift();
}
// descend
function getLowest(array) {
    console.log(array);
    // const sortedArray = es6SortDesc([...array]);
    const sortedArray = es6SortDesc(array);
    console.log(sortedArray);
    return sortedArray.pop();
}


let doCal = () => {
    const sales = [];
    let salesNo = 0;
    const salesElement = document.getElementById("salesItems");
    for (let item of salesElement.children) {
        const salesValue = getNoFromElement(item.children[1]);
        sales[salesNo] = salesValue;
        salesNo = salesNo + 1;
    }
    
    const totalSales = getTotal(sales);
    var highestSales = getHighest(sales);
    var lowestSales = getLowest(sales);

    const result = `Total: ${totalSales} Highest: ${highestSales} Lowest: ${lowestSales}`;

    outputElement = document.getElementById("outputParagraph");
    outputElement.textContent = result;
    for (let item of salesElement.children) {
        const salesValue = getNoFromElement(item.children[1]);
        // const highestSales = getHighest(sales);
        // const lowestSales = getLowest(sales);
        item.children[1].className = "input";

        if (salesValue==highestSales) {
            item.children[1].className = "inputHighest";
        }
        if (salesValue==lowestSales) {
            item.children[1].className = "inputLowest";
        }
    }
}


