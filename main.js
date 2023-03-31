let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete");

// Empty Array To Store The Tasks

let arrayOfTasks = [];
// check if theres tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


deleteAll.addEventListener("click", function() {
    tasksDiv.innerHTML = "";

    window.localStorage.removeItem("tasks");
})



// trigger get data form local storage function
getDataFromLocalStorage();

// add Task
submit.onclick = function() {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
};
// click on task element
tasksDiv.addEventListener("click", (e) => {
    // delete button
    if (e.target.classList.contains("del")) {
        // remove element from page
        e.target.parentElement.remove();
        // remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    // task element 
    if (e.target.classList.contains("task")) {
        // toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
            // toggle done task
        e.target.classList.toggle("done");
    }
});

function addTaskToArray(taskText) {
    // task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // push task to array 
    arrayOfTasks.push(task);
    // add tasks to page
    addElementsToPageFrom(arrayOfTasks);
    // add tasks to local storage
    addDataToLocalSortageFrom(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach(task => {
        // create main div
        let div = document.createElement("div");
        div.className = "task";
        // check task is done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);

        // split task title into multiple lines if more than 25 characters
        let title = task.title;
        if (title.length > 25) {
            title = title.slice(0, 25) + "<br>" + title.slice(25);
        }

        div.innerHTML = title;

        div.appendChild(document.createTextNode(task.title));
        // create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // append button to main div
        div.appendChild(span);
        // add task div to task coontainer
        tasksDiv.appendChild(div);

    });
}

function addDataToLocalSortageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalSortageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
        }
    }
    addDataToLocalSortageFrom(arrayOfTasks);
}