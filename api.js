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
        try {
            const r = await fetch(API_BASE_URL+e, { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+api.getToken()}, body:JSON.stringify(d)});
            return await r.json();
        } catch (err) { return { success: false, error: "Connection failed" }; }
    },
    get: async (e) => {
        try {
            const r = await fetch(API_BASE_URL+e, { headers:{'Authorization':'Bearer '+api.getToken()}});
            return await r.json();
        } catch (err) { return { error: "Failed to load data" }; }
    },
    renderSidebar: () => {
        const sb = document.querySelector('.sidebar');
        if (!sb) return;

        sb.style.cssText = "width:220px; height:100vh; background:#2c3e50; color:white; position:fixed; left:0; top:0; display:flex; flex-direction:column; overflow:hidden; z-index:1000;";
        const p = window.location.pathname;
        
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable');
        const isStf = p.includes('staff') || p.includes('payroll') || p.includes('teaching');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance');
        const isAcd = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject') || p.includes('report_card');
        const isRep = p.includes('report') && !p.includes('card');
        const isSys = p.includes('admin_hub') || p.includes('settings') || p.includes('user');

        let menuHtml = '';

        if (isStd || isStf || isFin || isAcd || isRep || isSys) {
            let title = isStd ? "Students" : isStf ? "Staff/HR" : isFin ? "Finance" : isAcd ? "Academics" : isRep ? "Reports" : "System Admin";
            let links = "";
           if(isAcd) links = `
    <li><a href="mark_entry.html">✍️ Enter Scores</a></li>
    <li><a href="subject_management.html">📚 Subjects</a></li>
    <li><a href="merit_list.html">🏆 Merit Lists</a></li>
    <li><a href="report_center.html">🖨️ Report Cards</a></li>
`;
            if(isStf) links = `<li><a href="staff_registration.html">➕ Hire Staff</a></li><li><a href="staff_directory.html">📂 Directory</a></li><li><a href="payroll.html">💰 Payroll</a></li>`;
            if(isFin) links = `<li><a href="fee_structure.html">📋 Fee Setup</a></li><li><a href="fee_summary.html">📊 Summary</a></li><li><a href="record_payment.html">💰 New Payment</a></li><li><a href="student_balances.html">⚖️ Debtors</a></li>`;
            
            // CORRECTED ACADEMIC LINKS
            if(isAcd) links = `<li><a href="mark_entry.html">✍️ Enter Scores</a></li><li><a href="subject_management.html">📚 Subjects</a></li><li><a href="academic_overview.html">🏆 Merit Lists</a></li><li><a href="academic_overview.html">🖨️ Report Cards</a></li>`;
            
            if(isRep) links = `<li><a href="financial_reports.html">💰 Financials</a></li><li><a href="attendance_reports.html">📅 Attendance</a></li><li><a href="student_analytics.html">📊 Enrollment</a></li>`;
            if(isSys) links = `<li><a href="user_management.html">👥 Users</a></li><li><a href="school_settings.html">🏫 Settings</a></li><li><a href="system_admin.html">💾 Audit/Backup</a></li>`;

            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db; text-decoration:none; font-size: 0.8rem;">⬅ BACK HOME</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">${title}</p>
                    <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:2.2;">${links.replace(/<a /g, '<a style="color:white; text-decoration:none;" ')}</ul>
                </div>`;
        } else {
            menuHtml = `
                <div style="padding:25px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); text-align:center;">
                    <h2 style="color:#3498db; margin:0; font-size:1.1rem;">Livingstone Academy</h2>
                </div>
                <ul style="list-style:none; padding:10px 0; overflow-y:auto; flex-grow:1;">
                    <li style="padding:10px 20px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none; font-size:0.9rem;">📊 Dashboard</a></li>
                    <li style="padding:10px 20px;"><a href="student_class_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">👨‍🎓 Students & Classes</a></li>
                    <li style="padding:10px 20px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">👨‍🏫 Staff & Teachers</a></li>
                    <li style="padding:10px 20px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">💳 Fees & Accounts</a></li>
                    <li style="padding:10px 20px;"><a href="academic_overview.html" style="color:white; text-decoration:none; font-size:0.9rem;">📝 Academics Hub</a></li>
                    <li style="padding:10px 20px;"><a href="reports_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">📈 Reports & Analytics</a></li>
                    <li style="padding:10px 20px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">⚙️ System Admin</a></li>
                </ul>`;
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
