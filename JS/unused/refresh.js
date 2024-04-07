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