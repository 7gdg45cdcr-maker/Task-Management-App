async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        alert('Error loading tasks: ' + error.message);
    }
}

function displayTasks(tasks) {
    const container = document.getElementById('task-list');
    
    if (!tasks || tasks.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#636e72;">No tasks yet. Add your first task!</p>';
        return;
    }
    
    container.innerHTML = tasks.map(task => `
        <div class="task-card priority-${task.priority} ${task.status === 'completed' ? 'status-completed' : ''}">
            <div class="title">${task.title}</div>
            <div class="description">${task.description || ''}</div>
            <div class="meta">
                <span>Status: ${task.status}</span>
                <span>Priority: ${task.priority}</span>
                ${task.dueDate ? `<span>Due: ${new Date(task.dueDate).toLocaleDateString()}</span>` : ''}
                <span>Created: ${new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="editTask('${task._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function showAddTask() {
    document.getElementById('task-form').style.display = 'block';
    document.getElementById('task-form').scrollIntoView({ behavior: 'smooth' });
}

function cancelAddTask() {
    document.getElementById('task-form').style.display = 'none';
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
}

async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;
    const status = document.getElementById('task-status').value;
    const dueDate = document.getElementById('task-due').value;
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, priority, status, dueDate })
        });
        
        if (response.ok) {
            cancelAddTask();
            loadTasks();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to add task');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function editTask(id) {
    const newTitle = prompt('Enter new title:');
    if (newTitle) {
        updateTask(id, { title: newTitle });
    }
}

async function updateTask(id, updates) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        });
        
        if (response.ok) {
            loadTasks();
        } else {
            alert('Failed to update task');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            loadTasks();
        } else {
            alert('Failed to delete task');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}