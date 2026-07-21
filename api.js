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

        const p = window.location.pathname;
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable') || p.includes('analytics');
        const isStf = p.includes('staff') || p.includes('payroll') || p.includes('teaching');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance') || p.includes('financial');
        const isAcd = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject');

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
                        <li><a href="fee_structure.html">✅ Term Configuration</a></li>
                        <li><a href="fee_structure.html">🔒 Admin Access</a></li>
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
                        <li><a href="student_balances.html">✅ Arrears Alerts</a></li>
                    </ul>

                    <p style="color:#9b59b6;">📊 Financial Reporting</p>
                    <ul>
                        <li><a href="financial_reports.html">✅ Daily Collections</a></li>
                        <li><a href="financial_reports.html">✅ Revenue Analytics</a></li>
                        <li><a href="financial_reports.html">✅ Term Summaries</a></li>
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
                        <li><a href="student_admission.html">➕ Add/Edit Students</a></li>
                        <li><a href="student_list.html">📂 Student Profiles</a></li>
                        <li><a href="student_list.html">📈 Student Promotion</a></li>
                        <li><a href="student_list.html">🚚 Transfer Students</a></li>
                        <li><a href="student_list.html">🪪 Generate ID Cards</a></li>
                        <li><a href="student_admission.html">📝 Assign to Classes</a></li>
                    </ul>
                    <p style="color:#27ae60;">Class Management</p>
                    <ul>
                        <li><a href="class_management.html">🏫 Create Classes</a></li>
                        <li><a href="class_management.html">🌊 Create Streams</a></li>
                        <li><a href="class_management.html">👨‍🏫 Assign Teachers</a></li>
                        <li><a href="class_management.html">🏡 Manage Houses</a></li>
                    </ul>
                </div>
            `;
        } else if (isAcd) {
            menuHtml = `
                <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="font-weight:bold; color:#3498db;">⬅ BACK TO DASHBOARD</a></div>
                <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                    <p style="color:#f1c40f;">Academic Center</p>
                    <ul>
                        <li><a href="mark_entry.html">✍️ Enter Results</a></li>
                        <li><a href="subject_management.html">📚 Subject Management</a></li>
                        <li><a href="academic_overview.html">📊 Merit List</a></li>
                        <li><a href="report_card_template.html">🖨️ Generate Reports</a></li>
                    </ul>
                </div>
            `;
        } else {
            // Main Sidebar
            menuHtml = `
                <div style="padding:25px 20px; border-bottom:1px solid rgba(255,255,255,0.1); text-align:center;">
                    <h2 style="color:#3498db; margin:0; font-size:1.3rem;">Livingstone Academy</h2>
                </div>
                <ul style="padding:10px 0; overflow-y:auto; flex-grow:1;">
                    <li style="padding:12px 25px;"><a href="admin_dashboard.html">📊 Dashboard</a></li>
                    <li style="padding:12px 25px;"><a href="student_class_hub.html">👨‍🎓 Students & Classes</a></li>
                    <li style="padding:12px 25px;"><a href="staff_teacher_hub.html">👨‍🏫 Staff & Teachers</a></li>
                    <li style="padding:12px 25px;"><a href="fees_accounts_hub.html">💳 Fees & Accounts</a></li>
                    <li style="padding:12px 25px;"><a href="academic_overview.html">📝 Academics</a></li>
                    <li style="padding:12px 25px;"><a href="parents_hub.html">👪 Parents</a></li>
                    <li style="padding:12px 25px;"><a href="library_hub.html">📚 Library</a></li>
                    <li style="padding:12px 25px;"><a href="transport_hostel_hub.html">🚌 Logistics</a></li>
                    <li style="padding:12px 25px;"><a href="inventory_hub.html">📦 Inventory</a></li>
                    <li style="padding:12px 25px;"><a href="communication_hub.html">💬 Communication</a></li>
                    <li style="padding:12px 25px;"><a href="calendar_hub.html">📅 Calendar</a></li>
                    <li style="padding:12px 25px;"><a href="reports_hub.html">📈 Reports</a></li>
                    <li style="padding:12px 25px;"><a href="system_admin_hub.html">⚙️ System Admin</a></li>
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
