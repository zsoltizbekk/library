const container = document.querySelector(".container");
let formDiv = document.createElement("div");
let cardDiv;
let delBtn;
let readBtn;
let addDiv = document.createElement("div");

let myLibrary = [];
let num = -1;

function createForm() {
    //delete add button
    container.removeChild(addDiv);
    
    formDiv.className = "formDiv";
    formDiv.id = num;
    formDiv.innerHTML = `<form>
                            <input type="text" id="title" placeholder="Title" required><br>
                            <input type="text" id="author" placeholder="Author" required><br>
                            <input type="number" id="page" placeholder="Page" required><br>
                            <label for="read">Read: </label>
                            <input type="checkbox" id="read" class="checkboxClass"><br>
                            <input class="btn" type="submit" value="OK">
                        </form>`
    container.appendChild(formDiv);
}

function createCard() {
    //delete the old form
    container.innerHTML = "";
    //create new card with the form informations
    for (let i = 0; i <= num; i++){
        cardDiv = document.createElement("div");
        cardDiv.className = "cardDiv";

        if (myLibrary[i].read){
            cardDiv.innerHTML = `   <div>Title: ${myLibrary[i].title}</div>
                                    <div>Author: ${myLibrary[i].author}</div>
                                    <div>Page: ${myLibrary[i].page}</div>
                                    <div>Already read.</div>
                                    <div><button class="deleteBtn${i}">Delete</button></div>
                                    <div><button class="readBtn${i}">Not read</button></div>`;
        } else {
            cardDiv.innerHTML = `   <div>Title: ${myLibrary[i].title}</div>
                                    <div>Author: ${myLibrary[i].author}</div>
                                    <div>Page: ${myLibrary[i].page}</div>
                                    <div>Not read yet. :(</div>
                                    <div><button class="deleteBtn${i}">Delete</button></div>
                                    <div><button class="readBtn${i}">Read</button></div>`;
            cardDiv.style.backgroundColor = '#f1b4a9';
        }
        container.appendChild(cardDiv);

        delBtn = document.querySelector(`.deleteBtn${i}`);
        delBtn.addEventListener("click", function(){
            myLibrary.splice(i, 1);
            num--;
            createCard();
        });
        readBtn = document.querySelector(`.readBtn${i}`);
        readBtn.addEventListener("click", function(){
            if (myLibrary[i].read){
                myLibrary[i].read = false;
                createCard();
            } else {
                myLibrary[i].read = true;
                createCard();
            }
        });
    }
    //make new add button
    addDiv.className = "addDiv";
    addDiv.innerHTML = `<button class="addDiv">+</button>`;
    container.appendChild(addDiv);
    //--
}

function addLibrary() {
    createForm();

    let submitBtn = document.querySelector(".btn");
    submitBtn.addEventListener("click", function(){
        console.log(formDiv);
        if (document.getElementById("title").value == ""){
            document.getElementById("title").style.border = '1px solid red';
        } else document.getElementById("title").style.border = 'none';
        if (document.getElementById("author").value == ""){
            document.getElementById("author").style.border = '1px solid red';
        } else document.getElementById("author").style.border = 'none';
        if (document.getElementById("page").value == ""){
            document.getElementById("page").style.border = '1px solid red';
        } else document.getElementById("page").style.border = 'none';
        if (document.getElementById("title").value != "" &&
        document.getElementById("author").value != "" &&
        document.getElementById("page").value != "") {
            myLibrary[num] = new Book (document.getElementById("title").value, 
                                 document.getElementById("author").value,
                                 document.getElementById("page").value,
                                 document.getElementById("read").checked) 
        createCard();
        }
    });
    
}

// function Book(title, author, page, read) { //constructor
//     this.title = title;
//     this.author = author;
//     this.page = page;
//     this.read = read;
//     this.info = function(){
//         return title + " " + author;
//     }
// }

class Book{ //class
    constructor(title, author, page, read){
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = read;
    }
    read = function(){
        return this.title + " " + this.author;
    }
}

addDiv.className = "addDiv";
addDiv.innerHTML = `<button class="addDiv">+</button>`;
container.appendChild(addDiv);
const addButton = document.querySelector(".addDiv");

addButton.addEventListener("click", function(){
    num++;
    if (num==myLibrary.length){
        addLibrary();
    } else {num--;}
});
