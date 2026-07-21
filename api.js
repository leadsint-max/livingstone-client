const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },
    showNotification: (msg, type='success') => {
        const n = document.createElement('div');
        n.style.cssText = `position:fixed; top:20px; right:20px; padding:12px 20px; background:${type==='success'?'#27ae60':'#e74c3c'}; color:white; border-radius:8px; z-index:10000; font-weight:bold; font-size:0.85rem; box-shadow:0 4px 15px rgba(0,0,0,0.2);`;
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

        // 1. APPLY GLOBAL LAYOUT FIXES (Ensures content is never pushed too far right)
        const style = document.createElement('style');
        style.innerHTML = `
            .sidebar { width: 260px !important; background: #2c3e50 !important; height: 100vh !important; position: fixed !important; left: 0; top: 0; display: flex !important; flex-direction: column !important; overflow: hidden !important; }
            .main, .main-content { margin-left: 260px !important; width: calc(100% - 260px) !important; padding: 30px !important; box-sizing: border-box !important; }
            .student-grid { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important; gap: 20px !important; }
            .sidebar a { font-size: 0.9rem !important; transition: 0.2s; }
            .sidebar li { transition: 0.2s; }
            .sidebar li:hover { background: rgba(255,255,255,0.05); }
        `;
        document.head.appendChild(style);

        const p = window.location.pathname;
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable') || p.includes('analytics');
        const isStf = p.includes('staff') || p.includes('payroll') || p.includes('teaching');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance') || p.includes('account');
        const isAcd = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject');

        let menu = '';
        if (isStd || isStf || isFin || isAcd) {
            // SUBMENU FOCUS MODES
            let sectionTitle = isStd ? "Students & Classes" : isStf ? "Staff & Teachers" : isFin ? "Finance & Accounts" : "Academics Hub";
            let sectionLinks = "";
            if(isStd) sectionLinks = `<li><a href="student_admission.html">➕ New Admission</a></li><li><a href="student_list.html">📂 Student Directory</a></li><li><a href="class_management.html">🏫 Classes & Streams</a></li><li><a href="timetable.html">📅 Timetables</a></li><li><a href="student_analytics.html">📊 Enrollment Stats</a></li>`;
            if(isStf) sectionLinks = `<li><a href="staff_registration.html">➕ Register Staff</a></li><li><a href="staff_directory.html">📂 Staff Directory</a></li><li><a href="teaching_assignments.html">📚 Teaching Load</a></li><li><a href="staff_attendance.html">📅 Daily Attendance</a></li><li><a href="payroll.html">💰 Monthly Payroll</a></li>`;
            if(isFin) sectionLinks = `<li><a href="fee_structure.html">📋 Setup Fees</a></li><li><a href="fee_summary.html">📊 Fee Summary</a></li><li><a href="record_payment.html">💰 New Payment</a></li><li><a href="student_balances.html">⚖️ Debtors List</a></li><li><a href="financial_reports.html">📈 Daily Logs</a></li>`;
            if(isAcd) sectionLinks = `<li><a href="mark_entry.html">✍️ Enter Scores</a></li><li><a href="subject_management.html">📚 Manage Subjects</a></li><li><a href="exam_setup.html">📝 Exam Setup</a></li><li><a href="academic_overview.html">📊 Merit List</a></li><li><a href="report_card_template.html">🖨️ Report Cards</a></li>`;

            menu = `<div style="padding:15px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.8rem;">⬅ BACK TO DASHBOARD</a></div>
            <div style="padding:20px; flex-grow:1; overflow-y:auto;">
                <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">${sectionTitle}</p>
                <ul style="list-style:none; padding:0; line-height:2.2;">${sectionLinks.replace(/<li>/g, '<li style="margin-bottom:5px;">').replace(/<a /g, '<a style="color:white; text-decoration:none;" ')}</ul>
            </div>`;
        } else {
            // MAIN 14-ITEM LIST
            menu = `<div style="padding:25px 20px; border-bottom:1px solid rgba(255,255,255,0.1); text-align:center;"><h2 style="color:#3498db; margin:0; font-size:1.2rem;">Livingstone Academy</h2></div>
            <ul style="list-style:none; padding:0; flex-grow:1; overflow-y:auto; margin:0;">
                <li style="padding:12px 25px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none;">📊 Dashboard</a></li>
                <li style="padding:12px 25px;"><a href="student_class_hub.html" style="color:white; text-decoration:none;">👨‍🎓 Students & Classes</a></li>
                <li style="padding:12px 25px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none;">👨‍🏫 Staff & Teachers</a></li>
                <li style="padding:12px 25px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none;">💳 Fees & Accounts</a></li>
                <li style="padding:12px 25px;"><a href="academic_overview.html" style="color:white; text-decoration:none;">📝 Academics Hub</a></li>
                <li style="padding:12px 25px;"><a href="parents_hub.html" style="color:white; text-decoration:none;">👪 Parents Hub</a></li>
                <li style="padding:12px 25px;"><a href="library_hub.html" style="color:white; text-decoration:none;">📚 Library Management</a></li>
                <li style="padding:12px 25px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none;">🚌 Logistics (Bus & Hostel)</a></li>
                <li style="padding:12px 25px;"><a href="inventory_hub.html" style="color:white; text-decoration:none;">📦 Inventory & Assets</a></li>
                <li style="padding:12px 25px;"><a href="communication_hub.html" style="color:white; text-decoration:none;">💬 Communication</a></li>
                <li style="padding:12px 25px;"><a href="calendar_hub.html" style="color:white; text-decoration:none;">📅 Calendar & Events</a></li>
                <li style="padding:12px 25px;"><a href="reports_hub.html" style="color:white; text-decoration:none;">📈 Reports & Analytics</a></li>
                <li style="padding:12px 25px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none;">⚙️ System Administration</a></li>
            </ul>`;
        }
        sb.innerHTML = `<div style="display:flex; flex-direction:column; height:100%;">${menu}<div style="padding:15px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.85rem; margin-top:auto;" onclick="api.logout()">Logout 🚪</div></div>`;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
