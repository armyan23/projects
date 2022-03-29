export class Territory{
    static sizeTable = 15
    constructor(){
        
    }
    static creatTable(){
        let increment = 0
        let table = document.getElementById("territory") 
               
        for (let i = 0; i < Territory.sizeTable; i++) {
            let tr = document.createElement("tr")
            for (let x = 0; x < Territory.sizeTable; x++) {
                let td = document.createElement("td")
                // td.textContent = increment
                // td.style.border = "1px solid black"
                // increment++
                tr.append(td)
            }
            table.append(tr)
        }
    }    
}
