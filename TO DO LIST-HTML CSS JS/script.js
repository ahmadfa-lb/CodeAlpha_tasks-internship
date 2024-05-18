const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter_todo");

showTasks();
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    if(todoInput.value === '')
    {
        window.alert("You can't add an empty task! 📝please write something!");
    }else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
    saveData();
}
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.remove();
        saveData();
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        saveData();
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display ="none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveData(){
    localStorage.setItem("data", todoList.innerHTML);
}

function showTasks(){
    todoList.innerHTML = localStorage.getItem("data");
}