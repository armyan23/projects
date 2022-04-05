import {wordsArr} from "./wordsArr.js"
let changedArr = [...wordsArr]
//Reles
const rules = document.getElementById("rules")

rules.addEventListener("click",function(e) {
    const dialog = document.getElementById('dialog');
	dialog.showModal();
	document.getElementById('closeQue').onclick = ()=> dialog.close()
})

//Main page
const logoAlias = document.getElementsByClassName("logoAlias")[0]
const form = document.getElementById("form")
//Start Game
const playZone = document.getElementById('playZone')
const wordsParent = document.getElementById("words")
const timerDiv = document.getElementById('timer')
//Team
const turnTeam = document.querySelector('h3')
const firstTeam = document.getElementById("firstTeam")
const firstPoint = document.getElementById("firstPoint")
const secondTeam = document.getElementById("secondTeam")
const secondPoint = document.getElementById("secondPoint")
let pointFirst = 0
let pointSecond = 0
let change = true
let teams = []




form.addEventListener("submit",function(e) {
    e.preventDefault()    
    form.style.display = "none"
    logoAlias.style.display = "none"
    playZone.style.display = "block"
    
    
    teams = Array.from(new FormData(this))
    teams[0][1] ? firstTeam.textContent = `Team ${teams[0][1]}`: null
    teams[1][1] ?  secondTeam.textContent = `Team ${teams[1][1]}` : null
    listWords(teams[0][1],teams[1][1])
})


function listWords(team1, team2) {
    let time = 60
    
    if(change) team1 ? turnTeam.textContent = `Turn of the ${team1}` : turnTeam.textContent = `Turn of the first team`
    else team2 ? turnTeam.textContent = `Turn of the ${team2}` : turnTeam.textContent = `Turn of the second team`

    //Creat checkbox
    for (let i = 0; i <  6; i++) {
        let random =  Math.floor(Math.random()*changedArr.length)
        let label = document.createElement("label")
        let wordsDiv = document.createElement("div")
        let input = document.createElement("input")
        input.setAttribute("type","checkbox")
    
    
        label.textContent = ` ${changedArr[random].toUpperCase()}`
        label.prepend(input)
        
        changedArr.splice(random,1)
        wordsDiv.append(label)    
        wordsParent.append(wordsDiv)
    }
    
    let interval = setInterval(function() {
        

        timerDiv.textContent = `${--time}`
        if(time == 0) {
            const checkboxList = Array.from(document.querySelectorAll('#words input'))
            for(let i of checkboxList){
                if(i.checked && change) {
                    pointFirst++
                }else if(i.checked && !change){
                    pointSecond++
                }
            }
            firstPoint.textContent = `Point ${pointFirst}`
            secondPoint.textContent = `Point ${pointSecond}`
            clearInterval(interval)
            wordsParent.textContent = ''
            change = !change
            pointFirst >=   100 || pointSecond >= 100 ? win() : listWords(team1,team2)
        }
        
    },1000)
}

function win(){
    firstPoint.textContent = `Point 0`
    secondPoint.textContent = `Point 0`
    form.style.display = ""
    logoAlias.style.display = ""
    playZone.style.display = "none"
    pointFirst = 0
    pointSecond = 0
    change = true
    console.log("Booom")
    alert(`Congratulations you won ${1}`)
    wordsParent.textContent = ''
    changedArr = [...wordsArr]
}

// console.log(wordsArr.length)