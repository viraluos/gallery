getDirectories();

const limit = Number.MAX_SAFE_INTEGER, current_directory = getCookie("vGallerySub");

document.querySelector("title").textContent = "Ora sei in: " + (current_directory ? current_directory : "/");

function createList(){
  const divElement = document.createElement('div');
  divElement.classList.add('div-li');
  divElement.classList.add('box');

  const ulElement = document.createElement('ul');
  ulElement.classList.add('ul-list');

  const dirs = arrayData;

  if(!getCookie("vGallerySub") || getCookie("vGallerySub") == 'undefined'){
    root(dirs, divElement, ulElement);
  }
  else
    subdir(dirs, divElement, ulElement);
}

function root(dirs, divElement, ulElement){

  dirs[0].forEach(item => {
    let sliced = item.slice(13, limit);
    if(sliced != ''){
      const li = document.createElement('li'), a = document.createElement('a');
      a.textContent = sliced;
      a.setAttribute("onclick", `redirecting("${sliced}")`); // setto l'onclick dell'elemento a sliced tra virgolette sennò non va
      a.setAttribute("style", `--main: ${getRandomColor()};`); // random color al testo e all'underline

      li.appendChild(a);
      li.id = "#li";
      ulElement.appendChild(li);
    }
  });

  backgroundImages(dirs, true);

  divElement.appendChild(ulElement);

  document.body.appendChild(divElement);

}

function subdir(dirs, divElement, ulElement){

  let value = getCookie("vGallerySub"), x; // value è il valore contenuto nel cookie, x serve per capire in quale riga è presente il cookie

  for(let i = 0; i < dirs.length; i++) // 60 elems
    for(let j = 0; j < dirs[i].length; j++){ // ogni riga ha colonne diverse
      let content = dirs[i][j];
      if(content.slice(13, limit) == value){ // se il contenuto di dirs[i][j] senza la parte "../../IMAGES" è uguale al cookie
        x = i; // allora setta x a i
      }
    }

  let dir=true;

  for(let item of dirs[x]){ 
    let sliced = item.slice(13, limit); // parte senza "../../IMAGES"
    
    //console.log(sliced, item);

    if(sliced != value){
      let ext = item.split('.').pop().toLowerCase();
      let isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(ext);

      if(isImage){ // questo dev'essere == true non == false
        dir=false;
        break;
      }
    }

  }

  if(dir){
    
    document.getElementById("image-grid").remove();

    dirs[x].forEach(item => { // quindi x sarà l'unica riga che andrò a vedere

      let sliced = item.slice(13, limit); // parte senza "../../IMAGES"

      if(sliced == value) // se sliced è uguale al valore nel cookie vuol dire che è il primo elemento, il primo elemento di ogni riga è il nome della directory
        sliced = "back"; // quindi lo setta a "back", vedi redirecting("back"), l'ultima funzione del file
  // non posso fare else sennò non mette l'elemento back
      const li = document.createElement('li'), a = document.createElement('a');
      a.textContent = sliced;
      a.setAttribute("onclick", `redirecting("${sliced}")`); // setto l'onclick dell'elemento a sliced tra virgolette sennò non va
      a.setAttribute("style", `--main: ${getRandomColor()};`); // random color al testo e all'underline

      li.appendChild(a);
      li.id = "#li";
      ulElement.appendChild(li);
    });

    backgroundImages(dirs, false);

    divElement.appendChild(ulElement);

    document.body.appendChild(divElement);
  }else{
    finaldir(dirs[x]);
  }
}

var selected_img;

function finaldir(dir){

  let value = getCookie("vGallerySub");

  document.getElementById("image-container").remove();
  document.getElementById("dotted-box").remove();

  const grid = document.getElementById("image-grid");

  dir.forEach(item => {
    if(item.slice(13, limit) == value){
      const div = document.createElement('div');
      div.textContent = "back";
      div.className = "back";
      div.setAttribute("onclick", `redirecting("back")`);
      grid.appendChild(div);
    }
    else{
      const img = document.createElement('img');
      img.src = item.slice(3, limit);
      img.className = "image";
      grid.appendChild(img);
      
      img.onclick = function() {
        if(this.classList.contains('fullscreen')){ // se l'elemento ha la classe fullscreen
          this.classList.remove('fullscreen'); // allora la rimuove
          document.getElementById('blur-layer').style.display = "none"; //e nasconde il blur layer
        
          document.getElementById('left-arrow').style.display = "none"; // nasconde le frecce
          document.getElementById('right-arrow').style.display = "none"; 
        }
        else{ //altra immagine premuta (spoiler non serve più perchè è impossibile premere un'altra immagine)
          Array.from(document.getElementsByClassName('fullscreen')).forEach(function(item){ //rimuove la classe fullscreen a tutti gli elementi che ce l'hanno
            item.classList.remove('fullscreen'); 
          });

          this.classList.add('fullscreen'); //aggiunge la classe fullscreen all'elemento cliccato
          const images = document.querySelectorAll('div img'); // seleziona tutte le immagini
          for(let i = 0; i < images.length; i++){ //ottiene l'indice dell'immagine cliccata
            if(images[i] == this){
              selected_img = i;
              break;
            }
          }
          document.getElementById('left-arrow').style.display = "block"; // mostra le frecce
          document.getElementById('right-arrow').style.display = "block";

          document.getElementById('blur-layer').style.display = "block"; // mostra il blur layer
        }
      };
    }
  });

  if(grid.childElementCount > 0)
    document.body.style.overflow = "scroll";  

  var blur_layer = document.createElement('div'); //div per il blur layer
  blur_layer.className = "blur-layer";
  blur_layer.id = "blur-layer";
  blur_layer.style.display = "none"; //non visibile all'inizio

  blur_layer.onclick = function(){ //se viene cliccato il blur layer ritorna la griglia iniziale
    Array.from(document.getElementsByClassName('fullscreen')).forEach(function(item){ item.classList.remove('fullscreen'); });
    this.style.display = "none";

    document.getElementById('left-arrow').style.display = "none";
    document.getElementById('right-arrow').style.display = "none";
  };
  document.body.appendChild(blur_layer);

  var leftArrow = document.createElement('i'); //freccia sinistra
  leftArrow.id = "left-arrow";
  leftArrow.className = "arrow_left fa-solid fa-arrow-left";
  leftArrow.style.display = "none";

  leftArrow.onclick = function() { //se viene cliccata la freccia sinistra mostra l'immagine precedente
    if(selected_img > 0){
      Array.from(document.getElementsByClassName('fullscreen')).forEach(function(item){ item.classList.remove('fullscreen'); });
      document.querySelectorAll('div img')[selected_img - 1].classList.add('fullscreen');
      selected_img--;
    }
  };
  document.body.appendChild(leftArrow);

  var rightArrow = document.createElement('i'); //freccia destra
  rightArrow.id = "right-arrow";
  rightArrow.className = "arrow_right fa-solid fa-arrow-right";
  rightArrow.style.display = "none";

  rightArrow.onclick = function() { //se viene cliccata la freccia destra mostra l'immagine successiva
    if(selected_img < document.querySelectorAll('div img').length - 1){
      Array.from(document.getElementsByClassName('fullscreen')).forEach(function(item){ item.classList.remove('fullscreen'); });
      document.querySelectorAll('div img')[selected_img + 1].classList.add('fullscreen');
      selected_img++;
    }
  };
  document.body.appendChild(rightArrow);
}

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSubdir(min = 0, maximum = false){
  
  // console.log(maximum);

  if(maximum){ // massimo, minimo c'è
    let massimo, dir = getCookie("vGallerySub"), current = 0;

    // console.log(min, dir);

    for(massimo = min; massimo < arrayData.length - 1; massimo++){
      
      current = arrayData[massimo][0]; // current è il primo elemento contenente sempre la subdir che devo analizzare
      
      // console.log(current);

      current = current.split('/', limit); // splitto current con '/' e lo faccio diventare un array
      
      if(dir == (current[2] + "/" + current[3])){ // se (per esempio) dir è "01Carte/2002_Carte", current[2] è "01Carte" mentre current[3] sarà "2002_Carte"

        if(dir != (current[2] + "/" + current[3]))
          break;
      
      }
      else if(dir == (current[2] + "/" + current[3] + "/" + current[4])){ // se (per esempio) dir è "01Carte/2002_Carte/12_black", current[2] è "01Carte", current[3] sarà "2002_Carte" mentre current[4] sarà "12_black"

        if(dir != (current[2] + "/" + current[3] + "/" + current[4])) // non serve al momento, ci sono al massimo 3 subdir. se qualcuno dovesse mettere 4 subdir questo else if copre fino a 4 subdir. Devo renderlo automatico nel senso di non dover mettere troppi else if così però per ora va bene.
          break;
      
      }
      else{ // se invece la subdir è la prima dopo il root questo else trova il massimo in tutta la subdir
      
        if(dir != current[2])
          break;
      
      }
    }
    
    return massimo - 1;
  }
  else{ // minimo non c'è ancora. stessa spiegazione del massimo in pratica
    let minimo, dir = getCookie("vGallerySub"), current = 0;

    // console.log(dir);

    for(minimo = 11; minimo < arrayData.length - 1; minimo++){
      
      current = arrayData[minimo][0];

      // console.log(current);

      current = current.split('/', limit);
      
      if(dir == current[2])
        break;
      else if(dir == (current[2] + "/" + current[3]))
        break;
      else if(dir == (current[2] + "/" + current[3] + "/" + current[4])) // non serve al momento, giusto per. (se qualcuno mette 4 subdir)
        break;
    }

    return minimo;
  }
}

function getRandomNumberExcluding(min, max, excludedNumbers){
  let randomNumber;

  do
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  while(excludedNumbers.includes(randomNumber));
  
  return randomNumber;
}

const excludedDirs = [ 2, 3, 5, 6, 7, 8, 9, 10, 25, 26, 53 ]; // directory escluse perchè non hanno delle immagini dentro, si devo migliorare sta roba ma per testing va bene così

function backgroundImages(dirs, root){ // 3 random images in the background

  // console.log(getCookie("vGallerySub"))

  if(root){

    for(let i = 1; i <= 3; i++){
      const img = document.querySelector(`.image-bg:nth-child(${i})`); // immagini selezionate di fila (1, 2, 3) con la classe .image-bg
      img.setAttribute("onclick", `imageRedirect("${i}")`);

      let random_x = getRandomNumberExcluding(1, arrayData.length - 1, excludedDirs); // prendo una dir random escludendo quelle senza immagini
      let random_y = getRandomNumber(1, dirs[random_x].length - 1); // prendo un immagine random nella dir appena selezionata

      //console.log(dirs, random_x, random_y);
      
      let path = dirs[random_x][random_y]; // path della foto
      let isImage = extension(path);

      //console.log(path);

      if(isImage)
        img.src = path.slice(3, limit); // set dell'src della foto
      else
        backgroundImages(dirs, root);
    }

  }else{

    for(let i = 1; i <= 3; i++){
      const img = document.querySelector(`.image-bg:nth-child(${i})`);

      let min = getSubdir(0, false),
          max = getSubdir(min, true); // mi serve il minimo per trovare il massimo :|

      console.log(min, max);

      let random_x = getRandomNumberExcluding(min, max, excludedDirs); // prendo un immagine random nella dir in cui sono in questo momento
      let random_y = getRandomNumber(1, dirs[random_x].length - 1); // prendo un immagine random nella dir appena selezionata

      console.log(dirs, random_x, random_y);

      let path = dirs[random_x][random_y]; // path della foto
      let isImage = extension(path);

      console.log(path);

      if(isImage)
        img.src = path.slice(3, limit); // set dell'src della foto
      else
        backgroundImages(dirs, root);
    }

  }
  
  for(let i = 1; i <= 3; i++)
    if(document.querySelector(`.image-bg:nth-child(${i})`).getAttribute('src') === '')
      backgroundImages(dirs, root);
}

function extension(path){
  let estensioni = ["png", "jpg", "jpeg", "gif"];

  for(let i = 0; i < estensioni.length; i++)
      if(path.toLowerCase().includes(estensioni[i]))
          return true;

  return false;
}

function imageRedirect(image){
  image = parseInt(image);
  const img = document.querySelector(`.image-bg:nth-child(${image})`).getAttribute('src');

  const sliced = img.split('/');
  let link = '';

  for( let i = 1; i < sliced.length - 1; i++)
    link += sliced[i] + '/';

  link = link.slice(0, link.length - 1);

  setCookie("vGalleryImg", true, 30);

  redirecting(link);
}

function getRandomLG(){ // get random linear gradient in hex
  const letters = '6789ACEF';
  let gradient = 'linear-gradient(45deg, ';

  for(let i = 0; i < 4; i++){ // 4 colori nel gradient
    let color = '#';
    for(let j = 0; j < 6; j++)
      color += letters[Math.floor(Math.random() * letters.length)];
    gradient += color + ', ';
  }

  gradient = gradient.slice(0, -2);  // ultima virgola e space
  gradient += ')';

  return gradient;
}

function getRandomColor(){ // get random color in hex
  const letters = '6789ABCDEF'; // colori abbastanza chiari, se avessi messo "123456" sarebbero colori molto scuri
  let color = '#';
  for(let i = 0; i < 6; i++) // il for prende un char random in letters e lo mette in colors
    color += letters[Math.floor(Math.random() * letters.length)];
  return color;
}

//---

function getCookie(name){ // getCookie(proocasdkhiashf);
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++){
    var cookie = cookies[i];
    while(cookie.charAt(0) === ' ')
      cookie = cookie.substring(1, cookie.length);
    if(cookie.indexOf(nameEQ) === 0)
      return cookie.substring(nameEQ.length, cookie.length);
  }
  return null;
}

function setCookie(name, value, days){ // setCookie(proocasdkhiashf, 8765, 30);
  var expires = "";
  if(days){
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function deleteCookie(name){  // deleteCookie(proocasdkhiashf);
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const urlParams = 0;

function redirecting(link){
  if(link == "back"){

    if(getCookie("vGalleryImg") == "true"){
      deleteCookie("vGallerySub");
      deleteCookie("vGalleryImg");
      location.reload();
    }

    let value = getCookie("vGallerySub"), str = "";
    value = value.split("/", limit);

    for(let i = 0; i < value.length - 1; i++)
      str += value[i] + "/";

    str = str.slice( 0, str.length - 1 );

    setCookie("vGallerySub", str, 30);

  }
  else
    setCookie("vGallerySub", link, 30);

  location.reload();
}

function isMobile(){
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}