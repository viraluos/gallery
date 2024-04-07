const rootElement = document.documentElement, // seleziona :root (html)
      randomDark = document.querySelector(".random-dark"), // seleziona l'elemento con la classe "random-dark"
      letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 

function randomIMG(){ // animazione all'onlick di random
  randomDark.style.display = "inherit"; // mostra l'elemento con la classe "random-dark"
  
  setTimeout(() => { randomDark.style.transform = "scale(1)"; }, 500); // dopo 500 millisecondi, scala l'elemento con la classe "random-dark"
  
  setTimeout(() => { rootElement.style.setProperty('--randomColor', '#000000cc'); }, 1000); // dopo 1 secondo, setta una variabile CSS chiamata '--randomColor' con un colore nero
}
  
let interval = null, 
    indexDir = 0, 
    isFirstNumber = true, 
    isFirstName = true, 
    final = " ",
    randomName = "Directory", 
    randomNumber = 0,
    previousName = document.querySelector(".fx-name").innerText;

document.querySelectorAll(".fx").forEach(fx => { // rimuove l'attributo 'data-value' da tutti gli elementi con la classe ".fx"
  fx.onclick = event => {
    fx.removeAttribute('data-value');
    glitch(event);
  }
});

//document.querySelector(".fx-number").onclick = () => { isFirstNumber = false; }
//document.querySelector(".fx-name").onclick = () => { isFirstName = false; }

function glitch(event){
  previousName = document.querySelector(".fx-name").innerText
  indexDir = Math.floor(Math.random() * directories.length); // sceglie un indice random dall'array "directories" in "arrays.js"
  
  randomName = directories[indexDir].nome, 
  randomNumber = Math.floor(Math.random() * directories[indexDir].numImmagini) + 1; // Il nome del testo precedente in ".fx-name"

  if(randomName.length !== previousName.length)
    displayedName = randomName.slice(0, previousName.length)
  
  if(randomNumber < 10)
    final = `0${randomNumber}`;
  else
    final = randomNumber;

  setTimeout(() => {
    document.querySelector(".fx-number").style.opacity = "0";
    document.querySelector(".fx-name").style.opacity = "0";
    document.querySelector(".fx-number").setAttribute('data-value', `Foto ${final}`); // Update di 'data-value' del numero con le info random
    document.querySelector(".fx-name").setAttribute('data-value', displayedName); // Update di 'data-value' del nome con le info random
    console.clear();
  }, 2000);

  let iteration = 0;

  clearInterval(interval); // pulisce l'intervallo precedente, se presente

  interval = setInterval(() => { // setta un nuovo intervallo
    event.target.innerText = event.target.innerText // modifica il testo lettera per lettera *random*
      .split("")
      .map((letter, index) => {
        if(index < iteration)
          return event.target.dataset.value[index];
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length) // se l'iterazione è => alla lunghezza del valore originale, stoppa l'intervallo
      clearInterval(interval);
    
    iteration += 1 / 3;
  }, 30);

  setTimeout(() => { 
    document.querySelector(".fx-number").style.opacity = "1";
    document.querySelector(".fx-number").innerHTML = `Foto ${final}`;
    document.querySelector(".fx-name").style.opacity = "1";
    document.querySelector(".fx-name").innerHTML = randomName;
    document.querySelector("title").innerHTML = `Foto ${final} | Nome ${randomName}`;
  }, 2500 + (randomName.length * 30));

}

function randomReturn(){ // funzione per resettare lo stato della home dopo l'animazione
  rootElement.style.setProperty('--randomColor', 'transparent'); // resetta la variabile CSS '--randomColor' a trasparente
  
  setTimeout(() => { document.querySelector(".random-dark").style.transform = "scale(0)"; }, 500); // dopo 500 millisecondi, scala l'elemento con la classe "random-dark"
  
  setTimeout(() => { document.querySelector(".random-dark").style.display = "none"; }, 1000); // dopo 1 secondo, nasconde l'elemento con la classe "random-dark"
}

// funzione per il redirect random con i valori dell'indice random di prima
function randomRedirect(){
  redirect(`./pages.html?page=${randomName}&photo=${randomNumber}&select=0&random=1`);
}

document.body.addEventListener("keydown", function(event) {
    if(event.code === "KeyS") // cosa uguale al click del random button LOL 😱😱
      randomIMG();
    else if(event.code === "KeyF") // rolla il dice 💀
      document.querySelector(".fx-name").click();
    else if(event.code === "KeyD") // cosa uguale al click del return ("X") btn
      randomReturn();
    else if(event.code === "KeyG") // cosa uguale al click del "vai" btn
      randomRedirect();
});