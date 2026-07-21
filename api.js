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
        const p = window.location.pathname;
        
        // Compact Detection
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable');
        const isStf = p.includes('staff') || p.includes('payroll') || p.includes('teaching');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance');
        const isAcd = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject');

        let menu = '';
        if (isStd) {
            menu = `<li style="padding:10px 20px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-size:0.85rem;">⬅ Back Home</a></li>
            <div style="padding:15px;"><p style="color:#3498db; font-size:0.65rem; font-weight:bold; text-transform:uppercase;">Student Hub</p>
            <ul style="list-style:none; padding:0; font-size:0.8rem; color:#bdc3c7;">
                <li style="margin:8px 0;"><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add Student</a></li>
                <li style="margin:8px 0;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Directory</a></li>
                <li style="margin:8px 0;"><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes</a></li>
                <li><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetable</a></li>
            </ul></div>`;
        } else if (isFin) {
            menu = `<li style="padding:10px 20px; background:#34495e;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-size:0.85rem;">⬅ Back Home</a></li>
            <div style="padding:15px;"><p style="color:#27ae60; font-size:0.65rem; font-weight:bold; text-transform:uppercase;">Finance Hub</p>
            <ul style="list-style:none; padding:0; font-size:0.8rem; color:#bdc3c7;">
                <li style="margin:8px 0;"><a href="fee_structure.html" style="color:white; text-decoration:none;">📋 Setup Fees</a></li>
                <li style="margin:8px 0;"><a href="fee_summary.html" style="color:white; text-decoration:none;">📊 Fee Summary</a></li>
                <li style="margin:8px 0;"><a href="record_payment.html" style="color:white; text-decoration:none;">💰 New Payment</a></li>
                <li><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors List</a></li>
            </ul></div>`;
        } else {
            // Main Dashboard - COMPACT
            menu = `<div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1);"><h2 style="color:#3498db; margin:0; font-size:1.1rem;">Livingstone Academy</h2></div>
            <ul style="list-style:none; padding:0; margin-top:5px; flex-grow:1;">
                <li style="padding:8px 20px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none; font-size:0.85rem;">📊 Dashboard</a></li>
                <li style="padding:8px 20px;"><a href="student_class_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🎓 Students</a></li>
                <li style="padding:8px 20px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🏫 Staff</a></li>
                <li style="padding:8px 20px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">💳 Finance</a></li>
                <li style="padding:8px 20px;"><a href="academic_overview.html" style="color:white; text-decoration:none; font-size:0.85rem;">📝 Academics</a></li>
                <li style="padding:8px 20px;"><a href="parents_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👪 Parents</a></li>
                <li style="padding:8px 20px;"><a href="library_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📚 Library</a></li>
                <li style="padding:8px 20px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">🚌 Logistics</a></li>
                <li style="padding:8px 20px;"><a href="inventory_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📦 Inventory</a></li>
                <li style="padding:8px 20px;"><a href="communication_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">💬 Communication</a></li>
                <li style="padding:8px 20px;"><a href="calendar_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📅 Calendar</a></li>
                <li style="padding:8px 20px;"><a href="reports_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">📈 Reports</a></li>
                <li style="padding:8px 20px;"><a href="system_admin_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">⚙️ Admin</a></li>
            </ul>`;
        }
        sb.innerHTML = `<div style="display:flex; flex-direction:column; height:100%;">${menu} <div style="margin-top:auto; padding:12px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.8rem;" onclick="api.logout()">Logout 🚪</div></div>`;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
