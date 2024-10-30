// Select DOM elements
const addTask = document.querySelector('#add_one');
const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const todoList = document.getElementById("todo_list"); // To Do list
const progressList = document.getElementById("in_progress_list"); // In Progress list
const doneList = document.getElementById("done_list"); // Done list
const todoCounter = document.getElementById("todo_counter");
const progressCounter = document.getElementById("progress_counter");
const doneCounter = document.getElementById("done_counter");

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

// Apply hover effect to all existing tasks
document.querySelectorAll('li').forEach(addHoverEffect);

// Cancel button to close the modal
document.getElementById('cancel_btn').addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    container.classList.remove('blur');
});

addTask.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    container.classList.add('blur');
});

// Function to update all counters
function updateCounters() {
    todoCounter.textContent = todoList.querySelectorAll('li').length;
    progressCounter.textContent = progressList.querySelectorAll('li').length;
    doneCounter.textContent = doneList.querySelectorAll('li').length;
}

// Event delegation for handling trash icon clicks
container.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash')) {
        // Remove the task
        const listItem = event.target.closest('li');
        const parentList = listItem.parentElement;

        // Remove the list item
        listItem.remove();
        
        // Update counters after removal
        updateCounters();
    }
});

// Add new task when the submit button is clicked
document.getElementById("submit_btn").addEventListener("click", function(event) {
    event.preventDefault();

    // Get form values
    const title = document.getElementById("title_add").value.trim();
    const description = document.getElementById("message").value.trim();
    const priority = document.getElementById("priority").value; // Get the selected priority
    const status = document.getElementById("status").value;

    // Validate input fields
    if (!title || !description || priority === "" || status === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Determine the priority class
    let priorityClass;
    if (priority === "P1") {
        priorityClass = "priority-p1"; // Corresponding class for priority P1
    } else if (priority === "P2") {
        priorityClass = "priority-p2"; // Corresponding class for priority P2
    } else if (priority === "P3") {
        priorityClass = "priority-p3"; // Corresponding class for priority P3
    }

    // Create a new list item with the selected priority class
    const newItem = document.createElement("li");
    newItem.classList.add("task-item", priorityClass);
    newItem.innerHTML = `
        <h4>${title}</h4>
        <p class="description hidden">${description}</p>
        <div class="app_footer">
            <p id="date">${new Date().toLocaleDateString()}</p>
            <span class="del_edi">
                <i class="fa-solid fa-trash" style="color: #000000;"></i>
                <i class="fa-solid fa-pen-to-square" style="color: #000000;"></i>
            </span>
        </div>
    `;

    // Append the new item to the appropriate list based on the status
    if (status === "Todo") {
        todoList.appendChild(newItem);
    } else if (status === "In progress") {
        progressList.appendChild(newItem);
    } else if (status === "Done") {
        doneList.appendChild(newItem);
    }

    // Add hover effect to new task
    addHoverEffect(newItem);

    // Update counters
    updateCounters();

    // Reset form fields and close modal
    document.getElementById("modalForm").reset();
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    container.classList.remove('blur');
});

// Initial call to set task counts
updateCounters();
