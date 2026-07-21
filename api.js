const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },
    showNotification: (msg, type='success') => {
        const n = document.createElement('div');
        n.style.cssText = `position:fixed; top:20px; right:20px; padding:15px 25px; background:${type==='success'?'#27ae60':'#e74c3c'}; color:white; border-radius:8px; z-index:10000; font-weight:bold; box-shadow: 0 4px 12px rgba(0,0,0,0.1);`;
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
        const isStf = path.includes('staff') || path.includes('payroll') || path.includes('teaching');
        const isFin = path.includes('fee') || path.includes('payment') || path.includes('balance');
        const isAcd = path.includes('academic') || path.includes('mark') || path.includes('exam') || path.includes('subject');

        let menu = '';
        if (isStd) {
            menu = `
            <div style="padding:20px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.9rem;">⬅ BACK TO DASHBOARD</a></div>
            <div style="padding:25px;">
                <p style="color:#3498db; font-size:0.75rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">Student Management</p>
                <ul style="list-style:none; padding:0; font-size:0.95rem;">
                    <li style="margin-bottom:15px;"><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add New Student</a></li>
                    <li style="margin-bottom:15px;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Student Directory</a></li>
                    <li style="margin-bottom:15px;"><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes & Streams</a></li>
                    <li><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetables</a></li>
                </ul>
            </div>`;
        } else if (isFin) {
            menu = `
            <div style="padding:20px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.9rem;">⬅ BACK TO DASHBOARD</a></div>
            <div style="padding:25px;">
                <p style="color:#27ae60; font-size:0.75rem; font-weight:bold; text-transform:uppercase; margin-bottom:15px;">Finance Center</p>
                <ul style="list-style:none; padding:0; font-size:0.95rem;">
                    <li style="margin-bottom:15px;"><a href="fee_structure.html" style="color:white; text-decoration:none;">📋 Setup Tuition/Fees</a></li>
                    <li style="margin-bottom:15px;"><a href="fee_summary.html" style="color:white; text-decoration:none;">📊 Fee Summary</a></li>
                    <li style="margin-bottom:15px;"><a href="record_payment.html" style="color:white; text-decoration:none;">💰 Record Payment</a></li>
                    <li><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors List</a></li>
                </ul>
            </div>`;
        } else {
            // Main Professional Menu
            menu = `
            <div style="padding:30px 20px; border-bottom:1px solid rgba(255,255,255,0.1); text-align:center;">
                <h2 style="color:#3498db; margin:0; font-size:1.4rem;">Livingstone Academy</h2>
            </div>
            <ul style="list-style:none; padding:10px 0; overflow-y:auto; flex-grow:1;">
                <li style="padding:15px 25px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none;">📊 Dashboard</a></li>
                <li style="padding:15px 25px;"><a href="student_class_hub.html" style="color:white; text-decoration:none;">👨‍🎓 Students & Classes</a></li>
                <li style="padding:15px 25px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none;">👨‍🏫 Staff & Teachers</a></li>
                <li style="padding:15px 25px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none;">💳 Fees & Accounts</a></li>
                <li style="padding:15px 25px;"><a href="academic_overview.html" style="color:white; text-decoration:none;">📝 Academics Hub</a></li>
                <li style="padding:15px 25px;"><a href="parents_hub.html" style="color:white; text-decoration:none;">👪 Parents</a></li>
                <li style="padding:15px 25px;"><a href="library_hub.html" style="color:white; text-decoration:none;">📚 Library</a></li>
                <li style="padding:15px 25px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none;">🚌 Logistics</a></li>
            </ul>`;
        }

        sb.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; color:white;">
                ${menu}
                <div style="padding:20px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white;" onclick="api.logout()">Logout 🚪</div>
            </div>
        `;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
