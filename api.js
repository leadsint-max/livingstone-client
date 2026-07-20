const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },

    showNotification: (message, type = 'success') => {
        const note = document.createElement('div');
        note.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 25px; background: ${type === 'success' ? '#27ae60' : '#e74c3c'}; color: white; border-radius: 8px; z-index: 10000; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.1);`;
        note.textContent = message;
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 3000);
    },

    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${api.getToken()}` },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (err) {
            console.error("Fetch Error:", err);
            return { success: false, error: "Server connection failed." };
        }
    },

    get: async (endpoint) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: { 'Authorization': `Bearer ${api.getToken()}` }
        });
        return await response.json();
    },

    renderSidebar: () => {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        const path = window.location.pathname;
        
        // Context Detection
        const isStudentSection = path.includes('student') || path.includes('class') || path.includes('timetable') || path.includes('admission') || path.includes('analytics');
        const isStaffSection = path.includes('staff') || path.includes('payroll') || path.includes('teaching');
        const isFinanceSection = path.includes('fee') || path.includes('payment') || path.includes('balance') || path.includes('financial');

        let menuHtml = '';

        if (isStudentSection) {
            // FOCUS MODE: Student & Class Management
            menuHtml = `
                <li style="padding:15px 20px; background:#34495e; border-bottom:1px solid #455a64;">
                    <a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ Back to Dashboard</a>
                </li>
                <div style="padding: 20px 25px;">
                    <p style="color:#3498db; font-size:0.75rem; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">Student Management</p>
                    <ul style="list-style:none; padding:0; font-size:0.9rem;">
                        <li style="margin-bottom:12px;"><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add New Student</a></li>
                        <li style="margin-bottom:12px;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Student Directory</a></li>
                        <li style="margin-bottom:12px;"><a href="#" style="color:white; text-decoration:none;">📈 Mass Promotion</a></li>
                        <li style="margin-bottom:12px;"><a href="#" style="color:white; text-decoration:none;">🚚 Student Transfers</a></li>
                        <li style="margin-bottom:25px;"><a href="#" style="color:white; text-decoration:none;">🪪 Generate ID Cards</a></li>
                    </ul>

                    <p style="color:#27ae60; font-size:0.75rem; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">Class Management</p>
                    <ul style="list-style:none; padding:0; font-size:0.9rem;">
                        <li style="margin-bottom:12px;"><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes & Streams</a></li>
                        <li style="margin-bottom:25px;"><a href="class_management.html" style="color:white; text-decoration:none;">🏡 Manage Houses</a></li>
                    </ul>

                    <p style="color:#f1c40f; font-size:0.75rem; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">Timetable Hub</p>
                    <ul style="list-style:none; padding:0; font-size:0.9rem;">
                        <li style="margin-bottom:12px;"><a href="timetable.html" style="color:white; text-decoration:none;">📅 Class Timetables</a></li>
                        <li style="margin-bottom:12px;"><a href="timetable.html" style="color:white; text-decoration:none;">👨‍🏫 Teacher Timetables</a></li>
                        <li><a href="timetable.html" style="color:white; text-decoration:none;">📝 Exam Timetables</a></li>
                    </ul>
                </div>
            `;
        } else if (isStaffSection) {
            // FOCUS MODE: Staff & Teacher Management
            menuHtml = `
                <li style="padding:15px 20px; background:#34495e; border-bottom:1px solid #455a64;">
                    <a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ Back to Dashboard</a>
                </li>
                <div style="padding: 20px 25px;">
                    <p style="color:#3498db; font-size:0.75rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">HR & Directory</p>
                    <ul style="list-style:none; padding:0; font-size:0.9rem;">
                        <li style="margin-bottom:12px;"><a href="staff_registration.html" style="color:white; text-decoration:none;">➕ Register New Staff</a></li>
                        <li style="margin-bottom:12px;"><a href="staff_directory.html" style="color:white; text-decoration:none;">📂 Staff Directory</a></li>
                        <li style="margin-bottom:25px;"><a href="payroll.html" style="color:white; text-decoration:none;">💰 Monthly Payroll</a></li>
                    </ul>
                    <p style="color:#f1c40f; font-size:0.75rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">Academic Assigns</p>
                    <ul style="list-style:none; padding:0; font-size:0.9rem;">
                        <li style="margin-bottom:12px;"><a href="teaching_assignments.html" style="color:white; text-decoration:none;">📚 Teaching Load</a></li>
                        <li><a href="staff_attendance.html" style="color:white; text-decoration:none;">📅 Daily Attendance</a></li>
                    </ul>
                </div>
            `;
        } else {
            // MAIN DASHBOARD MODE
            menuHtml = `
                <div style="padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <h2 style="color:#3498db; margin:0; font-size: 1.2rem;">Livingstone Academy</h2>
                    <p style="font-size:0.65rem; opacity:0.6; margin:0; text-transform:uppercase;">Admin Control Panel</p>
                </div>
                <ul style="list-style:none; padding:0; margin-top:10px;">
                    <li style="padding:12px 25px; background:rgba(255,255,255,0.05);"><a href="admin_dashboard.html" style="color:white; text-decoration:none;">📊 Dashboard</a></li>
                    <li style="padding:12px 25px;"><a href="student_class_hub.html" style="color:white; text-decoration:none;">👨‍🎓 Students & Classes</a></li>
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
            `;
        }

        sidebar.innerHTML = `
            ${menuHtml}
            <div style="margin-top:auto; padding:15px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.9rem;" onclick="api.logout()">Logout 🚪</div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', api.renderSidebar);
