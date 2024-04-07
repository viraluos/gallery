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
else if((photoIndex + 1).toString().length == 2)
    nums = "00";
else
    nums = "00";

    image(`${matches[1]}${nums}${photoIndex}`);

    cifre = (directories[index].numImmagini).toString();

    function rightClick(){
        urlParams.delete('random');
        window.history.replaceState({}, '', `${new URL(window.location.href).pathname}?${urlParams}`);
      
        if(document.querySelector(".imgEl") == null)
            return 1;
    
        if((photoValue + 1).toString().length == 1)
            nums = "000";
        else if((photoValue + 1).toString().length == 2)
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