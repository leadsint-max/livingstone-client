const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },
    showNotification: (msg, type='success') => {
        const n = document.createElement('div');
        n.style.cssText = `position:fixed; top:20px; right:20px; padding:15px 25px; background:${type==='success'?'#27ae60':'#e74c3c'}; color:white; border-radius:8px; z-index:10000; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.2);`;
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
        
        // Detection Logic
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable');
        const isStf = p.includes('staff') || p.includes('payroll') || p.includes('teaching');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance') || p.includes('financial');
        const isAcd = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject');

        let menuHtml = '';

        if (isFin) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ BACK HOME</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#e67e22; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">📋 Fee Structure</p>
                    <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7; margin-bottom:20px;">
                        <li style="margin-bottom:8px;"><a href="fee_structure.html" style="color:white; text-decoration:none;">✅ Setup Tuition & Fees</a></li>
                        <li><a href="fee_summary.html" style="color:white; text-decoration:none;">✅ Class-wise Settings</a></li>
                    </ul>
                    <p style="color:#27ae60; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">💰 Payments</p>
                    <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7; margin-bottom:20px;">
                        <li style="margin-bottom:8px;"><a href="record_payment.html" style="color:white; text-decoration:none;">✅ Record Payments</a></li>
                        <li><a href="financial_reports.html" style="color:white; text-decoration:none;">📈 Daily Logs</a></li>
                    </ul>
                    <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">⚖️ Balances</p>
                    <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7;">
                        <li><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors List</a></li>
                    </ul>
                </div>
            `;
        } else if (isStd) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold;">⬅ BACK HOME</a></div>
                <div style="padding:20px;">
                    <p style="color:#3498db; font-size:0.7rem; font-weight:bold; text-transform:uppercase;">Student Hub</p>
                    <ul style="list-style:none; padding:0; font-size:0.9rem; color:#bdc3c7;">
                        <li style="margin-bottom:12px;"><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add Student</a></li>
                        <li style="margin-bottom:12px;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Directory</a></li>
                        <li style="margin-bottom:12px;"><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes</a></li>
                        <li><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetable</a></li>
                    </ul>
                </div>
            `;
        } else {
            // Main Dashboard View
            menuHtml = `
                <div style="padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); text-align:center;">
                    <h2 style="color:#3498db; margin:0; font-size: 1.2rem;">Livingstone Academy</h2>
                </div>
                <ul style="list-style:none; padding:0; margin-top:10px;">
                    <li style="padding:12px 25px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none;">📊 Dashboard</a></li>
                    <li style="padding:12px 25px;"><a href="student_class_hub.html" style="color:white; text-decoration:none;">👨‍🎓 Students & Classes</a></li>
                    <li style="padding:12px 25px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none;">👨‍🏫 Staff & Teachers</a></li>
                    <li style="padding:12px 25px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none;">💳 Fees & Accounts</a></li>
                    <li style="padding:12px 25px;"><a href="academic_overview.html" style="color:white; text-decoration:none;">📝 Academics Hub</a></li>
                    <li style="padding:12px 25px;"><a href="parents_hub.html" style="color:white; text-decoration:none;">👪 Parents Hub</a></li>
                    <li style="padding:12px 25px;"><a href="library_hub.html" style="color:white; text-decoration:none;">📚 Library</a></li>
                    <li style="padding:12px 25px;"><a href="transport_hostel_hub.html" style="color:white; text-decoration:none;">🚌 Logistics</a></li>
                    <li style="padding:12px 25px;"><a href="inventory_hub.html" style="color:white; text-decoration:none;">📦 Inventory</a></li>
                </ul>
            `;
        }

        sb.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; border-right:1px solid rgba(0,0,0,0.1); background:#2c3e50; color:white;">
                ${menuHtml}
                <div style="margin-top:auto; padding:15px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.9rem;" onclick="api.logout()">Logout 🚪</div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', api.renderSidebar);
