const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },
    showNotification: (msg, type='success') => {
        const n = document.createElement('div');
        n.style.cssText = `position:fixed; top:10px; right:10px; padding:10px 20px; background:${type==='success'?'#27ae60':'#e74c3c'}; color:white; border-radius:5px; z-index:10000; font-weight:bold; font-size:0.8rem;`;
        n.textContent = msg; document.body.appendChild(n); setTimeout(()=>n.remove(), 3000);
    },
    post: async (e, d) => {
        const r = await fetch(API_BASE_URL+e, { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+api.getToken()}, body:JSON.stringify(d)});
        return await r.json();
    },
    get: async (e) => {
        const r = await fetch(API_BASE_URL+e, { headers:{'Authorization':'Bearer '+api.getToken()}});
        return await r.json();
    },
    renderSidebar: () => {
        const sb = document.querySelector('.sidebar');
        if (!sb) return;
        
        sb.style.cssText = "width:240px; height:100vh; background:#2c3e50; color:white; position:fixed; display:flex; flex-direction:column; overflow:hidden;";

        const p = window.location.pathname;
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable');
        const isStf = p.includes('staff') || p.includes('payroll') || p.includes('teaching');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance');
        const isAcd = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject');

        let menu = '';
        if (isStd) {
            menu = `<div style="padding:15px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-size:0.8rem; font-weight:bold;">⬅ BACK TO DASHBOARD</a></div>
            <div style="padding:20px; flex-grow:1; overflow-y:auto;">
                <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">Student Hub</p>
                <ul style="list-style:none; padding:0; font-size:0.85rem;">
                    <li style="margin-bottom:12px;"><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add New Student</a></li>
                    <li style="margin-bottom:12px;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Student Directory</a></li>
                    <li style="margin-bottom:12px;"><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes & Streams</a></li>
                    <li><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetables</a></li>
                </ul>
            </div>`;
        } else if (isStf) {
            menu = `<div style="padding:15px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-size:0.8rem; font-weight:bold;">⬅ BACK TO DASHBOARD</a></div>
            <div style="padding:20px; flex-grow:1; overflow-y:auto;">
                <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">Staff & Teachers</p>
                <ul style="list-style:none; padding:0; font-size:0.85rem;">
                    <li style="margin-bottom:12px;"><a href="staff_registration.html" style="color:white; text-decoration:none;">➕ Register Staff</a></li>
                    <li style="margin-bottom:12px;"><a href="staff_directory.html" style="color:white; text-decoration:none;">📂 Staff List</a></li>
                    <li style="margin-bottom:12px;"><a href="teaching_assignments.html" style="color:white; text-decoration:none;">📚 Teaching Load</a></li>
                    <li><a href="payroll.html" style="color:white; text-decoration:none;">💰 Monthly Payroll</a></li>
                </ul>
            </div>`;
        } else if (isFin) {
            menu = `<div style="padding:15px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-size:0.8rem; font-weight:bold;">⬅ BACK TO DASHBOARD</a></div>
            <div style="padding:20px; flex-grow:1; overflow-y:auto;">
                <p style="color:#27ae60; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">Finance Hub</p>
                <ul style="list-style:none; padding:0; font-size:0.85rem;">
                    <li style="margin-bottom:12px;"><a href="fee_structure.html" style="color:white; text-decoration:none;">📋 Setup Fees</a></li>
                    <li style="margin-bottom:12px;"><a href="fee_summary.html" style="color:white; text-decoration:none;">📊 Fee Summary</a></li>
                    <li style="margin-bottom:12px;"><a href="record_payment.html" style="color:white; text-decoration:none;">💰 New Payment</a></li>
                    <li><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors List</a></li>
                </ul>
            </div>`;
        } else if (isAcd) {
            menu = `<div style="padding:15px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-size:0.8rem; font-weight:bold;">⬅ BACK TO DASHBOARD</a></div>
            <div style="padding:20px; flex-grow:1; overflow-y:auto;">
                <p style="color:#f1c40f; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">Academic Center</p>
                <ul style="list-style:none; padding:0; font-size:0.85rem;">
                    <li style="margin-bottom:12px;"><a href="mark_entry.html" style="color:white; text-decoration:none;">✍️ Enter Marks</a></li>
                    <li style="margin-bottom:12px;"><a href="subject_management.html" style="color:white; text-decoration:none;">📚 Manage Subjects</a></li>
                    <li><a href="academic_overview.html" style="color:white; text-decoration:none;">📊 Merit List</a></li>
                </ul>
            </div>`;
        } else {
            // Main Dashboard Mode
            menu = `<div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1);"><h2 style="color:#3498db; margin:0; font-size:1.1rem;">Livingstone Academy</h2></div>
            <ul style="list-style:none; padding:0; flex-grow:1; overflow-y:auto; margin:0;">
                <li style="padding:10px 20px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none; font-size:0.85rem;">📊 Dashboard</a></li>
                <li style="padding:10px 20px;"><a href="student_class_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🎓 Students</a></li>
                <li style="padding:10px 20px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🏫 Staff</a></li>
                <li style="padding:10px 20px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">💳 Finance</a></li>
                <li style="padding:10px 20px;"><a href="academic_overview.html" style="color:white; text-decoration:none; font-size:0.85rem;">📝 Academics</a></li>
                <li style="padding:10px 20px;"><a href="parents_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👪 Parents</a></li>
                <li style="padding:10px 20px;"><a href="library_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📚 Library</a></li>
                <li style="padding:10px 20px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">🚌 Logistics</a></li>
                <li style="padding:10px 20px;"><a href="inventory_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📦 Inventory</a></li>
                <li style="padding:10px 20px;"><a href="communication_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">💬 Comms</a></li>
                <li style="padding:10px 20px;"><a href="calendar_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📅 Calendar</a></li>
                <li style="padding:10px 20px;"><a href="reports_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📈 Reports</a></li>
                <li style="padding:10px 20px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">⚙️ Admin</a></li>
            </ul>`;
        }

        sb.innerHTML = `
            ${menu}
            <div style="padding:12px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.8rem; margin-top:auto;" onclick="api.logout()">Logout 🚪</div>
        `;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
