let table = document.createElement("table")
let sizeT = 20

let snacke = [187,188,189]
let snackeTr = 9

let increment = 0
let points = 0

for (let i = 0; i < sizeT; i++) {
    let tr = document.createElement("tr")
    for (let x = 0; x < sizeT; x++) {
        let td = document.createElement("td")
        // td.textContent = increment
        // td.style.border = "1px solid black"
        // increment++
        tr.appendChild(td)
    }
    table.appendChild(tr)
}

document.body.appendChild(table);

let td = document.getElementsByTagName("td")
let tr = document.getElementsByTagName("tr")

// START POSITION SNACKE
td[snacke[0]].style.backgroundColor = "green"
td[snacke[1]].style.backgroundColor = "green"
td[snacke[2]].style.backgroundColor = "green"


//RANDOM CAKE
function randomChar(){
    let random = Math.floor(Math.random()*sizeT*sizeT);
    td[random].style.backgroundColor = "red";
    return random;
}

let random = randomChar();



// BUTTON START
let btn = document.createElement("button")
let span = document.createElement("span")
btn.textContent = "start";
span.textContent = `Your points ${points}`
document.body.append(btn)
document.body.append(span)




btn.addEventListener("click", function(params) {
        

    // CLICK KEYDOWN
    window.addEventListener("keydown", function(e){
        // console.log(e.key)
        if(e.key === "ArrowUp"){
            setInterval(goSnacke,1000000, variable=-20)
        }
        if(e.key === "ArrowRight"){
            setInterval(goSnacke,1000000, variable=1)
        }
        if(e.key === "ArrowLeft"){
            setInterval(goSnacke,1000000, variable=-1)
        }
        if(e.key === "ArrowDown"){
            setInterval(goSnacke,1000000, variable=20)
        }
    })

    let start = setInterval(goSnacke, 200, variable=1)

    function goSnacke() {

        
        if (snacke.at(-1) + variable < sizeT*sizeT && snacke.at(-1) + variable> 0) {
            
          
            if (snacke.at(-1) == random) {

                // ADD CAKE ELEMENT
                snacke.unshift(snacke.at(-1)+variable)
                points++
                random = randomChar();
                console.log(points)
                span.textContent = `Your points ${points}`
                
            }
            
            // DELETIT FIRST ELEMENT
                td[snacke.shift()].style.backgroundColor = "";

                // ADD LAST ELEMENT
                snacke.push(snacke.at(-1)+variable)
                if(td[snacke.at(-1)].style.backgroundColor == "green"){
                    console.log("You LOSE")
                    alert("You lose")
                    clearInterval(start)
                }
                td[snacke.at(-1)].style.backgroundColor = "green"
            
           
            // YOU LOSE
            if(variable == -sizeT) snackeTr--
            else if(variable == sizeT) snackeTr++
            
            if(td[snacke.at(-1)].parentElement != tr[snackeTr] ){
                console.log("You lose")
                alert("You lose")
                clearInterval(start)
            }
            
        }
        
    }
         
})

