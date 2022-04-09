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


// icons EDIT and DELET
function icons(icon, td) {
    const img = document.createElement("img");
    
    img.setAttribute("src", `img/${icon}.png`)
    img.classList.add("icons")
    img.addEventListener("click", function(e) {
        
        if(icon === "delet"){
           img.parentElement.parentElement.remove()
           let thisId = img.parentElement.parentElement.firstChild.textContent
           localStorage.removeItem(`id_${thisId}`)
        }else if(icon === "edit") {
            //    console.log(img.parentElement.parentElement.childNodes)
            const imgOk= document.createElement("img");
            const imgCa = document.createElement("img");
            imgOk.style.marginRight = "15px"
            imgCa.classList.add("icons")
            imgOk.classList.add("icons")
            
            imgCa.setAttribute("src", `img/cancele.png`)
            imgOk.setAttribute("src", `img/okay.png`)
            td.append(imgOk, imgCa)
            img.hidden = true
            // console.log(Array.from(img.parentElement.parentElement.childNodes))
             Array.from(img.parentElement.parentElement.childNodes).forEach((elem,index,arr) => {
                
                if(index > 1 && index < arr.length-5){
                    let inp = document.createElement("input")
                    inp.value = arr[index].textContent
                    // inp.value = arr[1].textContent
                    inp.name = form.children[index-2].name
                    elem.textContent = ""
                    inp.classList.add("editInput")
                    inp.setAttribute("type","text")
                    elem.appendChild(inp)
                }

            })
            //  // FUNCTION FILL TD general CACLE and EDIT
             function fillGeneral(arrValue) {
                img.hidden = false
                imgOk.hidden = true
                imgCa.hidden = true

                Array.from(img.parentElement.parentElement.childNodes).forEach((elem,index,arr) => {
                    if(index > 1 && index < arr.length-5){
                        elem.childNodes[0].remove()
                        elem.textContent = arrValue[index-2]
                    }
                })
            }
            //EDIT EVENT 
           imgOk.addEventListener("click", function(e) {
                let thisId = td.parentElement.childNodes[0].textContent
                let arrValue = []
                let editObject =  Array.from(td.parentElement.childNodes).reduce((acc,elem) => {
                    if(elem.childNodes[0].name){
                        let editVal = elem.childNodes[0].value
                        let editName = elem.childNodes[0].name
                        acc[editName] = editVal
                        arrValue.push(editVal)
                    }
                    return acc
                },{})
                
                let editing = JSON.parse(localStorage.getItem(`id_${thisId}`))
                for(let o in editing){
                    for(let x in editObject){
                        if(x == o) {
                            editing[o] = editObject[x]
                        }
                    }
                }
                localStorage.setItem(`id_${thisId}`, JSON.stringify(editing))
                fillGeneral(arrValue)
           })
        //    CANCLE ICON EVENT
           imgCa.addEventListener("click", function() {
                
                let arrValue = []
                let editObject =  Array.from(td.parentElement.childNodes).map((elem) => {
                    if(elem.childNodes[0].name){
                        let editVal = elem.childNodes[0].value
                        arrValue.push(editVal)
                    }
                })
                fillGeneral(arrValue)

           })
        }else if(icon === "info" ) {
            let thisObj = JSON.parse(localStorage.getItem(`id_${img.parentElement.parentElement.firstChild.textContent}`))
            const infoDiv = document.querySelector(".infoDiv")
            infoDiv.hidden = false
            
            const infoImg =  document.querySelector(".infoDiv img")
            infoImg.setAttribute("src", `img/${thisObj.img}`)
            const spanAll = document.querySelectorAll(".infoDiv span")
            
            spanAll[0].textContent = `Name: ${thisObj.name}`
            spanAll[1].textContent = `Second Name: ${thisObj.surname}`
            spanAll[2].textContent = `Old: ${thisObj.old}`
            spanAll[3].textContent = `Tel:  ${thisObj.tel}`
            spanAll[4].textContent = `Company: ${thisObj.company}`
            spanAll[5].textContent = `Add date: ${thisObj.data} `
            spanAll[6].textContent = `Add time: ${thisObj.time}`
            
            const infoExit = document.querySelector(".infoExit")
            // console.log(infoExit)
            infoExit.addEventListener("click", function(e){
                infoDiv.hidden =true
            })
        }
    })
    td.appendChild(img)

}

// Submit kochakne
form.addEventListener("submit", function(e){
    
    document.getElementById('formWindow').style.display = 'none'
    toggle = !toggle 
    e.preventDefault()
    fo["id"] = id
    fo["img"] = form[7].files[0] ? form[7].files[0].name : "";
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
       
        if(i != "img") td.textContent = fo[i]
        if(i == "edit") icons("edit",td)
        else if( i == "delet") icons("delet",td)
        else if( i == "info") icons("info",td)
        else if(i == "img") {
            const userImg = document.createElement("img");
            userImg.setAttribute("src", `img/${fo[i]}`)
            userImg.classList.add("userImg")
            td.appendChild(userImg)
        }
        tr.appendChild(td)
    }
    // console.log(fo)
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
    let id = !localStorage.getItem("idEnd") ? 1 : localStorage.getItem("idEnd")
    // id = 1
    localStorage.clear()
    table.textContent = ""
})