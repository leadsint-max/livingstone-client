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

        // Apply global layout styles to prevent content from hiding behind sidebar
        const style = document.createElement('style');
        style.innerHTML = `
            .sidebar { width: 260px !important; background: #2c3e50 !important; height: 100vh !important; position: fixed !important; left: 0; top: 0; display: flex !important; flex-direction: column !important; overflow: hidden !important; z-index: 1000; }
            .main, .main-content { margin-left: 260px !important; width: calc(100% - 260px) !important; padding: 30px !important; box-sizing: border-box !important; }
            .sidebar a { color: white; text-decoration: none; font-size: 0.9rem; }
            .sidebar p { margin: 15px 0 5px; font-weight: bold; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 1px; }
            .sidebar ul { list-style: none; padding: 0; margin: 0; }
            .sidebar li { padding: 8px 0; font-size: 0.85rem; color: #bdc3c7; }
            .sidebar li a:hover { color: #3498db; }
        `;
        document.head.appendChild(style);

        const path = window.location.pathname;
        const isStd = path.includes('student') || path.includes('class') || path.includes('admission') || path.includes('timetable') || path.includes('analytics');
        const isStf = path.includes('staff') || path.includes('payroll') || path.includes('teaching');
        const isFin = path.includes('fee') || path.includes('payment') || path.includes('balance') || path.includes('financial');
        const isAcd = path.includes('academic') || path.includes('mark') || path.includes('exam') || path.includes('subject');

        let menuHtml = '';

        if (isFin) {
            // DETAILED FINANCE SIDEBAR
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db;">⬅ BACK TO DASHBOARD</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#e67e22;">📋 Fee Structure</p>
                    <ul>
                        <li><a href="fee_structure.html">✅ Setup Tuition & Fees</a></li>
                        <li><a href="fee_summary.html">✅ Class-wise Settings</a></li>
                        <li><a href="#">✅ Term Configuration</a></li>
                        <li><a href="#">🔒 Admin Access</a></li>
                    </ul>

                    <p style="color:#27ae60;">💰 Payments & Invoicing</p>
                    <ul>
                        <li><a href="record_payment.html">✅ Record Payments</a></li>
                        <li><a href="record_payment.html">✅ Generate Invoices</a></li>
                        <li><a href="record_payment.html">✅ Print Receipts</a></li>
                        <li><a href="financial_reports.html">✅ History Tracking</a></li>
                    </ul>

                    <p style="color:#3498db;">⚖️ Balances & Discounts</p>
                    <ul>
                        <li><a href="student_balances.html">✅ Track Debtors</a></li>
                        <li><a href="student_balances.html">✅ Manage Scholarships</a></li>
                        <li><a href="student_balances.html">✅ Apply Waivers</a></li>
                    </ul>

                    <p style="color:#9b59b6;">📊 Financial Reporting</p>
                    <ul>
                        <li><a href="financial_reports.html">✅ Daily Collections</a></li>
                        <li><a href="financial_reports.html">✅ Revenue Analytics</a></li>
                        <li><a href="system_admin.html">✅ Audit Trails</a></li>
                    </ul>
                </div>
            `;
        } else if (isStd) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db;">⬅ BACK TO DASHBOARD</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#3498db;">Student Management</p>
                    <ul>
                        <li><a href="student_admission.html">➕ Add Student</a></li>
                        <li><a href="student_list.html">📂 Student Directory</a></li>
                        <li><a href="class_management.html">🏫 Classes & Streams</a></li>
                        <li><a href="timetable.html">📅 Timetables</a></li>
                    </ul>
                </div>
            `;
        } else if (isStf) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db;">⬅ BACK TO DASHBOARD</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#3498db;">Staff & Teachers</p>
                    <ul>
                        <li><a href="staff_registration.html">➕ Register Staff</a></li>
                        <li><a href="staff_directory.html">📂 Staff Directory</a></li>
                        <li><a href="teaching_assignments.html">📚 Teaching Assignments</a></li>
                        <li><a href="payroll.html">💰 Payroll</a></li>
                    </ul>
                </div>
            `;
        } else if (isAcd) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db;">⬅ BACK TO DASHBOARD</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#f1c40f;">Academic Hub</p>
                    <ul>
                        <li><a href="mark_entry.html">✍️ Enter Scores</a></li>
                        <li><a href="subject_management.html">📚 Subjects</a></li>
                        <li><a href="academic_overview.html">📊 Merit List</a></li>
                    </ul>
                </div>
            `;
        } else {
            // Main Dashboard View
            menuHtml = `
                <div style="padding:25px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); text-align:center;">
                    <h2 style="color:#3498db; margin:0; font-size:1.3rem;">Livingstone Academy</h2>
                </div>
                <ul style="padding:10px 0; overflow-y:auto; flex-grow:1;">
                    <li style="padding:12px 25px;"><a href="admin_dashboard.html">📊 Dashboard</a></li>
                    <li style="padding:12px 25px;"><a href="student_class_hub.html">👨‍🎓 Students & Classes</a></li>
                    <li style="padding:12px 25px;"><a href="staff_teacher_hub.html">👨‍🏫 Staff & Teachers</a></li>
                    <li style="padding:12px 25px;"><a href="fees_accounts_hub.html">💳 Fees & Accounts</a></li>
                    <li style="padding:12px 25px;"><a href="academic_overview.html">📝 Academics Hub</a></li>
                    <li style="padding:12px 25px;"><a href="parents_hub.html">👪 Parents</a></li>
                    <li style="padding:12px 25px;"><a href="library_hub.html">📚 Library</a></li>
                    <li style="padding:12px 25px;"><a href="transport_hostel_hub.html">🚌 Logistics</a></li>
                    <li style="padding:12px 25px;"><a href="inventory_hub.html">📦 Inventory</a></li>
                </ul>
            `;
        }

        sb.innerHTML = `
            <div style="display:flex; flex-direction:column; height:100%; border-right:1px solid rgba(0,0,0,0.1);">
                ${menuHtml}
                <div style="padding:20px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white;" onclick="api.logout()">Logout 🚪</div>
            </div>
        `;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
