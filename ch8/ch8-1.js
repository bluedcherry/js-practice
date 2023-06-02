function getNoFromElement(name) {
    const element = document.getElementById(name);
    const text = element.value;
    const number = Number(text);
    return number;
}

// function doTotal() {
//     var sale1, sale2, sale3, sale4, sale5, sale6;
//     sale1 = getNoFromElement("saleText1");
//     sale2 = getNoFromElement("saleText2");
//     sale3 = getNoFromElement("saleText3");
//     sale4 = getNoFromElement("saleText4");
//     sale5 = getNoFromElement("saleText5");
//     sale6 = getNoFromElement("saleText6");

//     var total = sale1 + sale2 + sale3 + sale4 + sale5 + sale6;
// }
function getTotal(array) {
    total=0;
    for (let value of array) {
        total = total + value;
    }
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    // return array.reduce((a,b)=>a+b, 0);
    return total;
}

function getHighest(array) {
    // let max = array[0];
    // for (let i of array) {
    //     if (i>max) {
    //         max=i;
    //     }
    // }
    // 同样的，排序后第一个就是最大的
    const sortedArray = es6SortDesc(array);
    // 把鼠标移到shift和pop上可以看他们的作用
    return sortedArray.shift();
    // return max;
}

function getLowest(array) {
    // let min = array[0];
    // for (let j of array) {
    //     if (j<min) {
    //         min=j;
    //     }
    // }
    const sortedArray = es6SortDesc(array);
    // 降序排列后，最后一个就是最小值
    return sortedArray.pop();
    // return min;
}
// js对数组排序提供了内部的方式
// 以降序举例
/**
 * 
 * @param {array} array 
 */
function sortDesc(array) {
    return array.sort((a, b) => {
        return b-a;
    });
}

function doCal() {
    const sales=[];

    sales[0] = getNoFromElement("salesText1");
    sales[1] = getNoFromElement("salesText2");
    sales[2] = getNoFromElement("salesText3");
    sales[3] = getNoFromElement("salesText4");
    sales[4] = getNoFromElement("salesText5");
    sales[5] = getNoFromElement("salesText6");

    const totalSale = getTotal(sales);
    const highestSale = getHighest(sales);
    // 这里只有最后用了pop() 前面两个方法都是for循环获取　の　haopieのshurufa
    const lowestSale = getLowest(sales);
    let result;

    if (highestSale>1000 || lowestSale<0 || isNaN(totalSale)) {
        result = "Please input valid number.";
    }
    else {
        result = "Total: " + totalSale + "  Highest: " + highestSale + "  Lowest: " + lowestSale;
    }
    // es6 模板字符串
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals
    // const es6Reuslt = `Total: ${totalSale} Highest: ${highestSale} Lowest: ${lowestSale}`;
    const outputElement = document.getElementById("outputParagraph");
    outputElement.textContent = result;
}
/**
 *  arrow function (箭头函数)
 *  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 *  es6的新特性，简化函数的写法，还有一系列其他好处
 *  例如sortDesc可以写为
 */
const es6SortDesc = (array) => array.sort((a, b) => b-a);