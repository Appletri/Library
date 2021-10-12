const library = document.querySelector(".library");
const bookIn = document.querySelector(".book");
const authorIn = document.querySelector(".author");
const progress = document.querySelector(".progress")



let myLibrary = JSON.parse(localStorage.getItem('myLibrary')); 

if (myLibrary == null) {
    myLibrary = [];
}
updateLibrary();

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
}


function addToggleRead(parent, targetId) {
    let toggleRead = document.createElement('div');
    let indexId = myLibrary.findIndex (o => o.id === targetId);
    
    if (myLibrary[indexId].status == 'incomplete') {
        toggleRead.className = "incomplete";
        toggleRead.textContent = "not read";
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
      
        this.textContent == 'not read' ? (
            this.textContent = 'complete', 
            this.classList.add('complete'),
            this.classList.remove('incomplete')
        ):( 
            this.textContent ='not read',
            this.classList.add('incomplete'),
            this.classList.remove('complete') 
        )
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        updateProgress();        
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