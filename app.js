// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const talkList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit', addTask);
    talkList.addEventListener('click',removeTask);
    filter.addEventListener('keyup',filterTasks);
    clearBtn.addEventListener('click', clearTasks);
}

// Get Tasks
function getTasks(e){
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        talkList.appendChild(li);
    })

}

// Add Task
function addTask(e) {
   if(taskInput.value === '') {
    alert('Add a task');
   }
   else {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        talkList.appendChild(li);

        storeTaskInStorage(taskInput.value);

        taskInput.value = "";

   }
    e.preventDefault();
}

// Store Value in Local Storage
function storeTaskInStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if(confirm("Are you sure?")){
            const task = e.target.parentElement.parentElement;
            removeTaskFromStorage(task.innerText);
            task.remove();
        }
    }

    e.preventDefault();
}

// Remove Task From Local Storage
function removeTaskFromStorage(task){
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.pop(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Tasks
function clearTasks(e) {
    
    if (confirm("Are you sure you want to clear this list?")){
        while(talkList.firstChild) {
            talkList.removeChild(talkList.firstChild);
        }
        localStorage.clear();
    }

    e.preventDefault();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().includes(text)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });


    e.preventDefault();
}