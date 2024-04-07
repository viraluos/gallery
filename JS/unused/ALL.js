/* numero files nelle folders

const directoryPath = directories[0].nome;

fetch(`/PHP/files.php?directoryPath=${encodeURIComponent(directoryPath)}`).then(response => response.text()).then(data => { console.log(data); }).catch(error => console.error('Errore nella richiesta:', error));

console.log(directoryPath); */

// js/css paths

let incCSS, incJS;

const arrayFiles = [
  {
    alt: 'arrays',
    isJS: true
  },
  {
    alt: 'fontawesome',
    isJS: true
  },
  {
    alt: 'transition'
  },
  {
    alt: 'nav',
    isCSS: false,
    isJS: false
  },
  {
    alt: 'refresh',
    isJS: true // se è riservato solo a js (true)
  },
  {
    alt: 'boxes',
    isCSS: false,
    isJS: false
  },
  {
    alt: 'imageSlider',
    isRoot: false,
    isTest: false
  },
  {
    alt: 'pointer', // se non vogliamo includere un file basta mettere ad entrambi false
    isCSS: false,
    isJS: false
  },
  {
    alt: 'dots',
    isCSS: true // se è riservato solo a css (true)
  },
  {
    alt: 'mainStyle',
    isCSS: true
  },
  {
    alt: 'owl.carousel.min',
    isCSS: true
  },
  {
    alt: 'style',
    isCSS: true
  },
  {
    alt: 'arrow',
    isCSS: true
  },
  {
    alt: 'background',
    isJS: true
  },
  {
    alt: 'bootstrap.min',
    isCSS: true
  },
  {
    alt: 'dropdown',
    isJS: true
  },
  {
    alt: 'random',
    isJS: true
  },
];

// external js

/*
  window.addEventListener("load", () => {  
    const fontawesome = document.createElement("script");
    fontawesome.src = "link.js";
    document.body.appendChild(fontawesome);
  });
*/

// js

let notRoot = "../", path = window.location.pathname;

if(path == '/gallery/' || path == '/gallery/index.html' || path == '/gallery/pages.html'){
  
  // js
  
  for(let i = 0; i < arrayFiles.length; i++)
    if(arrayFiles[i].isCSS == undefined){ //js
        incJS = document.createElement("script");
        incJS.src = ('JS/' + "" + arrayFiles[i].alt + '.js');
        if(arrayFiles[i].isRoot == true || arrayFiles[i].isRoot == undefined)
          document.body.appendChild(incJS);
        else if((arrayFiles[i].isRoot == false || arrayFiles[i].isRoot == undefined) && path == '/gallery/pages.html')
          document.body.appendChild(incJS);
    }

  // css

  for(let i = 0; i < arrayFiles.length; i++)
    if(arrayFiles[i].isJS == undefined){ // css
      incCSS = document.createElement("link");
      incCSS.href = ('CSS/' + "" + arrayFiles[i].alt + '.css');
      incCSS.rel = "stylesheet";
      if(arrayFiles[i].isRoot == true || arrayFiles[i].isRoot == undefined)
        document.head.appendChild(incCSS);
      else if((arrayFiles[i].isRoot == false || arrayFiles[i].isRoot == undefined) && path == '/gallery/pages.html')
        document.head.appendChild(incCSS);
    }
}
else if(path != '/gallery/' || path != '/gallery/index.html' || path != '/gallery/pages.html'){
  
  for(let i = 0; i < arrayFiles.length; i++)
    if(arrayFiles[i].isCSS == undefined && (arrayFiles[i].isRoot == true || arrayFiles[i].isRoot == undefined) && (arrayFiles[i].isTest == true || arrayFiles[i].isTest == undefined)){ //js
        incJS = document.createElement("script");
        incJS.src = (`${notRoot}JS/` + "" + arrayFiles[i].alt + '.js');
        document.body.appendChild(incJS);
    }

  // css

  for(let i = 0; i < arrayFiles.length; i++)
    if(arrayFiles[i].isJS == undefined && (arrayFiles[i].isRoot == true || arrayFiles[i].isRoot == undefined) && (arrayFiles[i].isTest == true || arrayFiles[i].isTest == undefined)){ // css
      incCSS = document.createElement("link");
      incCSS.href = (`${notRoot}CSS/` + "" + arrayFiles[i].alt + '.css');
      incCSS.rel = "stylesheet";
      document.head.appendChild(incCSS);
    }
}

// root or noppp

/*
if((path.split('/').slice(0, -1).join('/') + '/') === '/'){
  const boxes = document.createElement("script");
  boxes.src = "../../JS/boxes.js";
  document.body.appendChild(boxes);

  const Boxes = document.createElement("link");
  Boxes.href = "../../CSS/boxes.css";
  Boxes.rel = "stylesheet";
  document.head.appendChild(Boxes);
}
else{
  const slider = document.createElement("script");
  slider.src = "../../JS/image-slider.js";
  document.body.appendChild(slider);
  
  const Slider = document.createElement("link");
  Slider.href = "../../CSS/image-slider.css";
  Slider.rel = "stylesheet";
  document.head.appendChild(Slider);
}
*/

// only mobile

// if(/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) // se è un dispositivo mobile
  if (document.getElementById("trailer"))
    document.getElementById("trailer").remove();

    const circle = document.querySelector(".circle"), timing = 500, duration = 1000;

    // timeout = esegue l'operazione nelle parentesi graffe dopo "timing" / "timing + duration" in MILLISECONDI 
    // (1sec = 1000ms -.-)
    //function transition(){
        setTimeout(() => {
                setTimeout(() => { 
                    circle.classList.add("circle-animation-out"); // dopo 500ms (timing) aggiunge circle-animation-out alle classi nel div con .circle
                }, timing);
                
                setTimeout(() => { 
                    document.querySelector("body").classList.remove("offcanvas-menu")
                    circle.classList.remove("circle-full"); // dopo 1.5 secondi (timing + duration) rimuoove circle-full e aggiunge circle-empty alle classi nel div con .circle
                    circle.classList.add("circle-empty");
                }, (timing + duration));
        }, 5);
    //};

    function redirect(link) {
        const isRoot = window.location.pathname; // Controlla se la pagina è nrlla root folder
    
        setTimeout(() => {
            circle.classList.remove("circle-empty");
            circle.classList.remove("circle-animation-out");
            circle.classList.add("circle-full");
            circle.classList.add("circle-animation-in");
            document.querySelector(".stage").style.opacity = "0";
        }, timing);
    
        setTimeout(() => {
            if(isRoot === '/gallery/') // Se sono nella dir '/', redirecta normalmente
                location.href = link;
            else // Altrimenti, redirecta a '/'
                location.href = '/gallery/' + link;
        }, (timing + duration));
    }

    const urlParams = new URLSearchParams(window.location.search), 
    imageContainer = document.querySelector('.image-slider'), 
    root = document.querySelector(":root");

var page = urlParams.get('page'),
  number = urlParams.get('photo'),
  selection = urlParams.get('select'),
  random = urlParams.get('random'),
  matches,
  photo = " ",
  noInfo = false,
  prevPage = localStorage.getItem('vPreviousPage'),
  photoIndex = parseInt(localStorage.getItem('vPhotoIndex'));

if(prevPage == page && (random != 1 || !random) && selection == 0)
number = photoIndex;
else if(prevPage != page && (random != 1 || !random) && (selection == 0 || !selection)){
number = 1;
photoIndex = 1;
}
else if(random == 1 || selection == 1)
photoIndex = number;

window.onbeforeunload = () => {
localStorage.setItem("vPreviousPage", `${matches[1]}`);
urlParams.set('random', 0);
}

if(parseInt(number) == 0)
  error(random);
else if(!page)
  error(random);

if(!noInfo){
  if(number > 0 && number)
      if(number >= 10)
          number = `00${number}`;
      else
          number = `000${number}`;

  if(!number && (page && page != '')) // Se non esiste number e se esiste page e se page è != da ''
      photo = `${page}0001`;
  else if(number && (page && page != '')) // Se esiste number e se esiste page e se page è != da ''
      photo = page + number;

  if(!selection) // non usato per ora
      selection = 0;

  if(!random) // non usato per ora
      random = 0;

  function image(value){ // nome del file dell'immagine (es. quaderni0001)
      //document.querySelector("title").textContent = `PAGE ${page.toUpperCase()}`; // `` = alt 96

      if(matches){
          const directoryName = matches[1]; // nome directory (es. quaderni)
          const photoNumbName = matches[2]; // numero file (es. 0001)

          for(let i = 0; i < directories.lenght; i++)
              if(directoryName == directories[i].nome)
                  index = i;

          document.querySelector("title").textContent = (directoryName.charAt(0).toUpperCase() + directoryName.slice(1)) + " N° " + photoIndex;
          document.querySelector(".n-text").textContent = `Foto ${parseInt(photoIndex)}/${directories[index].numImmagini} | Nome dir: ${directoryName.charAt(0).toUpperCase() + directoryName.slice(1)}`;

          document.querySelector(".image-slider").textContent = "";

          const btns = document.createElement('div'), div = document.createElement('div');
          btns.className = "btnImgs";
          div.className = 'zoom';

          const ileft = document.createElement('i'), iright = document.createElement('i');

          ileft.className = "fa-solid fa-chevron-left left";
          iright.className = "fa-solid fa-chevron-right right";

          ileft.setAttribute('onclick', `leftClick()`);
          iright.setAttribute('onclick', `rightClick()`);

          btns.appendChild(ileft);
          btns.appendChild(iright);

          // crea l'immagine e mette l'attributo 'src'
          const imgElement = document.createElement('img');
          imgElement.src = `IMGS/${directoryName}/${value}.JPG`;
          imgElement.classList.add("imgEl");
          div.appendChild(imgElement);

          imgElement.onload = function(){
              if(parseInt(imgElement.width) >= 700)
                  document.querySelector(":root").style.setProperty("--imageWidth", 700 + "px");
              else
                  document.querySelector(":root").style.setProperty("--imageWidth", (parseInt(imgElement.width) - 250) + "px");
          }
          
          imageContainer.appendChild(btns);
          imageContainer.appendChild(div);
      }

  }

  if(photo.match(/^([a-zA-Z]+)(\d+)$/))
      matches = photo.match(/^([a-zA-Z]+)(\d+)$/);

  let index = 0, 
      photoValue = parseInt(matches[2]), 
      photoString = " ",
      nums = " ",
      cifre = 0;

  for(const directory of directories){
      if(directory.nome === page)
          break;
      index++;
  }

if((photoIndex).toString().length == 1)
  nums = "000";
else if((parseInt(matches[2]) + 1).toString().length == 2)
  nums = "00";
else
  nums = "00";

  image(`${matches[1]}${nums}${photoIndex}`);

  cifre = (directories[index].numImmagini).toString();

  //incrementa di 1 il numero della foto se < directories[index].numImmagini, altrimenti riparte da 1
  function rightClick(){
      urlParams.delete('random');
      window.history.replaceState({}, '', `${new URL(window.location.href).pathname}?${urlParams}`);
    
      if(document.querySelector(".imgEl") == null)
          return 1;
  
      if((photoValue + 1).toString().length == 1)
          nums = "000";
      else if((parseInt(matches[2]) + 1).toString().length == 2)
          nums = "00";
      else
          nums = "00";
          
      if((photoValue + 1) <= directories[index].numImmagini){
          photoValue += 1;
          photoIndex += 1;
          photoString = `${matches[1]}${nums}${photoIndex}`;
          image(photoString);
      }
      else{
          photoValue = 1;
          photoIndex = 1;
          photoString = matches[1] + "0001";
          image(photoString);
      }
      localStorage.setItem("vPhotoIndex", photoIndex);
  };

  //decrementa di 1 il numero della foto se maggiore di 1. altrimenti riparte da directories[index].numImmagini
  function leftClick(){
      urlParams.delete('random');
      window.history.replaceState({}, '', `${new URL(window.location.href).pathname}?${urlParams}`);
    
      if(document.querySelector(".imgEl") == null)
          return 1;

      if(photoValue == 1 && directories[index].numImmagini > 9)
          nums = "00";
      else if(photoValue == 1 && directories[index].numImmagini < 9)
          nums = "000";
      else if(photoValue == 10 && directories[index].numImmagini > 9)
          nums = "000";
          
      if((photoValue - 1) > 0){
          photoValue -= 1;
          photoIndex -= 1;
          photoString = `${matches[1]}${nums}${photoIndex}`;
          image(photoString);
      }
      else{
          photoValue = directories[index].numImmagini;
          photoIndex = directories[index].numImmagini;
          matches[2] = directories[index].numImmagini;
          photoString = matches[1] + nums + directories[index].numImmagini;
          image(photoString);
      }
      localStorage.setItem("vPhotoIndex", photoIndex);
  };

  document.body.addEventListener("keydown", function(event) { // keydown events
  if(event.code === "ArrowLeft" || event.code === "KeyA") // keydown event "arrowLeft / 'a'" l'immagine cambia andando indietro
      document.querySelector(".fa-chevron-left").click();
  else if(event.code === "ArrowRight" || event.code === "KeyD") // keydown event "arrowRight / 'd'" l'immagine cambia andando avanti
      document.querySelector(".fa-chevron-right").click();  
  });
}

//visualizza errore
function error(randomValue){
  noInfo = true;
  document.querySelector("title").textContent = "[errore]";

  imageContainer.classList.add("active");
  
  if(randomValue)
      imageContainer.textContent = `[errore] Risulta che non hai cliccato il randomizer.`;
  else
      imageContainer.textContent = `[errore] Nessun file selezionato.`;

  const a = document.createElement("a");
  a.setAttribute('onclick', `redirect("./#")`)
  a.className = "a-error";
  a.innerHTML = "Home";
  document.querySelector(".home-btn").appendChild(a);

  return;
}

const selectedImages = {}; // oggetto, non array

function getRandomImageFromDirectory(directoryInfo){
  const { nome, numImmagini, directories } = directoryInfo;
  
  if(!selectedImages[nome])
      selectedImages[nome] = [];
  
  if(directories){ // seleziona una delle directory random
      const randomSubdirectory = Math.floor(Math.random() * directories.length);
      return getRandomImageFromDirectory(directories[randomSubdirectory]);
  }

  let randomImage; // numero random per selezionare un'immagine non ancora nell'array "selectedImages"
  do
      randomImage = Math.floor(Math.random() * numImmagini) + 1;
  while(selectedImages[nome].includes(randomImage)); // "".includes" verifica se l'array contiene randomImage. true se l'elemento è presente altrimenti false.

  selectedImages[nome].push(randomImage); // Mette l'img nell'array

  // path dell'immagine
  if(window.location.pathname == '/gallery/' || window.location.pathname == '/gallery/index.html')
    return `IMGS/${nome}/${nome}${String(randomImage).padStart(4, '0')}.JPG`; // `` per usare le template strings, incorpora espressioni in una stringa (alt 96)
    // padStart lo utilizzo per aggiungere zeri allo start della stringa fino a raggiungere una length di 4 caratteri, '0' viene aggiunto fino a quando la len della stringa non diventa 4
  else
    return `../IMGS/${nome}/${nome}${String(randomImage).padStart(4, '0')}.JPG`;
}

const randomImages = document.querySelectorAll("#randomImage");

randomImages.forEach(img => {
    const randomIMG = getRandomImageFromDirectory(directories[Math.floor(Math.random() * directories.length)]);
    img.src = randomIMG;
    let dir = randomIMG.split('/')[1], numb = randomIMG.split('/')[2].replace('.JPG', '').replace(randomIMG.split('/')[1], '');
    if(numb.charAt(2) > 0)
        numb = numb.replace('00', '');
    else
        numb = numb.replace('000', '');
    img.setAttribute('onclick', `redirect("./pages.html?page=${dir}&photo=${numb}&select=1&random=0")`);
});

const menuData = [
    { letter: 'A', items: ['acciaio', 'alcolris', 'appunti'] },
    { letter: 'B', items: ['black', 'bloch', 'blocj', 'block'] },
    { letter: 'C', items: ['cappuccine', 'carte', 'covid'] },
    { letter: 'D', items: ['dis', 'DSCN'] },
    { letter: 'E', items: ['einaudi'] },
    { letter: 'G', items: ['genius'] },
    { letter: 'I', items: ['impronte'] },
    { letter: 'M', items: ['marco', 'mostre'] },
    { letter: 'O', items: ['other'] },
    { letter: 'Q', items: ['quaderni'] },
    { letter: 'R', items: ['reggio', 'rospi'] },
    { letter: 'S', items: ['scatole'] },
    { letter: 'V', items: ['vetefar'] }
  ];
  
  const dynamicMenu = document.getElementById('dropdown');
  
  menuData.forEach(menuItem => {
    const li = document.createElement('li');
    li.classList.add('has-children');
  
    const a = document.createElement('a');
    a.href = "#";
  
    const bold = document.createElement('b');
    bold.textContent = menuItem.letter;
  
    a.appendChild(bold);
  
    const ul = document.createElement('ul');
    ul.classList.add('dropdown');
  
    menuItem.items.forEach(item => {
      const liItem = document.createElement('li');
      const aItem = document.createElement('a');
      aItem.setAttribute('onclick', "redirect(\"pages.html?page=" + item + "\")");
      aItem.style.setProperty('--c', randomColorGenerator());
      aItem.textContent = item;
      aItem.className = "dropdown-link";
      
      liItem.appendChild(aItem);
      ul.appendChild(liItem);
    });
  
    li.appendChild(a);
    li.appendChild(ul);
    dynamicMenu.appendChild(li);
  });
  
  function randomColorGenerator(){
    // Genera tre comp RGB casuali
    let start = 150; // più basso è più il colore sarà chiaro
  
    const r = Math.floor(Math.random() * start) + (255 - start),
          g = Math.floor(Math.random() * start) + (255 - start),
          b = Math.floor(Math.random() * start) + (255 - start);
  
    // Converte le comp RGB in hex
    const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  
    return hexColor;
  }
  
  document.querySelectorAll(".dropdown-link").forEach(link => {
      link.addEventListener("click", () => { localStorage.setItem("vPreviousPage", `${matches[1]}`); });
  });

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