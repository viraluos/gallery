// Funzione per generare l'HTML
function generateMenu(menuItems){
    const nav = document.createElement('nav');
    nav.classList.add('main-menu');
    nav.classList.add('interactable');
    nav.style.setProperty('--i', '1s');
    nav.dataset.type = "stuff";

    const ul = document.createElement('ul');

    menuItems.forEach((item) => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.setAttribute('onclick', `redirect('${item.href}')`);
        a.classList.add('interactable');
        a.classList.add('transition');
        a.dataset.type = "link";

        const i = document.createElement('i');
        i.className = item.iconClass;

        const span = document.createElement('span');
        span.classList.add('nav-text');
        span.textContent = item.text;
        
        a.appendChild(i);
        a.appendChild(span);

        if(item.hasSub){
            li.classList.add('has-subnav');
            const iSub = document.createElement('i');
            iSub.className = "fa fa-arrow-right";
        }

        
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);

    const logoutUl = document.createElement('ul');
    logoutUl.classList.add('logout');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = 'https://www.google.com/';
    const i = document.createElement('i');
    i.className = 'fa fa-power-off fa-2x';
    const span = document.createElement('span');
    span.classList.add('nav-text');
    span.textContent = '6';
    a.appendChild(i);
    a.appendChild(span);
    li.appendChild(a);
    logoutUl.appendChild(li);
    nav.appendChild(logoutUl);

    return nav;
}

// Aggiungi il menu generato al documento
const menuContainer = document.getElementById('nav-area');
menuContainer.appendChild(generateMenu(menuItems));

if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
    const mainmenu = document.querySelector('.main-menu');

    mainmenu.addEventListener("click", () => {
        mainmenu.classList.add('active-nav');
    });

    mainmenu.addEventListener("mouseout", () => {
        mainmenu.classList.remove('active-nav');
    });
}