

  function myFunction() {
    const x = document.getElementById("menuId");
    if (x.className === "menu") {
      x.className += " responsive";
    } else {
      x.className = "menu";
    }
  }