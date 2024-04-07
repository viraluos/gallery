const arrayFiles = [ // files js/css to use
  { name: 'getStructure', isJS: true },
  { name: 'fontawesome', isJS: true },
  { name: 'filler', isJS: true }, // test.js
  { name: 'main', isCSS: true }, // test.css
  { name: 'mainStyle', isCSS: true },
  { name: 'style', isCSS: true },
  { name: 'images', isCSS: true },
];

function includeFile(type, name) { // including the files in the html code
  const element = type === 'js' ? document.createElement('script') : document.createElement('link');
  element[type === 'js' ? 'src' : 'href'] = `${type.toUpperCase()}/${name}.${type}`;

  if(type === 'js'){
    element.defer = true;
    document.body.appendChild(element);
  }
  else if(type === 'css'){
    element.rel = 'stylesheet';
    document.head.appendChild(element);
  }
}

for(const file of arrayFiles){
  if (file.isJS) includeFile('js', file.name);
  if (file.isCSS) includeFile('css', file.name);
}

