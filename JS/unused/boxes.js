let boxWidth1 = getComputedStyle(document.documentElement).getPropertyValue('--boxWidth'), isFirstTime = true;
const slide = document.querySelector(".slide"), 
      sliders = 6, 
      dim = 55, 
      boxWidth = parseFloat(boxWidth1), 
      selectedImages = {}, 
      slidersELS = document.querySelectorAll(".slider");

// crea le box
for(let i = 0; i < sliders; i++){
  const div = document.createElement('div');
  div.classList.add('slider');
  slide.appendChild(div);
  for(let j = 0; j < dim; j++){
    const box = document.createElement('div');
    box.classList.add('box');
    if(i == 1)
      box.alt = j;
    else if(i == sliders - 1)
      box.alt = parseInt(dim + i + "" + j);
    // box.classList.add('interactable');
    div.appendChild(box);
  }
}

/*
if('connection' in navigator){
  const connection = navigator.connection;

  if('downlink' in connection){
    if(connection.downlink >= 10){ // connessione >= 80 mbps
      window.addEventListener("load", () => { handleBoxes(); });
    }
    else if(connection.downlink <= 3){
      isFirstTime = false;
      handleBoxes();
    }  
    else{
      handleBoxes();
    }
  }
}
*/

isFirstTime = false;
handleBoxes();



// function per gestire le box quando viene resizato lo schermo )100%, 90%, 80%, ...)
function handleBoxes() {
  slidersELS.forEach((slider) => {
    const sliderWidth = slider.offsetWidth;
    const maxVisibleBoxes = Math.ceil(sliderWidth / boxWidth);

    // boxes necessarie per riempire l'intera area della pagina
    const requiredBoxes = parseInt(maxVisibleBoxes / 40) + 1; // Aggiungi un po' di buffer

    // boxes attualmente presenti nel suo slider
    const currentBoxes = parseInt(slider.querySelectorAll(".box").length);

    if(currentBoxes < requiredBoxes){
      // new boxes all'interno del suo sliderr
      const newBoxes = requiredBoxes - currentBoxes;
      for (let i = 0; i < newBoxes; i++) {
        const box = document.createElement('div');
        box.classList.add("notContains");
        box.classList.add('box');
        slider.appendChild(box);
      }
    }

    // vede se devo rimuovere le boxes dal suo slider
    if(currentBoxes > requiredBoxes) {
      const boxesToRemove = currentBoxes - requiredBoxes;
      for(let i = 0; i < boxesToRemove; i++) {
        const box = slider.querySelector(".box");
        if(box) box.remove();
      }
    }
  });
  
  if(isFirstTime){
    randomBoxes();
    isFirstTime = false;
  }
  else
    randomResize();
}

window.addEventListener("resize", () => { handleBoxes(); });

// 100% = 5 sliders
// 75% = 8 sliders
// 50% = 10 sliders
// 25% = 19 sliders

function getRandomImageFromDirectory(directoryInfo){
    const { nome, numImmagini, directories } = directoryInfo;
    
    if(!selectedImages[nome])
        selectedImages[nome] = [];

    // seleziona una delle directory random
    if(directories){
        const randomSubdirectory = Math.floor(Math.random() * directories.length);
        return getRandomImageFromDirectory(directories[randomSubdirectory]);
    }

    // numero random per selezionare un'immagine non ancora nell'array "selectedImages"
    let randomImage;
    do
        randomImage = Math.floor(Math.random() * numImmagini) + 1;
    while(selectedImages[nome].includes(randomImage));

    // Adda l'img all'array
    selectedImages[nome].push(randomImage);

    // Se tutte le img sono già selezionate "resetta" l'array
    if(selectedImages[nome].length === numImmagini)
        selectedImages[nome].length = 0;

    // path dell'immagine
    return `${nome}/${nome}${String(randomImage).padStart(4, '0')}.JPG`;
}

function randomBoxes(){
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
        // seleziona un'immagine da una delle 2 directory principali (vedi https://viraluos.com/gallery/JS/arrays.js)
        const randomDir = Math.floor(Math.random() * directories.length);
        const selectedImage = getRandomImageFromDirectory(directories[randomDir]);

        // setta l'img nella box
        box.style.backgroundImage = `url(IMGS/${selectedImage})`;
        box.setAttribute('onclick', `img('${selectedImage}')`);
        box.classList.add("contains");
    });
}

function randomResize(){
  const newBoxes = document.querySelectorAll(".notContains");

  newBoxes.forEach((box) => {
    // seleziona un'immagine da una delle directory principali (vedi https://viraluos.com/JS/arrays.js)
    const randomDir = Math.floor(Math.random() * directories.length);
    const selectedImage = getRandomImageFromDirectory(directories[randomDir]);

    // setta l'img nella box
    box.style.backgroundImage = `url(IMGS/${selectedImage})`;
    box.setAttribute('onclick', `img('${selectedImage}')`);
    box.classList.add("contains");
    box.classList.remove("notContains");
  });
}

function resetBoxes(){
  slidersELS.forEach((slider) => {
    slider.style.animation = "endSlide 10s ease";
  });
  setTimeout(() => { 
    slidersELS.forEach((slider) => { slider.style.animation = ""; }); 
  }, 600000);
}

function img(link){
  // Spezza la stringa 'link' in parti separate da '/'
  const parts = link.split('/');
    
  if(parts.length >= 2){ // devono esserci almeno 2 parti domain/"path/file.estensione"
    const directory = parts[0];
    const path = parts[1]; 

    // non serve l'estensione
    const imageNumber = path.replace('.JPG', ''); // non serve l'estensione

    // url
    const redirectURL = `./pages.html?page=${directory}&photo=${imageNumber}&select=1&random=0`;

    redirect(redirectURL);
  }
}

/*
setInterval(() => { // riempie le box e le aggiunge / cancella dalla pagina per non avere un numero di boxes statico
  // elemento in cui c'è l'animazione: slide
  const computedStyle = window.getComputedStyle(document.querySelector(".slider"));

  // nome dell'animazione dalla classe CSS
  const animationName = computedStyle.animationName;

  // animazione in corso?
  if(animationName !== 'none') // animazione in corso
      handleBoxes();
  else // animazione non in corso
      console.log('animation not running.');
}, 5000);


document.getElementById("slider").onmousemove = e => {
  for(const box of document.getElementsByClassName("box")){
    const rect = box.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    box.style.setProperty("--mouse-x", `${x}px`);
    box.style.setProperty("--mouse-y", `${y}px`);
  };
}
*/