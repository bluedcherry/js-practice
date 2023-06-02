// function doMultiple() {
//         const inputElement = document.getElementById("input");
//         const inputText = inputElement.value;
//         const inputNumber = Number(inputText);
//         const multipulicationTablesElement = document.getElementById("multipulicationTables");
//         const noTable = multipulicationTablesElement.children.length;
//         let resultNumber;
//         for (let i=1; i<=12; i=i+1) {
//             resultNumber = inputNumber*i;
//             // 随机替换若干i的计算结果
//             randomVar = Math.random();
//             if (randomVar>0.9) {
//                 resultNumber = resultNumber-1;
//             } 
//             if (randomVar<0.1) {
//                 resultNumber = resultNumber+1;
//             }

//             let resultString = i + " times " + inputNumber + " = " + resultNumber;

//             let listItem = document.createElement("li");
//             listItem.innerText = resultString;
//             multipulicationTablesElement.appendChild(listItem);
        
//             // Math.floor(Math.random()*12)
//             // multipulicationTablesElement.replaceChild(, multipulicationTablesElement.children[Math.floor(Math.random()*6)]);
//             if (noTable>0) {
//                 multipulicationTablesElement.removeChild(multipulicationTablesElement.children[0]);
//             }
//         }
//         window.inputNumber=inputNumber;
//         window.resultNumber=resultNumber;
//     }
//     doMultiple();
//     console.log(inputNumber);
//     console.log(resultNumber);

// function doCheck() {

//     let correctNumber = inputNumber*i;

//     if (resultNumber==correctNumber) {
//         multipulicationTablesElement.children.className="yes";
//     }
//     else {
//         multipulicationTablesElement.children.className="no";
//     }
// }
document.addEventListener('DOMContentLoaded', function () {
    // do something here ...
    const generateButton = document.querySelector("#gen_btn");
    const checkButton = document.querySelector("#check_btn");
    let result = [];
    let inputNumber;
    let multipulicationTablesElement;

    generateButton.addEventListener("click", () => {
        // 生成乘法表
        // 将结果存放在result中
        const inputElement = document.getElementById("input");
        const inputText = inputElement.value;
        inputNumber = Number(inputText);
        console.log(inputNumber);
        if (inputNumber === 0 || isNaN(inputNumber)) {
            alert("please input valid number");
            return;
        }
        multipulicationTablesElement = document.getElementById("multipulicationTables");
        const noTable = multipulicationTablesElement.children.length;
        for (let i=1; i<=12; i=i+1) {
            let resultNumber = inputNumber*i;
            // 随机替换若干i的计算结果
            randomVar = Math.random();
            if (randomVar>0.9) {
                resultNumber = resultNumber-1;
            } 
            if (randomVar<0.1) {
                resultNumber = resultNumber+1;
            }

            let resultString = i + " times " + inputNumber + " = ";

            let listItem = document.createElement("li");
            let wordPara = document.createElement("span");
            let resultSpan = document.createElement("span");
            wordPara.innerText = resultString;
            resultSpan.innerText = resultNumber;
            listItem.appendChild(wordPara);
            listItem.appendChild(resultSpan);
            multipulicationTablesElement.appendChild(listItem);
            
            // Math.floor(Math.random()*12)
            // multipulicationTablesElement.replaceChild(, multipulicationTablesElement.children[Math.floor(Math.random()*6)]);
            if (noTable>0) {
                multipulicationTablesElement.removeChild(multipulicationTablesElement.children[0]);
            }
            result[i] = resultNumber;
        }
        
    });
    checkButton.addEventListener("click", () => {
        // 检查result
        if (result===[] || multipulicationTablesElement === undefined || inputNumber===NaN) {
            alert("error");
            return;
        }
        const li = multipulicationTablesElement.childNodes;
        li.forEach((element, key) => {
            const res = Number(element.lastChild.innerText);
            console.log("key", key);
            console.log("res", res);
            if (res === ((key + 1) * inputNumber)) {
                element.className = "yes";
            } else {
                element.className = "no";
            }
        });
        // result.forEach((ele, key) => {
        //     if (ele === (key * inputNumber)) {
        //         multipulicationTablesElement.children[key-1].className = "yes";
        //     } else {
        //         multipulicationTablesElement.children[key-1].className = "no";
        //     }
        // });
    });
}, false);
