<?php

$adj = array(1); //matrice di adiacenza per l'albero delle directory
$adj[0] = array(1); //radice dell'albero

$result = array();

function &getNode($node_name, &$adj) //ritorna il nodo con nome node_name
{
    foreach ($adj as &$row) //per ogni riga della matrice
        if ($row[0] === $node_name) //se il nome del nodo è uguale a node_name ritorna il nodo
            return $row;

    static $dummy = null; //se il nodo non c'è ritorna null
    return $dummy;
}

function addChild($node_name, $child_name, &$adj) //aggiunge un figlio al nodo node_name
{
    $node = &getNode($node_name, $adj); //cerca il nodo node_name
    if ($node === null) { //se il nodo non c'è ritorna un errore
        echo "Hai sbagliato nome. Correggi " . $node_name . "<br>";
        return;
    }
    $node[] = $child_name; //aggiunge il figlio alla fine del nodo corrente
    foreach($adj as $row) //per ogni riga della matrice
        if($row[0] === $child_name) //se il figlio è già presente nell'albero ritorna 
            return;

	if(is_dir($child_name)){ //se il figlio è una directory, aggiungilo come nodo all'albero
		$adj[] = array($child_name);
	}
}

function scanDirectories($directory, &$adj)
{
    $result = array();

    // Directory e file nel path
    $items = glob($directory . '/*');

    foreach ($items as $item) { //aggiunge all'albero i figli della directory corrente
        addChild($directory, $item, $adj);
    }

    foreach ($items as $item) { //per ogni elemento della directory
        if(is_dir($item)) //se è una directory, chiama ricorsivamente la funzione per l'elemento corrente
            $result = array_merge($result, scanDirectories($item, $adj));
        else //se è un file, aggiungilo
            $result[] = $item;
    }

    return $result;
}

$directoryPath = '../IMAGES';
$adj[0][0] = $directoryPath; //root dell'albero
$allItems = scanDirectories($directoryPath, $adj); //inizia ad esplorare dalla root

echo json_encode($adj);

?>
