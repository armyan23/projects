const main = document.getElementsByTagName("main")[0]
const clock = document.getElementById("clock")

let data = new Date()

let hour = data.getHours()
let minut = data.getMinutes()
let second = data.getSeconds()

 function clocK(){
     if(second == 60) {
         minut++
         second = 0
    }
    if(minut == 60) {
        hour++
        minut = 0
    }
    if(hour == 60) {
        hour = 0
    }
    
    let hourString = hour.toString().padStart(2, "0")
    let minString = minut.toString().padStart(2, "0")
    let secondString = second.toString().padStart(2, "0")
    
    clock.textContent = `${hourString}:${minString}:${secondString}`
    second++
    
}
setTimeout(clocK,0)
setInterval(clocK,1000)



