/**
 * Title: ToDo Class
 * Description: Controls all about ToDo view.
 * Author: Samin Yasar
 * Date: 06/August/2021
 */

export default class ToDo {
    /**
     * Controls everything about this ToDo App.
     *
     * @param {HTMLLIElement} newToDo - The new ToDo text which will be added.
     */
    constructor(newToDo) {
        this.newToDo = newToDo;
        this.todoId = Math.floor(Math.random() * (9999 - 1000) + 1000);
    }

    /**
     * Initialization of the todo app.
     *
     * @return {Object[]} - Return the existing todo list if localstorage contains any previous todo list otherwise return an empty todo list.
     */
    static init() {
        if (!localStorage.getItem("todo")) {
            // if localstorage has no todo then I'll set it a empty array.
            localStorage.setItem("todo", JSON.stringify([]));
        } else {
            // if localstorage has already a todo then I just return it.
            return JSON.parse(localStorage.getItem("todo"));
        }
    }

    /**
     * Render existing todo element.
     *
     * @param {HTMLUListElement} todoList - The parent element where the existing list element will be appended.
     * @param {Object} todo - The every single todo object.
     */
    static renderToDo(todoList, todo) {
        // set the display flex if the todo list container has any todo.
        if (window.getComputedStyle(todoList.parentNode).display !== "flex") {
            todoList.parentNode.style.display = "flex";
        }
        // render the existing todo from localstorage.
        todoList.innerHTML += `
        <li data-todo="${JSON.stringify(todo).split('"').join("'")}">
            <input type="checkbox" id="${todo.todoId}" />
            <label for="${todo.todoId}">${todo.newToDo}</label>
        </li> 
    `;
    }

    /**
     * Remove a todo from todo list.
     *
     * @param {Object} todo - The todo object which is attempt to removed.
     */
    static removeToDo(todo) {
        const existingToDo = JSON.parse(localStorage.getItem("todo"));
        // take the all todo from localstorage except the given todo object as argument.
        const updatedTodo = existingToDo.filter((el) => {
            return JSON.stringify(el) !== JSON.stringify(todo);
        });
        // finally update the localstorage without the given todo object.
        localStorage.setItem("todo", JSON.stringify(updatedTodo));
    }

    /**
     * Manipulate a new ToDo element and render it.
     *
     * @param {HTMLUListElement} parentEl - The parent element where the manipulated element will be appended.
     * @return {HTMLLIElement} - Return the manipulated list element.
     */
    addToDo(parentEl) {
        // set the display flex if the todo list container has any todo.
        if (window.getComputedStyle(parentEl.parentNode).display !== "flex") {
            parentEl.parentNode.style.display = "flex";
        }
        const list = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");

        checkbox.type = "checkbox";
        checkbox.id = this.todoId;
        label.setAttribute("for", this.todoId);
        label.textContent = this.newToDo;

        list.append(checkbox, label);
        parentEl.appendChild(list);
        return list;
    }

    /**
     * Update the browser localstorage with adding new ToDo.
     *
     * @param {Object} todo - The constructed ToDo Object for every single todo.
     */
    updateStorage(todo) {
        const existingToDo = JSON.parse(localStorage.getItem("todo"));
        existingToDo.push(todo);
        localStorage.setItem("todo", JSON.stringify(existingToDo));
    }
}
