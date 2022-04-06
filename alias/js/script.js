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
const startBtn = document.getElementById('startBtn')
const clickStart = document.getElementById('clickStart')
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
})

startBtn.addEventListener('click',function(e) {
    if(!change) e.target.textContent = teams[0][1] ? `Start team ${teams[0][1]}`: `Start team first`
    else e.target.textContent = teams[1][1] ?  `Start team ${teams[1][1]}`: `Start team second`
    wordsParent.textContent = ''
    clickStart.style.display = "block"
    e.target.parentElement.style.display = 'none'
    listWords(teams[0][1],teams[1][1])
    // clearInterval(interval)
})
function creatInputList(){
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
}

let time = 60
function listWords(team1, team2) {
    
    if(change) team1 ? turnTeam.textContent = `Turn of the ${team1}` : turnTeam.textContent = `Turn of the first team`
    else team2 ? turnTeam.textContent = `Turn of the ${team2}` : turnTeam.textContent = `Turn of the second team`

    //Creat checkbox
    creatInputList()
    let bonus = 0
    let interval = setInterval(function() {
    
        

        if(checkedInput(bonus) == 6) {
            change ? pointFirst += checkedInput(bonus) : pointSecond += checkedInput(bonus)
            clearInterval(interval)
            listWords(team1,team2)
            wordsParent.textContent = ''
            creatInputList()
        }
        if(time == 0) {
            change ? pointFirst += checkedInput(bonus) : pointSecond += checkedInput(bonus)
            wordsParent.textContent = ''
            clearInterval(interval)
            clickStart.style.display = "none"
            startBtn.parentElement.style.display = 'flex'
            firstPoint.textContent = `Point ${pointFirst}`
            secondPoint.textContent = `Point ${pointSecond}`
            change = !change
            pointFirst >=   100 || pointSecond >= 100 ? win() : null
            time = 60
        }
        timerDiv.textContent = `${time--}`
    },1000)
}

function checkedInput(bonus){
   
    const checkboxList = Array.from(document.querySelectorAll('#words input'))
    for(let i of checkboxList){
        i.checked ? bonus++ : 0
    }

    return bonus 
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