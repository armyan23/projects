
// Main
const main = document.createElement("main");
let pointsX = 0;
let pointsO = 0;
// PLAYERS
const playerX = "X";
const playerO = "O";
let   boolean = true;
const winArray = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [2,5,8],
    [1,4,7],
    [3,4,5],
    [6,7,8],
    [6,4,2],
]


// This clear from button
let clearBtn = document.createElement("button");
clearBtn.classList.add("clearBtn")
clearBtn.textContent = "Clear";

clearBtn.addEventListener("click", function(e){
    clearButton();
})
// This clear from buttom FUNCTION
function clearButton(player=""){
    let arrayButtun = document.querySelectorAll("main button")
    for (let i = 0; i < arrayButtun.length; i++) {
        arrayButtun[i].textContent = "";
    }
    if(player !== "") {
        alert("You Win Playar " + player);
        
        
        if(player === "X"){ 
            pointsX++
            playerXPoint.textContent = `Player X points  ${pointsX}`; 
            turnP.textContent = "Turn playar X";
            boolean = true

        }
        else if(player === "O"){ 
            pointsO++
            playerOPoint.textContent = `Player O points  ${pointsO}`; 
            turnP.textContent = "Turn playar O";
            boolean = false;
            
        }
    }
    if(player == "") {
        turnP.textContent = "Turn playar X";
        boolean = true
    }
}


// Here are the player points
const points = document.createElement("div");
points.classList.add("points")
// points.classList.add("points")
let playerXPoint = document.createElement("div");
playerXPoint.textContent = `Player X points  ${pointsX}`;
let playerOPoint = document.createElement("div");
playerOPoint.textContent = `Player O points  ${pointsO}`; 

// Turn
let turnP = document.createElement("p");
turnP.textContent = "Turn playar X";
points.insertAdjacentElement("beforeend",turnP);

for (let i = 0; i < 9; i++) {
    // Creat buttom element
    const box = document.createElement("button");
    // box.textContent = i;
    // Game Start
    box.addEventListener("click", function(e){
        // click and creat player X or O
        let arrayButtun = document.querySelectorAll("button");
        if(boolean === true && e.target.textContent === ""){
            e.target.textContent = playerX;
            boolean = false;
            turnP.textContent = "Turn playar O";
            
            // // Play X win
            for (let win = 0; win < winArray.length; win++) {
                if(arrayButtun[winArray[win][0]].textContent == playerX && arrayButtun[winArray[win][1]].textContent == playerX && arrayButtun[winArray[win][2]].textContent == playerX) clearButton(playerX);
            }
        }else if(boolean === false && e.target.textContent === ""){
            e.target.textContent = playerO;
            boolean = true;
            turnP.textContent = "Turn playar X";

            // Play O win
            for (let win = 0; win < winArray.length; win++) {
                if(arrayButtun[winArray[win][0]].textContent == playerO && arrayButtun[winArray[win][1]].textContent == playerO && arrayButtun[winArray[win][2]].textContent == playerO) clearButton(playerO);
            }
        }
    })
    main.appendChild(box);
}
points.prepend(playerOPoint);
points.prepend(playerXPoint);
document.body.prepend(main);
document.body.prepend(points)
main.insertAdjacentElement("afterend",clearBtn)