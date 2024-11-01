// Data
const tasks = [
    {
        id: 0,
        title: "amrabet",
        priority: "P3",
        status: "Todo",
        dueDate: "04/12/2024",
        description: "this is the description"
    },
    {
        id: 1,
        title: "web",
        priority: "P2",
        status: "Todo",
        dueDate: "12/24/2024", 
        description: "this is the description"
    },
    {
        id: 2,
        title: "loop",
        priority: "P1",
        status: "In progress",
        dueDate: "03/03/2020",
        description: "this is the description"
    },
    {
        id: 3,
        title: "task brook",
        priority: "P1",
        status: "In progress",
        dueDate: "03/13/2024",
        description: "this is the description"
    },
    {
        id: 4,
        title: "gym",
        priority: "P3",
        status: "In progress",
        dueDate: "07/05/2024",
        description: "this is the description"
    },
    {
        id: 5,
        title: "change icons",
        priority: "P2",
        status: "Done",
        dueDate: "01/23/2028",
        description: "this is the description"
    }
];

// Select DOM elements
const addTask = document.querySelector('#add_one');
const container = document.querySelector('.container');
const updateModal = document.querySelector('.task-modal');
const modal = document.querySelector('.modal');
const todoList = document.getElementById("todo_list");
const progressList = document.getElementById("in_progress_list");
const doneList = document.getElementById("done_list");
const todoCounter = document.getElementById("todo_counter");
const progressCounter = document.getElementById("progress_counter");
const doneCounter = document.getElementById("done_counter");

// show the modal (add task)

addTask.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    container.classList.add('blur');
})
const cancel_add = document.getElementById('cancel_btn');
cancel_add.addEventListener('click', ()=> {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    container.classList.remove('blur');
});


// Function to create a new task item
function createTaskItem(task) {
    const newItem = document.createElement("li");
    newItem.classList.add("task-item", `priority-${task.priority}`);
    newItem.innerHTML = `
        <h4>${task.title}</h4>
        <p class="description hidden">${task.description}</p>
        <div class="app_footer">
            <p id="date">${task.dueDate}</p>
            <span class="del_edi">
                <i class="fa-solid fa-trash" style="color: #000000;"></i>
                <i data-id="${task.id}" class="fa-solid fa-pen-to-square" style="color: #000000;"></i>
            </span>
        </div>
    `;
    addHoverEffect(newItem);
    return newItem;
}

// Function to add hover effects to show/hide descriptions
function addHoverEffect(listItem) {
    listItem.addEventListener('mouseover', () => {
        const descr = listItem.querySelector('.description');
        descr.classList.remove('hidden');
    });
    listItem.addEventListener('mouseout', () => {
        const descr = listItem.querySelector('.description');
        descr.classList.add('hidden');
    });
}

// Function to update all counters
function updateCounters() {
    todoCounter.textContent = todoList.querySelectorAll('li').length;
    progressCounter.textContent = progressList.querySelectorAll('li').length;
    doneCounter.textContent = doneList.querySelectorAll('li').length;
}

// Add tasks to the DOM initially
tasks.forEach(task => {
    const newItem = createTaskItem(task);
    if (task.status === "Todo") {
        todoList.appendChild(newItem);
    } else if (task.status === "In progress") {
        progressList.appendChild(newItem);
    } else if (task.status === "Done") {
        doneList.appendChild(newItem);
    }
});

// Event delegation for handling trash icon clicks
container.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash')) {
        const listItem = event.target.closest('li');
        listItem.remove();
        updateCounters();
        alert("Task deleted successfully!"); // User feedback
    }
});

// Add new task when the submit button is clicked
document.getElementById("submit_btn").addEventListener("click", function(event) {
    event.preventDefault();

    const title = document.getElementById("title_add").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value; 
    const status = document.getElementById("status").value;
    const dueDate = document.getElementById("due_date").value.trim();

    // Validate input fields
    if (!title || !description || priority === "" || status === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Create a new task object
    const newTask = {
        id: tasks.length,
        title,
        priority,
        status,
        dueDate,
        description
    };

    tasks.push(newTask);
    console.log(newTask);

    // Create a new list item and append it
    const newItem = createTaskItem(newTask);
    if (status === "Todo") {
        todoList.appendChild(newItem);
    } else if (status === "In progress") {
        progressList.appendChild(newItem);
    } else if (status === "Done") {
        doneList.appendChild(newItem);
    }

    updateCounters();
    alert("Task added successfully!"); // User feedback
    createTaskItem(newTask);

    document.getElementById("modalForm").reset();
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    container.classList.remove('blur');
});

// Helper function to validate dates
function isValidDate(dateString) {
    const dateParts = dateString.split('/');
    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}

// Initial call to set task counts
updateCounters();

// update task

// Event delegation for handling edit icon clicks
let itemId;
container.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-pen-to-square')) {
        
        // show modal update
        updateModal.classList.remove('hidden');
        updateModal.classList.add('flex');
        container.classList.add('blur');
        
        // Get the specific item ID
        itemId = parseInt(event.target.dataset.id, 10);
        console.log('Editing item with ID:', itemId); // Debugging line to see if we have the correct ID
     
        const taskToEdit =  tasks.find(task => task.id === itemId);
        if(taskToEdit) {
            document.getElementById("description_update").value = taskToEdit.description;
            document.getElementById("priority_update").value = taskToEdit.priority;
            document.getElementById("due_date_update").value = taskToEdit.dueDate;
        }
   
}
});

const update_btn = document.getElementById('submit_btn_update');
update_btn.addEventListener('click', function(event) {
    
   const description = document.getElementById("description_update").value.trim();
   const priority = document.getElementById("priority_update").value; 
   const dueDate = document.getElementById("due_date_update").value;
   

   const listItem = event.target.closest('li');
    listItem.remove();
   if(!description || !priority || !dueDate){
    alert('please fill out all fialds ');
    return;
   }

//    finde and update specific task
const taskToUpdate =  tasks.find(task => task.id === itemId);

if(taskToUpdate){
    taskToUpdate.description = description;
    taskToUpdate.priority = priority;
    taskToUpdate.dueDate = dueDate;

     // Re-render task item in the DOM
     const updatedItem = createTaskItem(taskToUpdate); // Creates the updated DOM element
     const listItem = document.querySelector(`[data-id="${itemId}"]`); // Find the existing item in DOM
     listItem.replaceWith(updatedItem); // Replace the old item with the updated one
     updateCounters(); // Update counters

}

    
// hide the modal 
    updateModal.classList.add('hidden');
    updateModal.classList.remove('flex');
    container.classList.remove('blur');

    console.log(tasks);

} );

 // hidde modal update
 const cancel_btn_update = document.getElementById('cancel_btn_update');
 cancel_btn_update.addEventListener('click', () => {

 updateModal.classList.add('hidden');
 updateModal.classList.remove('flex');
 container.classList.remove('blur');
 });