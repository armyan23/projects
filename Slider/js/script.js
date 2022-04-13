let leftBtn = document.getElementById("left");
let rightBtn = document.getElementById("right");
let main = document.querySelector("main")
let increment = 0
let over = document.getElementsByClassName("over")[0];
let imgArray = Array.from(document.querySelectorAll(".over img"))


// Functia click Right or Left 
let btn = function (e){
    // LEFT, RIGTH OR SPAN(GREEN)
    if(e.target.name == "right"){  
        increment++
        if(increment >= imgArray.length) {
            increment = 0
            
        }
    }else if(e.target.name == "left"){   
        increment--
        if(increment == -1) {
            increment = imgArray.length-1
        }  
    }else if(Number.isFinite(+e.target.dataset.count)){
        increment = +e.target.dataset.count
    }


    if(increment < imgArray.length && increment >= -1 && (e.target.name == "right" || e.target.name == "left" || Number.isFinite(+e.target.dataset.count))){
        for(let x of span.children){
            x.children[0].setAttribute("src","img/o.png")
            span.children[increment].children[0].setAttribute("src","img/no.png")
        }
        for(let i of over.children){
            i.style.transform = `translateX(-${640*increment}px)`
        } 
        
    }
}

// click number
let span = document.querySelector(".span")
for (let i = 0; i < imgArray.length; i++) {
    circle(i)
}
// FUNCTION CREEATE CIRCLE
function circle(count) {
    let number = document.createElement("span")
    
    let spanImg = document.createElement("img")
    spanImg.classList.add("number")
    spanImg.dataset.count = count
    spanImg.setAttribute("src","img/o.png")
    // spanImg.textContent = i+1
    
    number.appendChild(spanImg)
    span.appendChild(number)
}

let number = document.querySelectorAll("span")
number[0].children[0].setAttribute("src","img/no.png")

span.addEventListener("click", function(e) {
    if (e.target != span) {
        btn(e)
    }
})

main.addEventListener("click", btn)




// ADD TO NEW IMG
const myForm = document.forms[0]

myForm[1].addEventListener("click", function(e) {
    
    let imgName = myForm[0].files[0].name

    let newImg = document.createElement("img")
    imgArray.push(newImg)
    over.appendChild(newImg)
    URL.revokeObjectURL(myForm[0].files[0].src)
    newImg.src = URL.createObjectURL(myForm[0].files[0])
    
    circle(imgArray.length-1)
  
    e.preventDefault()
})

