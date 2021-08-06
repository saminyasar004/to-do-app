/**
 * Title: App.js
 * Description: entry point for this todo app
 * Author: Samin Yasar
 * Date: 06/August/2021
 */

// Dependencies
import ToDo from "./helper/ToDo.js";

// DOM Selecting
const formContainer = document.getElementById("form-container");
const newInputedtodo = document.getElementById("new-task");
const todoList = document.querySelector(".to-do-incomplete-list ul");
const errorContainer = document.getElementById("error-container");

const existingToDo = ToDo.init() || [];

existingToDo.forEach((todo) => {
    ToDo.renderToDo(todoList, todo);
});

formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    if (newInputedtodo.value.trim() !== "") {
        errorContainer.textContent = "";
        const newTodo = new ToDo(newInputedtodo.value.trim());
        newInputedtodo.value = "";
        newTodo.addToDo(todoList);
        newTodo.updateStorage(newTodo);
        console.log(newTodo);
    } else {
        errorContainer.textContent = "ToDo is empty!";
    }
});

[...todoList.querySelectorAll("li")].forEach((list) => {
    list.querySelector("*").addEventListener("click", (e) => {
        ToDo.removeToDo(JSON.parse(list.dataset.todo.split("'").join('"')));
        list.remove();
        if (todoList.children.length <= 1) {
            todoList.parentNode.style.display = "none";
        }
    });
});
