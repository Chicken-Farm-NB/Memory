// Obiekty 'board' i 'endDiv' są używane w wielu miejscach, więc powinno się wstawić je do globalnej zmiennej. Obiekty HTML powinny być ładowane do JS tylko RAZ
let container = document.getElementById("container");
let board = document.getElementById("board");
let endDiv = document.getElementById("endDiv");

const CARDS_TYPES = 8; // Ilość rodzajów kart powinna znajdować się w stałej
const IMAGES = []; // Tablica z nazwami obrazków

let id = 0;
let firstChoice;
let secondChoice;
let first = true;

function setup(){
    const BOARD_SIZE = 4;

    setupArray();
    setupImages();

    for(let i = 0; i < BOARD_SIZE; i++){
        for(let j = 0; j < BOARD_SIZE; j++){
            board.innerHTML += `<div class='field' id=${id} onclick='showField(${id})'><h1 class='questionMark'>?</h1></div>`;
            id++;
        }
        board.innerHTML += "<div style='clear: both;'></div>";
    }
}

// Tworzenie kart - nowa funkcja
function setupArray() {
    let indexes = []; // Tablica indeksy jest używana tylko do wylosowania kart, więc można ją zrobić lokalnie
    for(let i = 0; i < CARDS_TYPES; i++) { // Indeksy stworzyć pętlą, zamiast dokowywać konkatenacji tablic - karty będą w tej sposób bardziej losowo rozłożone
        indexes.push(i);
        indexes.push(i);
    }
    randomArray = createRandomArray(indexes);
    parsAmount = randomArray.length;
}
// Tworzenie nazw obrazków - nowa funkcja
function setupImages() {
    for(let i = 0; i < CARDS_TYPES; i++) {
        IMAGES.push(`Images/mineral${i + 1}.png`); // Nazwy obrazków utworzyć pętlą, zamiast ręcznie wpisywać
    }
}

function verticalAllign(){
    let screenHeight = window.innerHeight;
    let boardHeight = board.offsetHeight;
    let marginTop = screenHeight / 2 - boardHeight / 2;

    container.style.setProperty("margin-top", `${marginTop}px`);
}


function createRandomArray(array){
    const OLD_ARRAY = Array.from(array);
    const NEW_ARRAY = [];

    while(OLD_ARRAY.length != 0){
        let randomIndex = getRandomNum(0, OLD_ARRAY.length - 1);
        NEW_ARRAY.push(OLD_ARRAY[randomIndex]);
        OLD_ARRAY.splice(randomIndex, 1);    
    }
    return NEW_ARRAY;
}

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showField(id){
    let field = document.getElementById(id);

    field.style.setProperty("transform", "rotateZ(360deg)");
    field.innerHTML = `<img src='${IMAGES[randomArray[id]]}'>`;
    
    if(first)firstChoice = id;
    else secondChoice = id;

    if(!first)compare(firstChoice, secondChoice);
    else first = false;

}

function compare(firstId, secondId){
    if(firstId == secondId)return;
    else if(randomArray[firstId] == randomArray[secondId])same(firstId, secondId);
    else different(firstId, secondId);
    first = true;
}

function same(firstId, secondId){
    let field1 = document.getElementById(firstId);
    let field2 = document.getElementById(secondId);
    field1.id = "";
    field2.id = "";
    field1.setAttribute("onclick", "");
    field2.setAttribute("onclick", "");
    parsAmount -= 2;
    if(parsAmount == 0)win();
}

function different(firstId, secondId){
    let field1 = document.getElementById(firstId);
    let field2 = document.getElementById(secondId);
    const TIMEOUT = 1500;

    for(let i = 0; i < randomArray.length; i++){
        if(document.getElementById(i)){
            let block = document.getElementById(i);
            block.setAttribute("onclick", ""); 
        }
    }

    setTimeout(function (){
        field1.style.setProperty("transform", "rotateZ(0deg)");
        field2.style.setProperty("transform", "rotateZ(0deg)");
        field1.innerHTML = "<h1 class='questionMark'>?</h1>";
        field2.innerHTML = "<h1 class='questionMark'>?</h1>";

        for(let i = 0; i < randomArray.length; i++){
            if(document.getElementById(i)){
                let block = document.getElementById(i);
                block.setAttribute("onclick", `showField(${i})`); 
            }
        }
    }, TIMEOUT);
}

function win(){
    endDiv.style.zIndex = "1";
    endDiv.style.backgroundColor = "rgba(225, 225, 225, .8)";
}