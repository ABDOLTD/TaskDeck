document.addEventListener('DOMContentLoaded', () => {
    const monthList = document.getElementById('monthList');
    const monthTitle = document.getElementById('monthTitle');
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const filterAll = document.getElementById('filterAll');
    const filterCompleted = document.getElementById('filterCompleted');
    const filterPending = document.getElementById('filterPending');

    const yearlyTasks = {
        January: [],
        February: [],
        March: [],
        April: [],
        May: [],
        June: [],
        July: [],
        August: [],
        September: [],
        October: [],
        November: [],
        December: []
    };

    let currentMonth = 'January';
    let filter = 'all'; // Options: 'all', 'completed', 'pending'

    function renderTasks() {
        taskList.innerHTML = '';

        yearlyTasks[currentMonth]
            .filter(task => {
                if (filter === 'completed') return task.completed;
                if (filter === 'pending') return !task.completed;
                return true;
            })
            .forEach((task, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-3';
                col.innerHTML = `
                    <div class="card ${task.completed ? 'completed' : 'pending'}">
                        <div class="card-body">
                            <h5 class="card-title">${task.name}</h5>
                            <p class="card-text">${task.description}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-sm ${
                                    task.completed ? 'btn-warning' : 'btn-success'
                                }" onclick="toggleTask(${index})">
                                    ${task.completed ? 'Mark Pending' : 'Mark Completed'}
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                taskList.appendChild(col);
            });
    }

    function setActiveMonth(month) {
        currentMonth = month;
        monthTitle.textContent = month;
        document.querySelector('.nav-link.active')?.classList.remove('active');
        document.querySelector(`[data-month="${month}"]`).classList.add('active');
        renderTasks();
    }

    addTaskButton.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        const taskDescription = descriptionInput.value.trim();
        if (taskName) {
            yearlyTasks[currentMonth].push({ name: taskName, description: taskDescription, completed: false });
            taskInput.value = '';
            descriptionInput.value = '';
            renderTasks();
        }
    });

    monthList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            setActiveMonth(e.target.getAttribute('data-month'));
        }
    });

    filterAll.addEventListener('click', () => {
        filter = 'all';
        renderTasks();
    });

    filterCompleted.addEventListener('click', () => {
        filter = 'completed';
        renderTasks();
    });

    filterPending.addEventListener('click', () => {
        filter = 'pending';
        renderTasks();
    });

    window.toggleTask = function (index) {
        yearlyTasks[currentMonth][index].completed = !yearlyTasks[currentMonth][index].completed;
        renderTasks();
    };

    window.deleteTask = function (index) {
        yearlyTasks[currentMonth].splice(index, 1);
        renderTasks();
    };

    setActiveMonth(currentMonth);
});
