function add(a,b){
    return a+b
}

function subtract(a,b){
    return a-b
}

function multiply(a,b){
    return a*b
}

function divide(a,b){
    return a/b
}

function operate(a,b,operator){
    switch (operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "/":
            return divide(a,b);
        case "*":
            return multiply(a,b);
        default:
            return "error";
    }
}

function screenContainsAnOp(){
    for (i=0;i<ops.length;i++){
        if (screen.textContent.includes(ops[i])){
            return true;
        }
    }
    return false;
}

    

let buttons = [
    ["7","8","9","/"],
    ["4","5","6","*"],
    ["1","2","3","-"],
    ["0",".","=","+"]
]

let buttonArr = document.querySelector("#buttons");
buttonArr.id = "buttonArr";
let screen = document.createElement("div");
screen.id = "screen";
buttonArr.prepend(screen);

buttons.forEach(buttonRow=>{ //for each row in arr
    let rowDiv = document.createElement("div"); //create a displayable row
    rowDiv.classList.add("rowDiv"); //add a class to each displayable row
    buttonArr.appendChild(rowDiv); //append displayable row to displayable arr
    buttonRow.forEach(button=>{
        let btnSticker = document.createElement("div");
        rowDiv.appendChild(btnSticker);
        btnSticker.textContent = button;
        btnSticker.classList.add("btnSticker")
    })
})

let btnStickers = document.getElementsByClassName("btnSticker");
let ops = ["*","-","+","/"];
let arrExp = [];
let op = "";
let a, b = new Number;
let currentNum = "";
//prompt("Did not understand that action. Would you like to clear the screen?","lkadjsf")

let btnActivate = function(btnValue){
        if (!isNaN(Number(btnValue))) {
            screen.textContent += btnValue;
            currentNum += btnValue;
        } else if (btnValue === "." && !currentNum.includes(".") && !ops.includes(screen.textContent.at(-1))) {
            screen.textContent += btnValue;
            currentNum += btnValue;
        } else if (ops.includes(btnValue) && !ops.includes(screen.textContent.at(-1))){
            arrExp.push(currentNum);
            screen.textContent += btnValue;
            arrExp[arrExp.length] = btnValue;
            currentNum = ""
        } else if (btnValue === "=" && screen.textContent.length>2 && screenContainsAnOp() && !ops.includes(screen.textContent.at(-1))){
            arrExp.push(currentNum);
            if (arrExp[0]===arrExp[1]){
                arrExp.shift();
            }
            console.log("what it looks like currently: " + arrExp)
            while (arrExp.length>1){
                a = Number(arrExp[0]);
                op = (arrExp[1]);
                b  = Number(arrExp[2])
                result = operate(a,b,op);
                for (i=0;i<=2;i++){
                    arrExp.shift()
                }
                console.log("after removal: " + arrExp)
                arrExp.unshift(result);
                console.log("after addition: " + arrExp)
            }
            console.log("final: "+arrExp);
            if (arrExp[0]!==Infinity){
                screen.textContent = arrExp[0]
                currentNum = arrExp[0];
            }
            else {
                screen.textContent = "";
                currentNum = "";
                alert("No dividing by 0!")
            }
            
        } else{
            alert("Did not understand that action.")
        }
}

for (let i = 0; i < btnStickers.length; i++) {
    btnStickers[i].addEventListener("click", event=>btnActivate(event.target.textContent))// => {
    btnStickers[i].id = "id-"+btnStickers[i].textContent;
    switch (btnStickers[i].textContent){
        case "/":
            btnStickers[i].id = "id-divide";
        case ".":
            btnStickers[i].id = "id-decimal";
        case "=":
            btnStickers[i].id = "id-equals";
        case "*":
            btnStickers[i].id = "id-multiply";
    }
        // let btnValue = event.target.textContent;
        // if (!isNaN(Number(btnValue))) {
        //     screen.textContent += btnValue;
        //     currentNum += btnValue;
        // } else if (btnValue === "." && !currentNum.includes(".") && !ops.includes(screen.textContent.at(-1))) {
        //     screen.textContent += btnValue;
        //     currentNum += btnValue;
        // } else if (ops.includes(btnValue) && !ops.includes(screen.textContent.at(-1))){
        //     arrExp.push(currentNum);
        //     screen.textContent += btnValue;
        //     arrExp[arrExp.length] = btnValue;
        //     currentNum = ""
        // } else if (btnValue === "=" && screen.textContent.length>2 && screenContainsAnOp() && !ops.includes(screen.textContent.at(-1))){
        //     arrExp.push(currentNum);
        //     if (arrExp[0]===arrExp[1]){
        //         arrExp.shift();
        //     }
        //     console.log("what it looks like currently: " + arrExp)
        //     while (arrExp.length>1){
        //         a = Number(arrExp[0]);
        //         op = (arrExp[1]);
        //         b  = Number(arrExp[2])
        //         result = operate(a,b,op);
        //         for (i=0;i<=2;i++){
        //             arrExp.shift()
        //         }
        //         console.log("after removal: " + arrExp)
        //         arrExp.unshift(result);
        //         console.log("after addition: " + arrExp)
        //     }
        //     console.log("final: "+arrExp);
        //     if (arrExp[0]!==Infinity){
        //         screen.textContent = arrExp[0]
        //         currentNum = arrExp[0];
        //     }
        //     else {
        //         screen.textContent = "";
        //         currentNum = "";
        //         alert("No dividing by 0!")
        //     }
            
        // } else{
        //     alert("Did not understand that action.")
        // }
    //});
}



let clear = document.createElement("div");
clear.classList.add("btnSticker");
clear.textContent = "Clear";
buttonArr.append(clear);
clear.addEventListener("click",()=>{
    screen.textContent = "";
    currentNum = "";
    arrExp = [];
})

let app = document.querySelector("html");
let oneDimButtons = buttons.concat([ops]).flat();

app.addEventListener("keydown",(event)=>{
   console.log(event.key)
   if (oneDimButtons.includes(event.key)){
    btnActivate(event.key);
   }
})

