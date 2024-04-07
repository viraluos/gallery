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