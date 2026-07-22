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

        // Apply global layout styles (Narrow 220px sidebar)
        const style = document.createElement('style');
        style.innerHTML = `
            .sidebar { width: 220px !important; background: #2c3e50 !important; height: 100vh !important; position: fixed !important; left: 0; top: 0; display: flex !important; flex-direction: column !important; overflow: hidden !important; z-index: 1000; }
            .main, .main-content { margin-left: 220px !important; width: calc(100% - 220px) !important; padding: 30px !important; box-sizing: border-box !important; }
            .sidebar a { color: white; text-decoration: none; font-size: 0.9rem; }
            .sidebar p { margin: 15px 0 5px; font-weight: bold; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 1px; color: #3498db; }
            .sidebar ul { list-style: none; padding: 0; margin: 0; }
            .sidebar li { padding: 10px 20px; transition: 0.2s; }
            .sidebar li:hover { background: rgba(255,255,255,0.05); }
        `;
        document.head.appendChild(style);

        const path = window.location.pathname;
        const isStd = path.includes('student') || path.includes('class') || path.includes('admission') || path.includes('timetable') || path.includes('analytics');
        const isStf = path.includes('staff') || path.includes('payroll') || path.includes('teaching');
        const isFin = path.includes('fee') || path.includes('payment') || path.includes('balance') || path.includes('financial');
        const isAcd = path.includes('academic') || path.includes('mark') || path.includes('exam') || path.includes('subject');

        let menuHtml = '';

        if (isStd || isStf || isFin || isAcd) {
            // FOCUS MODE FOR SUB-MODULES
            let title = isStd ? "Students" : isStf ? "Staff/HR" : isFin ? "Finance" : "Academics";
            let links = "";
            if(isStd) links = `<li><a href="student_admission.html">➕ Add Student</a></li><li><a href="student_list.html">📂 Directory</a></li><li><a href="class_management.html">🏫 Classes</a></li><li><a href="timetable.html">📅 Timetables</a></li>`;
            if(isStf) links = `<li><a href="staff_registration.html">➕ Hire Staff</a></li><li><a href="staff_directory.html">📂 Directory</a></li><li><a href="payroll.html">💰 Payroll</a></li>`;
            if(isFin) links = `<li><a href="fee_structure.html">📋 Fee Setup</a></li><li><a href="fee_summary.html">📊 Summary</a></li><li><a href="record_payment.html">💰 New Payment</a></li><li><a href="student_balances.html">⚖️ Debtors</a></li>`;
            if(isAcd) links = `<li><a href="mark_entry.html">✍️ Enter Scores</a></li><li><a href="subject_management.html">📚 Subjects</a></li><li><a href="academic_overview.html">📊 Merit List</a></li>`;

            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db; font-size: 0.8rem;">⬅ BACK HOME</a></div>
                <div style="padding:20px; flex-grow:1; overflow-y:auto;">
                    <p>${title}</p>
                    <ul style="line-height:2.2;">${links}</ul>
                </div>
            `;
        } else {
            // MAIN DASHBOARD (Clean 7 Items)
            menuHtml = `
                <div style="padding:25px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); text-align:center;">
                    <h2 style="color:#3498db; margin:0; font-size:1.1rem;">Livingstone Academy</h2>
                </div>
                <ul style="padding:10px 0; overflow-y:auto; flex-grow:1;">
                    <li><a href="admin_dashboard.html">📊 Dashboard</a></li>
                    <li><a href="student_class_hub.html">👨‍🎓 Students & Classes</a></li>
                    <li><a href="staff_teacher_hub.html">👨‍🏫 Staff & Teachers</a></li>
                    <li><a href="fees_accounts_hub.html">💳 Fees & Accounts</a></li>
                    <li><a href="academic_overview.html">📝 Academics</a></li>
                    <li><a href="reports_hub.html">📈 Reports & Analytics</a></li>
                    <li><a href="system_admin_hub.html">⚙️ System Administration</a></li>
                </ul>
            `;
        }

        sb.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; border-right:1px solid rgba(0,0,0,0.1);">
                ${menuHtml}
                <div style="padding:15px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.85rem; margin-top:auto;" onclick="api.logout()">Logout 🚪</div>
            </div>
        `;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
