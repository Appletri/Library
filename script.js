const library = document.querySelector(".library");
const bookIn = document.querySelector(".book");
const authorIn = document.querySelector(".author");
const progress = document.querySelector(".progress");
const stats = document.querySelector(".stats");
const addItem = document.querySelector(".addItem");
const sortName = document.querySelector('#name');
const sortAuthor = document.querySelector('#author');
const sortStatus = document.querySelector('#status');
const addCube = document.querySelector('.add-cube');


// startup  
// let librarySaves = JSON.parse(localStorage.getItem('librarySaves')); 
let myLibrary = JSON.parse(localStorage.getItem('myLibrary')); 
let librarySaves = [];


if (JSON.parse(localStorage.getItem('myLibrary')) == null || myLibrary.length == 0 )  {
    myLibrary = [
        {
          "name": "Valorant",
          "author": "Riot Games",
          "status": "complete",
          "id": 314
        },
        {
          "name": "Street Fighter V",
          "author": "Capcom",
          "status": "incomplete",
          "id": 210
        },
        {
          "name": "Rocket League",
          "author": "Psyonix LLC",
          "status": "complete",
          "id": 565
        },
        {
          "name": "Portal 2",
          "author": "Valve",
          "status": "complete",
          "id": 6
        },
        {
          "name": "Portal",
          "author": "Valve",
          "status": "complete",
          "id": 126
        },
        {
          "name": "Phasmophobia",
          "author": "Kinetic Games",
          "status": "complete",
          "id": 799
        },
        {
          "name": "Legend of Zelda",
          "author": "Nintendo",
          "status": "incomplete",
          "id": 112
        },
        {
          "name": "League of Legends",
          "author": "Riot Games",
          "status": "complete",
          "id": 180
        },
        {
          "name": "Hitman 3: Episode 5 ",
          "author": "Epic Games",
          "status": "incomplete",
          "id": 464
        },
        {
          "name": "Hearthstone",
          "author": "Blizzard",
          "status": "complete",
          "id": 77
        },
        {
          "name": "Final Fantasy XV",
          "author": "Square Enix",
          "status": "incomplete",
          "id": 609
        },
        {
          "name": "Final Fantasy XIII",
          "author": "Square Enix",
          "status": "complete",
          "id": 84
        },
        {
          "name": "Final Fantasy XI",
          "author": "Square Enix",
          "status": "complete",
          "id": 834
        },
        {
          "name": "Final Fantasy X",
          "author": "Square Enix",
          "status": "complete",
          "id": 280
        },
        {
          "name": "Final Fantasy VIII",
          "author": "Square Enix",
          "status": "incomplete",
          "id": 549
        },
        {
          "name": "Final Fantasy VII",
          "author": "Square Enix",
          "status": "incomplete",
          "id": 29
        },
        {
          "name": "Diablo 2",
          "author": "Blizzard",
          "status": "complete",
          "id": 650
        },
        {
          "name": "Counter Strike: Global Offensive",
          "author": "Valve",
          "status": "complete",
          "id": 920
        },
        {
          "name": "Chinese Cinderella",
          "author": "Cindy Giang",
          "status": "incomplete",
          "id": 459
        }
      ];
}
updateLibrary();
sortByName();




class Book {
    constructor(name, author) {
        this.name = name;
        this.author = author;
        this.status = 'incomplete';
        this.id = 0;
        this.assignId = function () {
            const arrayId = myLibrary.map(a => a.id);
            const randomId = getRandomInt(1000);
            if (arrayId.includes(randomId)) {
                this.assignId();
            }
            else {
                this.id = randomId;
            }
        };
    }
}

addItem.addEventListener ('click', addBookToLibrary);
document.getElementsByClassName('addItem').onkeyup = function(event) {
    if (event.code == 13)
    {
        addBookToLibrary();
    }
}

function addBookToLibrary(){
    if (bookIn.value == '' || authorIn.value == '') {
        return;
    }
    else {
        let book1 = new Book(bookIn.value, authorIn.value);
        book1.assignId();
        myLibrary.push(book1);
        updateLibrary();
        console.table (myLibrary);   
    }

}

function updateLibrary() {
    library.innerHTML = '';


    for (i=0; i<myLibrary.length; i++) {
        let libraryItem = document.createElement('div');
        let targetId = myLibrary[i].id;

        libraryItem.className = "libraryItem";
        libraryItem.innerHTML = `<p>${myLibrary[i].name} <p>${myLibrary[i].author}`;
        addToggleRead(libraryItem, targetId);
        addDelete(libraryItem, targetId);
        
        if (i == 0 || i % 2 == 0) {
            libraryItem.classList.add("other-line");
        }
        library.appendChild(libraryItem);

    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    updateProgress();
    updateStats();
    
}


function addToggleRead(parent, targetId) {
    let toggleRead = document.createElement('div');
    let indexId = myLibrary.findIndex (o => o.id === targetId);
    
    if (myLibrary[indexId].status == 'incomplete') {
        toggleRead.className = "incomplete";
        toggleRead.textContent = "incomplete";
    }
    else {
        toggleRead.className = "complete";
        toggleRead.textContent = "complete";
    }

    toggleRead.onclick = function() {
        
        if (myLibrary[indexId].status == 'incomplete') {
            myLibrary[indexId].status = 'complete';
        }
        else {
            myLibrary[indexId].status = 'incomplete';
        }
        console.table (myLibrary);
      
        this.textContent == 'incomplete' ? (
            this.textContent = 'complete', 
            this.classList.add('complete'),
            this.classList.remove('incomplete')
        ):( 
            this.textContent ='incomplete',
            this.classList.add('incomplete'),
            this.classList.remove('complete') 
        )
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        updateProgress();
        updateStats();        
    };
    parent.appendChild(toggleRead);
}


function addDelete(parent, targetId) {
    let deleteButton = document.createElement('div');
    deleteButton.className = "delete";
    deleteButton.textContent = 'X';
    deleteButton.onclick = function () {
        let indexId = myLibrary.findIndex (o => o.id === targetId);
        myLibrary.splice( indexId, 1 );
        updateLibrary();
        console.table (myLibrary);
    };
    parent.appendChild(deleteButton);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateProgress() {
    let current = myLibrary.filter(o => o.status == 'complete');
    progress.style.width = `${(current.length/myLibrary.length)*100}%`
}

function updateStats(){
    let current = myLibrary.filter(o => o.status == 'complete');
    stats.textContent = `Total: ${myLibrary.length}` + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + `Complete: ${current.length}` + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + ` Incomplete: ${myLibrary.length - current.length}`
}

// SORTING FUNCTIONS


sortName.addEventListener('click', sortByName);
sortAuthor.addEventListener('click', sortByAuthor);
sortStatus.addEventListener('click', sortByStatus);


function sortByName() {
    sortAuthor.classList.remove('blue');
    sortStatus.classList.remove('blue');
    sortAuthor.classList.remove('altblue');
    sortStatus.classList.remove('altblue');  

    if (sortName.className == 'blue'){
        myLibrary.sort(function(a,b) {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return (textA > textB) ? -1 : (textA < textB) ? 1: 0;
        }); 
        sortName.classList.remove('blue');
        sortName.classList.add('altblue');
    }
    else {
        myLibrary.sort(function(a,b) {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1: 0;
        });
        sortName.classList.remove('altblue');
        sortName.classList.add('blue');
    }




  

    updateLibrary();
}

function sortByAuthor() {
    
    sortName.classList.remove('blue');
    sortStatus.classList.remove('blue');
    sortName.classList.remove('altblue');
    sortStatus.classList.remove('altblue');

    if (sortAuthor.className == 'blue'){
        myLibrary.sort(function(a,b) {
            let textA = a.author.toUpperCase();
            let textB = b.author.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1: 0;
        });
        sortAuthor.classList.remove('blue');
        sortAuthor.classList.add('altblue');        
    }
    else {
        myLibrary.sort(function(a,b) {
            let textA = a.author.toUpperCase();
            let textB = b.author.toUpperCase();
            return (textA > textB) ? -1 : (textA < textB) ? 1: 0;
        });
        sortAuthor.classList.remove('altblue');
        sortAuthor.classList.add('blue');    
    }

    updateLibrary();
}

function sortByStatus() {
    
    sortName.classList.remove('blue');
    sortAuthor.classList.remove('blue');
    sortName.classList.remove('altblue');
    sortAuthor.classList.remove('altblue');

    if (sortStatus.className == 'blue'){
        myLibrary.sort(function(a,b) {
            let textA = a.status;
            let textB = b.status;
            return (textA < textB) ? -1 : (textA > textB) ? 1: 0;
        });
        sortStatus.classList.remove('blue');
        sortStatus.classList.add('altblue');    
    }
    else {
        myLibrary.sort(function(a,b) {
            let textA = a.status;
            let textB = b.status;
            return (textA > textB) ? -1 : (textA < textB) ? 1: 0;
        });
        sortStatus.classList.remove('altblue');
        sortStatus.classList.add('blue');        
    }

    updateLibrary();
}


// save slots


class librarySlot {
    constructor(obj) {
        this.obj = obj;
        this.id = 0;
        this.assignId = function () {
            const arrayId = myLibrary.map(a => a.id);
            const randomId = getRandomInt(1000);
            if (arrayId.includes(randomId)) {
                this.assignId();
            }
            else {
                this.id = randomId;
            }
        };
    }
}


addCube.addEventListener('click', addLibrarySave);

function addLibrarySave() {
    let library1 = new librarySlot(myLibrary);
    librarySaves.push(library1);
    console.log (librarySaves);
}

function addBookToLibrary(){
    if (bookIn.value == '' || authorIn.value == '') {
        return;
    }
    else {
        let book1 = new Book(bookIn.value, authorIn.value);
        book1.assignId();
        myLibrary.push(book1);
        updateLibrary();
        console.table (myLibrary);   
    }

}
