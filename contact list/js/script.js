const form = document.querySelector("form")
const table = document.querySelector("tbody")
const userArr = []
const fo = {}
let toggle = true
let id = !localStorage.getItem("idEnd") ? 1 : localStorage.getItem("idEnd")

// document.getElementById('formWindowBtn').focus();
document.getElementById('formWindowBtn').addEventListener('click', function(){
    if(toggle) document.getElementById('formWindow').style.display = 'block'
    else if(!toggle) document.getElementById('formWindow').style.display = 'none'
    toggle = !toggle 
})
document.getElementById('closeWindow').addEventListener('click',function(e) {
    document.getElementById('formWindow').style.display = 'none'
    toggle = !toggle
})

// Data Registr
function timeReg(par){
    let date = new Date()
    let day = date.getDate().toString().padStart(2,0)
    let month = (date.getMonth()+1).toString().padStart(2,0)
    let year = date.getFullYear().toString().padStart(2,0)

    let dateRegistr = `${day}.${month}.${year}`

    let min = date.getMinutes().toString().padStart(2,0)
    let hour = date.getHours().toString().padStart(2,0)
    let second = date.getSeconds().toString().padStart(2,0)

    let timeRegistr = `${hour}:${min}:${second}`
     return par == "date" ?? par == "time" ? dateRegistr : timeRegistr;
}


// icons  DELET and INFO
function icons(icon, td) {
    const img = document.createElement("img");
    
    img.setAttribute("src", `img/${icon}.png`)
    img.classList.add("icons")
    img.addEventListener("click", function(e) {
        
        if(icon === "delet"){
           img.parentElement.parentElement.remove()
           let thisId = img.parentElement.parentElement.firstChild.textContent
           localStorage.removeItem(`id_${thisId}`)
        }
        else if(icon === "info") {
            let thisObj = JSON.parse(localStorage.getItem(`id_${img.parentElement.parentElement.firstElementChild.textContent}`))
            const infoDiv = document.querySelector(".infoDiv")
            const infoContent = document.querySelector(".infoContent")
            infoContent.textContent = ''
            infoDiv.hidden = false
            
            const infoImg = document.createElement('img')
            // infoImg.setAttribute("src", `img/${thisObj.img}`)
            URL.revokeObjectURL(infoImg.src)
            infoImg.src = thisObj.img
            infoContent.prepend(infoImg)

            let arrayFirstTd = ['First Name:','Last Name:','Tel:','Old:','Address:','Add date:','Add time:','Edit:']
            let arraySecondTd = [thisObj.name,thisObj.surname,thisObj.tel,thisObj.old,thisObj.company,thisObj.data,thisObj.time]

            const tableInfo = document.createElement('table')

            const imgEdit= document.createElement("img");
            const imgOk= document.createElement("img");
            const imgCa = document.createElement("img");
            imgEdit.classList.add("icons")
            imgOk.classList.add("icons")
            imgOk.style.display = 'none'
            imgOk.style.marginRight = "15px"
            imgCa.classList.add("icons")
            imgCa.style.display = 'none'
            
            imgEdit.setAttribute("src", `img/edit.png`)
            imgOk.setAttribute("src", `img/okay.png`)
            imgCa.setAttribute("src", `img/cancele.png`)

            for(let i = 0; i < arrayFirstTd.length; i++ ){
                const tr = document.createElement('tr')
                const tdFirst = document.createElement('td')
                const tdSecond = document.createElement('td')
                tdFirst.textContent = arrayFirstTd[i]
                tdSecond.textContent = arraySecondTd[i]
                if(i== arrayFirstTd.length-1) tdSecond.append(imgEdit,imgOk, imgCa)
                tr.append(tdFirst,tdSecond)
                tableInfo.append(tr)
            }
            infoContent.append(tableInfo)

            const editIcons = document.querySelectorAll('.infoContent  img')


            const trAll = document.querySelectorAll(".infoDiv table tr")
            let parent = e.target.parentElement.parentElement
            infoDiv.addEventListener("click", function(e){
                if(e.target.parentElement.classList.contains('infoExit')) infoDiv.hidden =true
                if(e.target == editIcons[1])  editFunction(thisObj,trAll, editIcons)
                if(e.target == editIcons[2])  okayEditing(thisObj,trAll, editIcons,parent,infoDiv)
                if(e.target == editIcons[3])  cancaleEditing(thisObj,trAll, editIcons)
            })

        }
    })
    td.appendChild(img)

}

// Edit Function 
function editFunction(props,trAll,editIcons) {
    editIcons[1].style.display = 'none'
    editIcons[2].style.display = 'inline'
    editIcons[3].style.display = 'inline'

    // Creating INPUTS and put in td with value 
    Object.entries(props).map(function(elem,index) {
        if(index > 1 && index < 7) {
            let inp = document.createElement("input")
            inp.classList.add("editInput")
            inp.value = trAll[index-2].lastElementChild.textContent
            trAll[index-2].lastElementChild.textContent = ''
            trAll[index-2].lastElementChild.appendChild(inp)
        }
    })

}

// OKay Edit editing 
function okayEditing(props,trAll,editIcons,parent,infoDiv) {
    infoDiv.hidden = true
    editIcons[1].style.display = 'inline'
    editIcons[2].style.display = 'none'
    editIcons[3].style.display = 'none'
    let editObject = Object.entries(props).map(function(elem,index) {
        if(index > 1 && index < 7) {
            elem[1] =  trAll[index-2].lastElementChild.lastElementChild.value
            trAll[index-2].lastElementChild.textContent = elem[1]
            // console.log(elem[1])
            // if(index < 5) console.log(parent.children[index].textContent,`ooop`,elem[1])
            if(index < 5) parent.children[index].textContent = elem[1]
            return elem
        }
        else return elem 
    })
    localStorage.setItem(`id_${editObject[0][1]}`, JSON.stringify(Object.fromEntries(editObject)))
}


// // Cancale Editing
function cancaleEditing(props,trAll,editIcons){
    editIcons[1].style.display = 'inline'
    editIcons[2].style.display = 'none'
    editIcons[3].style.display = 'none'
    
    
    Object.entries(props).map(function(elem,index) {
        if(index > 1 && index < 7) {
            trAll[index-2].lastElementChild.textContent = elem[1]
            return elem
        }
        else return elem 
    })
}

// Submit kochakne
form.addEventListener("submit", function(e){
    
    document.getElementById('formWindow').style.display = 'none'
    toggle = !toggle 
    e.preventDefault()
    fo["id"] = id
    fo["img"] = form[7].files[0] ? URL.createObjectURL(form[7].files[0]) : 'img/people3.png';
    // console.log(URL.createObjectURL(form[7].files[0]))
    // console.log(form[7].files)
    for(let i of form.children){
        if(i.name) fo[i.name] = i.value
    }
    fo["data"] = timeReg("date")
    fo["time"] = timeReg("time")
    fo["edit"] = ""
    fo["delet"] = ""
    fo["info"] = ""

    localStorage.setItem(`id_${id}`,JSON.stringify(fo))
    id++
    localStorage.setItem("idEnd",id)
    userArr.push(fo)
    addTable(fo)
})


// Functionn e or@ kavelcne tr,td and text td-neri mej
function addTable(fo) {
    const tr = document.createElement("tr")
    for(let i in fo){
        const td = document.createElement("td");
        if(i == 'data' || i == 'time' || i == 'old' || i == "edit" || i == 'company') continue
        if(i != "img") {
            td.textContent = fo[i]
        }
        if(i == "edit") icons("edit",td)
        else if( i == "delet") icons("delet",td)
        else if( i == "info") icons("info",td)
        else if(i == "img") {
            const userImg = document.createElement("img");

            URL.revokeObjectURL(userImg.src)
            userImg.src = fo[i]
            userImg.classList.add("userImg")
            td.appendChild(userImg)
        }
        tr.appendChild(td)
    }
    table.appendChild(tr)
}


// Refresh eneluc es cikli mijocov kvercne locali mejin@ u ktpe table mej
document.addEventListener('DOMContentLoaded', function(){
    for(let x in localStorage ){
        if(localStorage.hasOwnProperty(x) && x.startsWith("id_")){
            let local = JSON.parse(localStorage.getItem(x))
            userArr.push(Object.entries(local))
        }
    } 
    //SORT - kdasacore id ajman kargov
    userArr.sort(function(a,b) {
        if (a[0][1] < b[0][1])  return -1
        else if (a[0][1] > b[0][1])  return 1
        else return
    })
    let localArr = []
    localArr = userArr.map(elem => {return Object.fromEntries(elem)})
    localArr.forEach(elem=> addTable(elem))
});





// Clear table and LocalStrong 
const clear = document.querySelector(".clearTable")
clear.addEventListener("click", function(e){
    id = !localStorage.getItem("idEnd") ? 1 : localStorage.getItem("idEnd")
    // id = 1
    localStorage.clear()
    table.textContent = ""
})