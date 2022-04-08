// Calculator )
const equation = document.getElementById('equation')
const result = document.getElementById('result')
const equals = document.getElementById('equals')
let toggle = true
let operator = false
let refresh = false
let oper = ''
let numberFirst = ''
let numberSecond = ''

function clearCalc(){
    
    toggle = true
    operator = false
    refresh = false
    numberFirst = ''
    numberSecond = ''
    equals.textContent = ''
    equation.textContent = ''
    result.textContent = ''
}
document.getElementsByClassName('calcParent')[0].addEventListener('click',function (e) {

    if(e.target.classList.contains("smallChild" )){
        if(refresh) clearCalc()
        if(Number.isFinite(+e.target.textContent) || e.target.textContent == '.'){
            refresh ? console.log('poo') : null
            if(toggle){
                numberFirst += e.target.textContent
                equation.textContent += e.target.textContent
                operator = true
            }else if(!toggle){
                numberSecond += e.target.textContent
                equation.textContent += e.target.textContent
                operator = false
            }
        }else if(e.target.textContent == 'Ac'){
            clearCalc()
        }else if(e.target.textContent != '=' && operator ){
            oper = e.target.textContent
            equation.textContent += ` ${oper} `
            toggle = !toggle
            operator = false
        }else if(e.target.textContent == '='){
            refresh = !refresh
            equals.textContent = '='
            if(oper == '+') result.textContent = +numberFirst + +numberSecond
            else if(oper == '-') result.textContent = +numberFirst - +numberSecond
            else if(oper == '*') result.textContent = +numberFirst * +numberSecond
            else if(oper == '/') result.textContent = +numberFirst / +numberSecond
            else if(oper == '%') result.textContent = +numberFirst / 100
            else result.textContent = `Invalid value`
        }
    }
})









//OLD Calculator 
// // Main calculator
// const calcMain = document.createElement("div");
// calcMain.style.width = "200px";
// calcMain.style.height = "300px";
// calcMain.style.padding = "12px";
// calcMain.style.boxSizing = "border-box";
// calcMain.style.backgroundColor = "gray";
// calcMain.style.border = "2px solid rgb(186 186 186)";
// calcMain.style.borderRadius = "15px";
// calcMain.style.boxShadow = "rgb(166 175 186) 5px 5px 5px";

// // Input Number 
// const  inputNum = document.createElement("input");
// inputNum.type = "text";
// inputNum.style.width = "164px";
// inputNum.style.height = "40px";
// inputNum.style.marginBottom = "20px";
// calcMain.appendChild(inputNum);


// // Main operation 
// const operaMain = document.createElement("div");
// operaMain.style.width = "100%";
// operaMain.style.height = "200px";
// operaMain.style.display = "grid";
// operaMain.style.gridTemplateColumns = "1fr 1fr 1fr";
// operaMain.style.justifyItems = "center";
// operaMain.style.alignItems = "center";
// calcMain.appendChild(operaMain);

// // Array operation & number
// const operation = ["C","1","2","3","4","5","6","7","8","9","0","/","*","-","+","="];
// // const numberConst = ["0","1","2","3","4","5","6","7","8","9"];

// let oneNum = "";
// let twoNum = "";
// for (let i = 0; i < operation.length; i++) {
    
//     let operationhtml = document.createElement("button");
//     operationhtml.style.width = "30px";
//     operationhtml.style.height = "30px";
//     operationhtml.textContent = operation[i];
//     operaMain.appendChild(operationhtml);
//     // Click 
//     operationhtml.addEventListener("click",function(e){
//         // Delet for input 
//         if(e.target.textContent === "C"){
//             inputNum.value = "";
//             twoNum = "";
//             two = "";
//         }
//         // Add number input
//         if(Number.isFinite(+e.target.textContent)){
//             inputNum.value += e.target.textContent;
//             twoNum = +inputNum.value
//         }
//         for (let i = 11; i < operation.length-1; i++) {
//             if (e.target.textContent === operation[i]) {
//                 thisOperation = operation[i] ;
//                 console.log(thisOperation)
//                 oneNum = +inputNum.value;
//                 inputNum.value = "";
//                 console.log(oneNum);
//             }
//         }
        
//         if(e.target.textContent === "=") {
//             if(thisOperation === "/") inputNum.value = oneNum/twoNum;
//             if(thisOperation === "*") inputNum.value = oneNum*twoNum;
//             if(thisOperation === "-") inputNum.value = oneNum-twoNum;
//             if(thisOperation === "+") inputNum.value = oneNum+twoNum;
        
//             console.log(+inputNum.value)
//         }
//     })
// }
// document.body.append(calcMain);
