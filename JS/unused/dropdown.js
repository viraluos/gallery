//Dati che verranno inseriti all'interno del menu, costante perché non possono essere modificati
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