const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },

    showNotification: (message, type = 'success') => {
        const note = document.createElement('div');
        note.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 25px; background: ${type === 'success' ? '#27ae60' : '#e74c3c'}; color: white; border-radius: 8px; z-index: 10000; font-weight: bold;`;
        note.textContent = message;
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 3000);
    },

    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: { 'Authorization': `Bearer ${api.getToken()}` }
            });
            return await response.json();
        } catch (err) {
            console.error("API Get Error:", err);
            throw err;
        }
    },

    post: async (endpoint, data) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${api.getToken()}` },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    // AUTOMATIC SIDEBAR INJECTOR
    renderSidebar: () => {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        sidebar.innerHTML = `
            <div style="padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <h2 style="color:#3498db; margin:0;">Livingstone</h2>
                <p style="font-size:0.7rem; opacity:0.6; margin:0;">Academy Admin</p>
            </div>
            <ul style="list-style:none; padding:0; margin-top:20px; flex-grow:1; overflow-y:auto;">
                <li style="padding:12px 25px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none;">📊 Dashboard</a></li>
                <li style="padding:12px 25px; background: rgba(255,255,255,0.1); border-left: 4px solid #3498db;">
                    <a href="student_class_hub.html" style="color:white; text-decoration:none;">👨‍🎓 Students & Classes</a>
                    <ul style="list-style:none; padding:10px 0 0 15px; font-size:0.8rem; opacity:0.8;">
                        <li><a href="student_list.html" style="color:white; text-decoration:none;">● View Directory</a></li>
                        <li><a href="student_admission.html" style="color:white; text-decoration:none;">● Add & Edit</a></li>
                        <li><a href="#" style="color:white; text-decoration:none;">● Mass Promotion</a></li>
                        <li><a href="#" style="color:white; text-decoration:none;">● Generate IDs</a></li>
                    </ul>
                </li>
                <li style="padding:12px 25px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none;">👨‍🏫 Staff & Teachers</a></li>
                <li style="padding:12px 25px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none;">💳 Fees & Accounts</a></li>
                <li style="padding:12px 25px;"><a href="academic_overview.html" style="color:white; text-decoration:none;">📝 Academics</a></li>
                <li style="padding:12px 25px;"><a href="parents_hub.html" style="color:white; text-decoration:none;">👪 Parents</a></li>
                <li style="padding:12px 25px;"><a href="library_hub.html" style="color:white; text-decoration:none;">📚 Library</a></li>
                <li style="padding:12px 25px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none;">🚌 Logistics</a></li>
                <li style="padding:12px 25px;"><a href="inventory_hub.html" style="color:white; text-decoration:none;">📦 Inventory</a></li>
                <li style="padding:12px 25px;"><a href="communication_hub.html" style="color:white; text-decoration:none;">💬 Communication</a></li>
                <li style="padding:12px 25px;"><a href="calendar_hub.html" style="color:white; text-decoration:none;">📅 Calendar</a></li>
                <li style="padding:12px 25px;"><a href="reports_hub.html" style="color:white; text-decoration:none;">📈 Reports</a></li>
                <li style="padding:12px 25px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none;">⚙️ System Admin</a></li>
            </ul>
            <div style="padding:20px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white;" onclick="api.logout()">🚪 Logout</div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', api.renderSidebar);
