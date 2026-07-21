const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },
    showNotification: (msg, type='success') => {
        const n = document.createElement('div');
        n.style.cssText = `position:fixed; top:20px; right:20px; padding:12px 20px; background:${type==='success'?'#27ae60':'#e74c3c'}; color:white; border-radius:8px; z-index:10000; font-weight:bold; font-size:0.85rem;`;
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

        const path = window.location.pathname;
        const isStd = path.includes('student') || path.includes('class') || path.includes('admission') || path.includes('timetable');
        const isFin = path.includes('fee') || path.includes('payment') || path.includes('balance');

        let menu = '';
        if (isStd) {
            menu = `
            <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.8rem;">⬅ BACK HOME</a></div>
            <div style="padding:20px;">
                <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">Students</p>
                <ul style="list-style:none; padding:0; font-size:0.9rem;">
                    <li style="margin-bottom:12px;"><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add Student</a></li>
                    <li style="margin-bottom:12px;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Directory</a></li>
                    <li style="margin-bottom:12px;"><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes</a></li>
                    <li><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetable</a></li>
                </ul>
            </div>`;
        } else if (isFin) {
            menu = `
            <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.8rem;">⬅ BACK HOME</a></div>
            <div style="padding:20px;">
                <p style="color:#27ae60; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">Finance</p>
                <ul style="list-style:none; padding:0; font-size:0.9rem;">
                    <li style="margin-bottom:12px;"><a href="fee_structure.html" style="color:white; text-decoration:none;">📋 Fee Setup</a></li>
                    <li style="margin-bottom:12px;"><a href="fee_summary.html" style="color:white; text-decoration:none;">📊 Fee Summary</a></li>
                    <li style="margin-bottom:12px;"><a href="record_payment.html" style="color:white; text-decoration:none;">💰 New Payment</a></li>
                    <li><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors</a></li>
                </ul>
            </div>`;
        } else {
            // FULL PROFESSIONAL LIST
            menu = `
            <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1);"><h2 style="color:#3498db; margin:0; font-size:1.1rem;">Livingstone Academy</h2></div>
            <ul style="list-style:none; padding:5px 0; overflow-y:auto; flex-grow:1;">
                <li style="padding:10px 25px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none; font-size:0.9rem;">📊 Dashboard</a></li>
                <li style="padding:10px 25px;"><a href="student_class_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">👨‍🎓 Students & Classes</a></li>
                <li style="padding:10px 25px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">👨‍🏫 Staff & Teachers</a></li>
                <li style="padding:10px 25px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">💳 Fees & Accounts</a></li>
                <li style="padding:10px 25px;"><a href="academic_overview.html" style="color:white; text-decoration:none; font-size:0.9rem;">📝 Academics Hub</a></li>
                <li style="padding:10px 25px;"><a href="parents_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">👪 Parents</a></li>
                <li style="padding:10px 25px;"><a href="library_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">📚 Library</a></li>
                <li style="padding:10px 25px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">🚌 Logistics</a></li>
                <li style="padding:10px 25px;"><a href="inventory_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">📦 Inventory</a></li>
                <li style="padding:10px 25px;"><a href="communication_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">💬 Communication</a></li>
                <li style="padding:10px 25px;"><a href="calendar_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">📅 Calendar</a></li>
                <li style="padding:10px 25px;"><a href="reports_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">📈 Reports</a></li>
                <li style="padding:10px 25px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none; font-size:0.9rem;">⚙️ System Admin</a></li>
            </ul>`;
        }

        sb.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; border-right:1px solid rgba(0,0,0,0.1);">
                ${menu}
                <div style="padding:15px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.85rem;" onclick="api.logout()">Logout 🚪</div>
            </div>
        `;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
