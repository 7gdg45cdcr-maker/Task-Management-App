const API_URL = 'http://localhost:5000/api';

let currentUser = null;
let token = null;

function checkAuth() {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
        token = savedToken;
        currentUser = JSON.parse(savedUser);
        showTaskManager();
        loadTasks();
    }
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('task-manager').style.display = 'none';
}

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('task-manager').style.display = 'none';
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            token = data.token;
            currentUser = data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(currentUser));
            showTaskManager();
            loadTasks();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            token = data.token;
            currentUser = data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(currentUser));
            showTaskManager();
            loadTasks();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token = null;
    currentUser = null;
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('task-manager').style.display = 'none';
    document.getElementById('auth-buttons').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
}

function showTaskManager() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('task-manager').style.display = 'block';
    document.getElementById('auth-buttons').style.display = 'none';
    document.getElementById('user-info').style.display = 'flex';
    document.getElementById('username-display').textContent = currentUser.username;
}

document.addEventListener('DOMContentLoaded', checkAuth);