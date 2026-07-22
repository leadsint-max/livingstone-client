const API_BASE_URL = "https://livingstone-academy-server.onrender.com/api"; 

const api = {
    getToken: () => localStorage.getItem('livingstone_token'),
    logout: () => { localStorage.clear(); window.location.href = 'index.html'; },
    showNotification: (msg, type='success') => {
        const n = document.createElement('div');
        n.style.cssText = `position:fixed; top:20px; right:20px; padding:12px 25px; background:${type==='success'?'#27ae60':'#e74c3c'}; color:white; border-radius:8px; z-index:10000; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.1);`;
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
        const isStd = p.includes('student') || p.includes('class') || p.includes('admission') || p.includes('timetable');
        const isFin = p.includes('fee') || p.includes('payment') || p.includes('balance');
        const isAcd = p.includes('academic') || p.includes('mark') || p.includes('exam') || p.includes('subject');

        let menu = '';
        if (isAcd) {
            menu = `
            <div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.8rem;">⬅ BACK HOME</a></div>
            <div style="padding:20px; overflow-y:auto; flex-grow:1;">
                <p style="color:#f1c40f; font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">Academic Hub</p>
                <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7;">
                    <li style="margin-bottom:12px;"><a href="academic_overview.html" style="color:white; text-decoration:none;">📊 Academic Dashboard</a></li>
                    <li style="margin-bottom:12px;"><a href="mark_entry.html" style="color:white; text-decoration:none;">✍️ Enter Student Marks</a></li>
                    <li style="margin-bottom:12px;"><a href="subject_management.html" style="color:white; text-decoration:none;">📚 Subject Management</a></li>
                    <li style="margin-bottom:12px;"><a href="exam_setup.html" style="color:white; text-decoration:none;">📝 Exam Setup</a></li>
                    <li><a href="report_card_template.html" style="color:white; text-decoration:none;">🖨️ Report Card Print</a></li>
                </ul>
            </div>`;
        } else if (isStd) {
            menu = `<div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.8rem;">⬅ BACK HOME</a></div>
            <div style="padding:20px; overflow-y:auto; flex-grow:1;"><p style="color:#3498db; font-size:0.7rem; font-weight:bold;">Student Hub</p>
            <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7;">
                <li><a href="student_admission.html" style="color:white; text-decoration:none;">➕ Add Student</a></li>
                <li style="margin:10px 0;"><a href="student_list.html" style="color:white; text-decoration:none;">📂 Directory</a></li>
                <li><a href="class_management.html" style="color:white; text-decoration:none;">🏫 Classes</a></li>
                <li style="margin:10px 0;"><a href="timetable.html" style="color:white; text-decoration:none;">📅 Timetable</a></li>
            </ul></div>`;
        } else if (isFin) {
            menu = `<div style="padding:15px; background:#34495e; text-align:center;"><a href="admin_dashboard.html" style="color:#3498db; text-decoration:none; font-weight:bold; font-size:0.8rem;">⬅ BACK HOME</a></div>
            <div style="padding:20px; overflow-y:auto; flex-grow:1;"><p style="color:#27ae60; font-size:0.7rem; font-weight:bold;">Finance Hub</p>
            <ul style="list-style:none; padding:0; font-size:0.85rem; color:#bdc3c7;">
                <li><a href="fee_structure.html" style="color:white; text-decoration:none;">📋 Setup Fees</a></li>
                <li style="margin:10px 0;"><a href="fee_summary.html" style="color:white; text-decoration:none;">📊 Fee Summary</a></li>
                <li><a href="record_payment.html" style="color:white; text-decoration:none;">💰 New Payment</a></li>
                <li style="margin:10px 0;"><a href="student_balances.html" style="color:white; text-decoration:none;">⚖️ Debtors</a></li>
            </ul></div>`;
        } else {
            // Main Dashboard
            menu = `<div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1); text-align:center;"><h2 style="color:#3498db; margin:0; font-size:1.1rem;">Livingstone Academy</h2></div>
            <ul style="list-style:none; padding:0; flex-grow:1; overflow-y:auto; margin:0;">
                <li style="padding:10px 20px;"><a href="admin_dashboard.html" style="color:white; text-decoration:none; font-size:0.85rem;">📊 Dashboard</a></li>
                <li style="padding:10px 20px;"><a href="student_class_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🎓 Students</a></li>
                <li style="padding:10px 20px;"><a href="staff_teacher_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">👨‍🏫 Staff</a></li>
                <li style="padding:10px 20px;"><a href="fees_accounts_hub.html" style="color:white; text-decoration:none; font-size:0.85rem;">💳 Finance</a></li>
                <li style="padding:10px 20px;"><a href="academic_overview.html" style="color:white; text-decoration:none; font-size:0.85rem;">📝 Academics</a></li>
            </ul>`;
        }
        sb.innerHTML = `<div style="display:flex; flex-direction:column; height:100%; border-right:1px solid rgba(0,0,0,0.1); background:#2c3e50; color:white;">
            ${menu}<div style="padding:12px; background:#c0392b; cursor:pointer; text-align:center; font-weight:bold; color:white; font-size:0.8rem; margin-top:auto;" onclick="api.logout()">Logout 🚪</div></div>`;
    }
};
document.addEventListener('DOMContentLoaded', api.renderSidebar);
