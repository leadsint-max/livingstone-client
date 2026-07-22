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

        // Global Layout Fix
        const style = document.createElement('style');
        style.innerHTML = `
            .sidebar { width: 220px !important; background: #2c3e50 !important; height: 100vh !important; position: fixed !important; left: 0; top: 0; display: flex !important; flex-direction: column !important; overflow: hidden !important; z-index: 1000; }
            .main, .main-content { margin-left: 220px !important; width: calc(100% - 220px) !important; padding: 30px !important; box-sizing: border-box !important; }
            /* FIXED GRID: Reduced to 250px to ensure 2 per row fits perfectly */
            .student-grid { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important; gap: 20px !important; }
        `;
        document.head.appendChild(style);

        const p = window.location.pathname;
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable') || p.includes('analytics');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance') || p.includes('financial');

        let menuHtml = '';
        if (isStd) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db; text-decoration:none; font-size:0.8rem;">⬅ BACK HOME</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">Student Hub</p>
                    <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:2;">
                        <li><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add Student</a></li>
                        <li><a href="student_list.html" style="color:white; text-decoration:none;">📂 Directory</a></li>
                        <li><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes</a></li>
                        <li><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetable</a></li>
                    </ul>
                </div>`;
        } else if (isFin) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db; text-decoration:none; font-size:0.8rem;">⬅ BACK HOME</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#27ae60; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">Finance</p>
                    <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:2;">
                        <li><a href="fee_structure.html" style="color:white; text-decoration:none;">📋 Fee Setup</a></li>
                        <li><a href="fee_summary.html" style="color:white; text-decoration:none;">📊 Fee Summary</a></li>
                        <li><a href="record_payment.html" style="color:white; text-decoration:none;">💰 New Payment</a></li>
                        <li><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors</a></li>
                    </ul>
                </div>`;
        } else {
            menuHtml = `
                <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1); text-align:center;">
                    <h2 style="color:#3498db; margin:0; font-size:1.1rem;">Livingstone Academy</h2>
                </div>
                <ul style="list-style:none; padding:10px 0; overflow-y:auto; flex-grow:1;">
                    <li style="padding:10px 20px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none; font-size:0.85rem;">📊 Dashboard</a></li>
                    <li style="padding:10px 20px;"><a href="student_class_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🎓 Students</a></li>
                    <li style="padding:10px 20px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🏫 Staff</a></li>
                    <li style="padding:10px 20px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">💳 Finance</a></li>
                    <li style="padding:10px 20px;"><a href="academic_overview.html" style="color:white; text-decoration:none; font-size:0.85rem;">📝 Academics</a></li>
                    <li style="padding:10px 20px;"><a href="parents_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👪 Parents</a></li>
                    <li style="padding:10px 20px;"><a href="reports_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📈 Reports</a></li>
                    <li style="padding:10px 20px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">⚙️ Admin</a></li>
                </ul>`;
        }

        sb.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; color:white;">
                ${menuHtml}
                <div style="padding:12px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.85rem; margin-top:auto;" onclick="api.logout()">Logout 🚪</div>
            </div>
        `;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
