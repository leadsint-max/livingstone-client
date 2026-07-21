const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },
    showNotification: (msg, type='success') => {
        const n = document.createElement('div');
        n.style.cssText = `position:fixed; top:20px; right:20px; padding:15px 25px; background:${type==='success'?'#27ae60':'#e74c3c'}; color:white; border-radius:8px; z-index:10000; font-weight:bold;`;
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
        const p = window.location.pathname;
        const isStudent = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable');
        const isStaff = p.includes('staff') || p.includes('payroll') || p.includes('teaching');
        const isFinance = p.includes('fee') || p.includes('payment') || p.includes('balance');
        const isAcademic = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject');

        let menu = '';
        if (isStudent) {
            menu = `<li style="padding:15px 20px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ Back</a></li>
            <div style="padding:20px;"><p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">Students</p>
            <ul style="list-style:none; padding:0; font-size:0.9rem; color:#bdc3c7;">
                <li><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add Student</a></li>
                <li style="margin:10px 0;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Directory</a></li>
                <li><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes</a></li>
                <li style="margin:10px 0;"><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetable</a></li>
            </ul></div>`;
        } else if (isStaff) {
            menu = `<li style="padding:15px 20px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ Back</a></li>
            <div style="padding:20px;"><p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">Staff & HR</p>
            <ul style="list-style:none; padding:0; font-size:0.9rem; color:#bdc3c7;">
                <li><a href="staff_registration.html" style="color:white; text-decoration:none;">➕ Hire Staff</a></li>
                <li style="margin:10px 0;"><a href="staff_directory.html" style="color:white; text-decoration:none;">📂 Staff List</a></li>
                <li><a href="payroll.html" style="color:white; text-decoration:none;">💰 Payroll</a></li>
            </ul></div>`;
        } else if (isFinance) {
            menu = `<li style="padding:15px 20px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ Back</a></li>
            <div style="padding:20px;"><p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">Finance</p>
            <ul style="list-style:none; padding:0; font-size:0.9rem; color:#bdc3c7;">
                <li><a href="fee_structure.html" style="color:white; text-decoration:none;">📋 Fee Setup</a></li>
                <li style="margin:10px 0;"><a href="fee_summary.html" style="color:white; text-decoration:none;">📊 Fee Summary</a></li>
                <li><a href="record_payment.html" style="color:white; text-decoration:none;">💰 New Payment</a></li>
                <li style="margin:10px 0;"><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors</a></li>
            </ul></div>`;
        } else if (isAcademic) {
            menu = `<li style="padding:15px 20px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ Back</a></li>
            <div style="padding:20px;"><p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">Academics</p>
            <ul style="list-style:none; padding:0; font-size:0.9rem; color:#bdc3c7;">
                <li><a href="mark_entry.html" style="color:white; text-decoration:none;">✍️ Enter Marks</a></li>
                <li style="margin:10px 0;"><a href="subject_management.html" style="color:white; text-decoration:none;">📚 Subjects</a></li>
                <li><a href="academic_overview.html" style="color:white; text-decoration:none;">📊 Merit List</a></li>
            </ul></div>`;
        } else {
            menu = `<div style="padding:25px; border-bottom:1px solid rgba(255,255,255,0.1);"><h2 style="color:#3498db; margin:0; font-size:1.2rem;">Livingstone</h2></div>
            <ul style="list-style:none; padding:0; margin-top:10px;">
                <li style="padding:10px 25px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none;">📊 Dashboard</a></li>
                <li style="padding:10px 25px;"><a href="student_class_hub.html" style="color:white; text-decoration:none;">👨‍🎓 Students</a></li>
                <li style="padding:10px 25px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none;">👨‍🏫 Staff</a></li>
                <li style="padding:10px 25px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none;">💳 Finance</a></li>
                <li style="padding:10px 25px;"><a href="academic_overview.html" style="color:white; text-decoration:none;">📝 Academics</a></li>
                <li style="padding:10px 25px;"><a href="parents_hub.html" style="color:white; text-decoration:none;">👪 Parents</a></li>
                <li style="padding:10px 25px;"><a href="library_hub.html" style="color:white; text-decoration:none;">📚 Library</a></li>
                <li style="padding:10px 25px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none;">🚌 Logistics</a></li>
                <li style="padding:10px 25px;"><a href="inventory_hub.html" style="color:white; text-decoration:none;">📦 Inventory</a></li>
                <li style="padding:10px 25px;"><a href="communication_hub.html" style="color:white; text-decoration:none;">💬 Communication</a></li>
                <li style="padding:10px 25px;"><a href="calendar_hub.html" style="color:white; text-decoration:none;">📅 Calendar</a></li>
                <li style="padding:10px 25px;"><a href="reports_hub.html" style="color:white; text-decoration:none;">📈 Reports</a></li>
                <li style="padding:10px 25px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none;">⚙️ System Admin</a></li>
            </ul>`;
        }
        sb.innerHTML = `<div style="display:flex; flex-direction:column; height:100%;">${menu} <div style="margin-top:auto; padding:15px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.9rem;" onclick="api.logout()">Logout 🚪</div></div>`;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
