function doMultiple() {
    const inputElement = document.getElementById("input");
    const inputText = inputElement.value;
    const inputNumber = Number(inputText);

    const multipulicationTablesElement = document.getElementById("multipulicationTables");
    const noTable = multipulicationTablesElement.children.length;

    for (let i=1; i<=12; i=i+1) {
        let resultNumber = inputNumber*i;

        let resultString = i + " times " + inputNumber + " = " + resultNumber;

        let listItem = document.createElement("li");
        listItem.innerText = resultString;
        multipulicationTablesElement.appendChild(listItem);
        
        // 也可以用while结构，语法类似
        // 当子元素的数量大于0时，删除一个子元素
        if (noTable>0) {
            multipulicationTablesElement.removeChild(multipulicationTablesElement.children[0]);
            // 因为i<=12，children[0]被去除之后会有新的下一个顶替的children[0]再次被去除，所以到最后前一轮的12个children都会被去除
        }
    }
}