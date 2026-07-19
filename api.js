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
        
        // Detection Logic
        const isStudentSection = path.includes('student') || path.includes('class') || path.includes('timetable') || path.includes('admission');
        const isStaffSection = path.includes('staff') || path.includes('payroll') || path.includes('teaching');

        sidebar.innerHTML = `
            <div style="padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <h2 style="color:#3498db; margin:0; font-size: 1.2rem;">Livingstone Academy</h2>
                <p style="font-size:0.65rem; opacity:0.6; margin:0; text-transform:uppercase; letter-spacing:1px;">Management System</p>
            </div>
            <ul style="list-style:none; padding:0; margin-top:10px; flex-grow:1; overflow-y:auto;">
                <li style="padding:12px 20px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none; display:flex; align-items:center; gap:10px;">📊 <span>Dashboard</span></a></li>
                
                <!-- 1. STUDENTS, CLASSES & TIMETABLE -->
                <li style="padding:12px 20px; ${isStudentSection ? 'background:#34495e; border-left: 4px solid #3498db;' : ''}">
                    <a href="student_class_hub.html" style="color:white; text-decoration:none; display:flex; align-items:center; gap:10px;">👨‍🎓 <span>Students & Classes</span></a>
                    ${isStudentSection ? `
                        <div style="padding-left:25px; margin-top:15px;">
                            <p style="font-size:0.7rem; color:#3498db; margin:10px 0 5px; font-weight:bold; text-transform:uppercase;">Student Management</p>
                            <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7;">
                                <li style="margin-bottom:8px;"><a href="student_admission.html" style="color:inherit; text-decoration:none;">● Add/Edit Students</a></li>
                                <li style="margin-bottom:8px;"><a href="student_list.html" style="color:inherit; text-decoration:none;">● Student Directory</a></li>
                                <li style="margin-bottom:8px;"><a href="#" style="color:inherit; text-decoration:none;">● Mass Promotion</a></li>
                                <li style="margin-bottom:8px;"><a href="#" style="color:inherit; text-decoration:none;">● Student Transfers</a></li>
                                <li style="margin-bottom:8px;"><a href="#" style="color:inherit; text-decoration:none;">● Generate ID Cards</a></li>
                            </ul>
                            
                            <p style="font-size:0.7rem; color:#3498db; margin:15px 0 5px; font-weight:bold; text-transform:uppercase;">Class Management</p>
                            <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7;">
                                <li style="margin-bottom:8px;"><a href="class_management.html" style="color:inherit; text-decoration:none;">● Classes & Streams</a></li>
                                <li style="margin-bottom:8px;"><a href="class_management.html" style="color:inherit; text-decoration:none;">● Manage Houses</a></li>
                            </ul>

                            <p style="font-size:0.7rem; color:#3498db; margin:15px 0 5px; font-weight:bold; text-transform:uppercase;">Timetable</p>
                            <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7;">
                                <li style="margin-bottom:8px;"><a href="timetable.html" style="color:inherit; text-decoration:none;">● Class Timetables</a></li>
                                <li style="margin-bottom:8px;"><a href="timetable.html" style="color:inherit; text-decoration:none;">● Teacher Timetables</a></li>
                                <li style="margin-bottom:8px;"><a href="timetable.html" style="color:inherit; text-decoration:none;">● Exam Timetables</a></li>
                            </ul>
                        </div>
                    ` : ''}
                </li>

                <!-- 2. STAFF & TEACHERS -->
                <li style="padding:12px 20px; ${isStaffSection ? 'background:#34495e; border-left: 4px solid #3498db;' : ''}">
                    <a href="staff_teacher_hub.html" style="color:white; text-decoration:none; display:flex; align-items:center; gap:10px;">👨‍🏫 <span>Staff & Teachers</span></a>
                </li>

                <!-- REST OF THE MENU -->
                <li style="padding:12px 20px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none;">💳 Fees & Accounts</a></li>
                <li style="padding:12px 20px;"><a href="academic_overview.html" style="color:white; text-decoration:none;">📝 Academics</a></li>
                <li style="padding:12px 20px;"><a href="parents_hub.html" style="color:white; text-decoration:none;">👪 Parents</a></li>
                <li style="padding:12px 20px;"><a href="library_hub.html" style="color:white; text-decoration:none;">📚 Library</a></li>
                <li style="padding:12px 20px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none;">🚌 Logistics</a></li>
                <li style="padding:12px 20px;"><a href="inventory_hub.html" style="color:white; text-decoration:none;">📦 Inventory</a></li>
                <li style="padding:12px 20px;"><a href="communication_hub.html" style="color:white; text-decoration:none;">💬 Communication</a></li>
                <li style="padding:12px 20px;"><a href="calendar_hub.html" style="color:white; text-decoration:none;">📅 Calendar</a></li>
                <li style="padding:12px 20px;"><a href="reports_hub.html" style="color:white; text-decoration:none;">📈 Reports</a></li>
                <li style="padding:12px 20px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none;">⚙️ System Admin</a></li>
            </ul>
            <div style="padding:15px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.9rem;" onclick="api.logout()">Logout 🚪</div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', api.renderSidebar);
