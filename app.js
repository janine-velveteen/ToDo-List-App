//Selectors
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Create Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //Create Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear input value after submission
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add("deleted");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //CHECKMARK TODO
    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            //ONLY CHECK TODOS WITH THE CLASS OF COMPLETED, AND SHOW THEM
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                //Add "!"" if it does not contain...
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
                
        }
    });
}

function saveLocalTodos(todo) {
    //Check if items are already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    
    //Check if items are already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

} 
todos.forEach(function(todo){
    //Create Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const todoLi = document.createElement('li');
    todoLi.innerText = todo;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    
    //Create Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
})

function removeLocalTodos(todo) {
    //Check if items are already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}