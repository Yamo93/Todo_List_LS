/**
 * 1. Create a function for changing items
 * 2. Create a function for adding items
 * 3. Create a function for "finishing tasks"
 * 4. Create a function for deleting items
 * 
 * 
 * - You need a data structure. And in that data structure, you will add the task and the ID. Then all the IDs have to be processed. And from that you can render the UI.
 * The data structure will help your UI, and it's essential for the local storage
 */

let DOMstrings = {
    todoList: document.querySelector('.todo__list'),
    listItems: Array.from(document.querySelectorAll('.todo__list-item')),
    itemBtns: Array.from(document.querySelectorAll('.todo__list-item--btn')),
    removeBtns: Array.from(document.querySelectorAll('.todo__list-item--removebtn')),
    addBtn: document.querySelector('.todo__add-btn'),
    input: document.getElementById('todo__value')
};

let dataTasks = [];

class Task {
    constructor (task, ID) {
        this.task = task;
        this.ID = ID;
    }
}

// Resetting all the items:
DOMstrings.todoList.innerHTML = '';

function addItem(task) {
    let newItem, ID, tasks;

    if (dataTasks.length > 0) {
        console.log('dataTasks has grown!');
        ID = dataTasks.length;
    } else {
        ID = 0;
    }

    newItem = new Task(task, ID);
    dataTasks.push(newItem);

    console.log(`New task is: ${newItem.task}`);
    localStorage.setItem('tasks', JSON.stringify(dataTasks));

    return ID;
}

function readStorage() {
    const storage = JSON.parse(localStorage.getItem('tasks'));

    if (storage) dataTasks = storage;
    console.log(storage);
    return storage;
};

window.addEventListener('load', event => {
    // This should not be read every time the page reloads. Because the tasks will only be the ones saved before reload. I.e: the previous reload-tasks will be gone every reload.
    let newStorage = readStorage();


    newStorage.forEach(elem => {
        let markup = `
        <li class="todo__list-item" id="${elem.ID}">
            <div class="todo__list-item--btn">&#10003;</div>
            ${elem.task}
            <div class="todo__list-item--removebtn">&times;</div>
        </li>
        `;
        DOMstrings.todoList.insertAdjacentHTML('beforeend', markup);
    });

});


// Adding Item
DOMstrings.addBtn.addEventListener('click', event => {
    let value, newID;
    value = DOMstrings.input.value;
    newID = addItem(value);
    let markup = `
        <li class="todo__list-item" id="${newID}">
            <div class="todo__list-item--btn">&#10003;</div>
            ${value}
            <div class="todo__list-item--removebtn">&times;</div>
        </li>
        `;
        DOMstrings.todoList.insertAdjacentHTML('beforeend', markup);
        DOMstrings.input.value = '';

        console.log(dataTasks);

});

window.addEventListener('keypress', event => {
    let value;

    if (event.keyCode === 13) {
        value = DOMstrings.input.value;
        //console.log(addItem(value));
        let markup = `
        <li class="todo__list-item" id="${addItem(value)}">
            <div class="todo__list-item--btn">&#10003;</div>
            ${value}
            <div class="todo__list-item--removebtn">&times;</div>
        </li>
        `;
        DOMstrings.todoList.insertAdjacentHTML('beforeend', markup);
        DOMstrings.input.value = '';
        }
});

window.addEventListener('click', event => {

        if (event.target.matches('.todo__list-item--removebtn, .todo__list-item--removebtn *')) {
            let item = event.target.parentNode;
            if (item) item.parentNode.removeChild(item);

            // use setItem and overwrite the old array
            //console.log(`The desired task to remove: ${dataTasks.indexOf(item.textContent)}`);
            console.log(localStorage);
            console.log('The item.id is: ' + item.id);
            // Read data from storage
            let oldStorage = JSON.parse(localStorage.getItem('tasks'));
            let ids = [];

            /**
             * You can't simply remove an element through its index. Because if you remove the 2nd, then the order will be interrupted.
             * Instead, try to search for the specific element of your oldStorage-array by indexOf.
             */

            let removeIndex = oldStorage.findIndex(obj => obj.ID == item.id);
            console.log('The removeIndex is: ' + removeIndex + 'Its type is: ' + typeof removeIndex);
            oldStorage.splice(removeIndex, 1);
            
            /*
            oldStorage.forEach(obj => {
                ids.push(obj.ID);
            });*/

            // Splice it out
            //oldStorage.splice(ids.indexOf(item.id), 1);

            if (oldStorage.length === 1) {
                //oldStorage.splice(oldStorage.length-1, 1);
                localStorage.removeItem('tasks');
            }

            // Turn it back and prepare for new storage
            localStorage.setItem('tasks', JSON.stringify(oldStorage));

            //localStorage.setItem('tasks', JSON.stringify(dataTasks));

        }

        if (event.target.matches('.todo__list-item--btn, .todo__list-item--btn *')) {
            let ticked = event.target;
            ticked.classList.toggle('ticked');
            let parent = event.target.parentNode;
            parent.classList.toggle('stroke');
        }

    });




function removeBtn() {
    DOMstrings.removeBtns.forEach(elem => {
        elem.addEventListener('click', event => {
            let item = event.target.parentNode;
            //console.log(item);
            item.parentNode.removeChild(item);
        });
    });

}

removeBtn();

