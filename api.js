const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    
    // LOGOUT FUNCTION
    logout: () => {
        localStorage.clear();
        window.location.href = 'index.html';
    },

    // SUCCESS/ERROR NOTIFICATIONS
    showNotification: (message, type = 'success') => {
        const note = document.createElement('div');
        note.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 15px 25px; 
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'}; 
            color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000; font-weight: bold; transition: 0.5s;
        `;
        note.textContent = message;
        document.body.appendChild(note);
        setTimeout(() => { note.style.opacity = '0'; setTimeout(() => note.remove(), 500); }, 3000);
    },

    post: async (endpoint, data) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${api.getToken()}` },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    get: async (endpoint) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: { 'Authorization': `Bearer ${api.getToken()}` }
        });
        return response.json();
    },

    // SECURITY GUARD: Hide unauthorized elements
    applyPermissions: () => {
        const role = localStorage.getItem('user_role');
        if (role === 'accountant') {
            // Hide Admin-only buttons on shared pages
            const adminOnly = document.querySelectorAll('.admin-only');
            adminOnly.forEach(el => el.style.display = 'none');
            
            // Disable specific inputs
            const adminInputs = document.querySelectorAll('.admin-input');
            adminInputs.forEach(el => el.disabled = true);
        }
    }
};

// Run permission check on every page load
document.addEventListener('DOMContentLoaded', api.applyPermissions);
