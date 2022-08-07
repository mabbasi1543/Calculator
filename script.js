textToNumbers = {
    "zero":0,
    "one":1,
    "two":2,
    "three":3,
    "four":4,
    "five":5,
    "six":6,
    "seven":7,
    "eight":8,
    "nine":9,
}
numbers = [0,1,2,3,4,5,6,7,8,9]
operatorsToSign = {
    "devide" : "/",
    "multiply" : "*",
    "addition" : "+",
    "subtract" : "-",
}

operators = {
    "/" : function(a,b) {return a/b},
    "*" : function(a,b) {return a*b},
    "+" : function(a,b) {return a+b},
    "-" : function(a,b) {return a-b},
}

function getNextNumber(arr,i){
    let a="";
    if (numbers.includes(Number(arr[i]))){
        a += arr[i].toString();
        while(numbers.includes(Number(arr[i+1]))){
            i++;
            a += arr[i].toString();
        }
    }

    return a;
}
function getLastNumber(arr ,lastOperand){
    let a="";
    for (let i = lastOperand;i< arr.length;i++){
        a += arr[i].toString();
    }

    return a;
}

let equation = "";
let lastOperand = 0;
function reset() {
    equation = "";
    lastOperand = 0;
    document.getElementsByClassName("current")[0].textContent = "";
    document.getElementsByClassName("full")[0].textContent = "";
}
function captureInput(e){
    if (e.target.className == "reset"){reset() } 
    if (textToNumbers[e.target.className] || e.target.className == "zero"){
        equation += textToNumbers[e.target.className];
        document.getElementsByClassName("current")[0].textContent = getLastNumber(equation,lastOperand)
        document.getElementsByClassName("full")[0].textContent = equation;
        

    }
    if (operatorsToSign[e.target.className] && (!operators[equation.slice(-1)] && equation.length !=0) ){
        equation += operatorsToSign[e.target.className];
        document.getElementsByClassName("full")[0].textContent = equation;
        lastOperand = equation.length;
    }
    if (e.target.className == "equal"){
        let a="";
        let b="";
        let operand="";
        for (let i = 0 ; i < equation.length ; i++){

            if (i == 0){
                a = getNextNumber(equation, i)
                i += a.length-1;

            }
            else if (operators[equation[i]]){
                operand=equation[i];
                i++;

                b = getNextNumber(equation, i)

                i += b.length-1;
                a = operators[operand](Number(a),Number(b))

            }

        }
        document.getElementsByClassName("current")[0].textContent = a;
        document.getElementsByClassName("full")[0].textContent = equation;

    }
}




buttons = document.querySelectorAll("button");
for (let i = 0 ; i < buttons.length ; i++){
    buttons[i].addEventListener("click", (e) => captureInput(e));
}