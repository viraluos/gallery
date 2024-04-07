var arrayData;

function getDirectories() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);

        processJSON(data);
        createList();
      }
      else
        console.error("Error fetching data. Status: " + xhr.status);
    }
  };
  xhr.open("GET", "./PHP/getDirectories.php", true);
  xhr.send();
}

function processJSON(data) {

  arrayData = data;

}
