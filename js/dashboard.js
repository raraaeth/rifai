/* =====================================================
   FINANCE DASHBOARD
   FILE : js/dashboard.js
   DESCRIPTION : Dashboard Renderer
===================================================== */


/* =====================================================
   RENDER DASHBOARD
===================================================== */

function renderDashboard(){

    renderHeader();

    renderHeaderDescription();

    renderSummary();

    renderStatistic();

    renderReminder();

    renderFooter();

}


/* =====================================================
   HEADER
===================================================== */

function renderHeader(){

    DOM.headerGreeting.textContent=

    `${

        getGreeting()

    }, Mas Rifai 👋`;

    DOM.headerInsight.textContent=

    randomInsight();

    DOM.dashboardMonthText.textContent=

    formatDate(

        today()

    ).replace(

        /^\d+\s/,

        ""

    );

}

/* =====================================================
   SUMMARY
===================================================== */

function renderSummary(){

    const summary=

    Finance.dashboard.summary;

    DOM.totalIncome.textContent=

    formatCurrency(

        summary.income

    );

    DOM.totalExpense.textContent=

    formatCurrency(

        summary.expense

    );

    DOM.totalBalance.textContent=

    formatCurrency(

        summary.balance

    );

    DOM.savingRate.textContent=

    formatPercent(

        summary.savingRate

    );

}

/* =====================================================
   STATISTIC
===================================================== */

function renderStatistic(){

    const statistic=

    Finance.dashboard.statistic;

    DOM.biggestExpenseCategory.textContent=

    statistic.biggestExpense?.kategori ||

    "-";

    DOM.biggestExpenseValue.textContent=

    formatCurrency(

        statistic.biggestExpense?.nominal || 0

    );

    DOM.biggestIncomeCategory.textContent=

    statistic.biggestIncome?.kategori ||

    "-";

    DOM.biggestIncomeValue.textContent=

    formatCurrency(

        statistic.biggestIncome?.nominal || 0

    );

    DOM.averageExpense.textContent=

    formatCurrency(

        statistic.averageExpense

    );

    DOM.transactionCount.textContent=

    formatNumber(

        statistic.transactionCount

    );

 }

/* =====================================================
   REMINDER
===================================================== */
function renderReminder(){

    const reminders=

    Finance.dashboard.reminder;

    removeChildren(

        DOM.reminderContainer

    );

    if(reminders.length===0){

        DOM.reminderContainer.innerHTML=`

            <div class="reminder-track">

                <div class="reminder-item">

                    ✅ Tidak ada reminder.

                </div>

            </div>

        `;

        return;

    }

    const track=

    createElement(

        "div",

        "reminder-track"

    );

    [...reminders,...reminders].forEach(item=>{

        const element=

        createElement(

            "div",

            "reminder-item",

            `

            <span class="reminder-icon">

    ${item.icon}

</span>

            <span>

                ${item.text}

            </span>

            `

        );

        track.appendChild(

            element

        );

    });

    DOM.reminderContainer.appendChild(

        track

    );

     }



/* =====================================================
   FOOTER
===================================================== */

function renderFooter(){

    DOM.footerMonth.textContent=

    DOM.dashboardMonthText.textContent;

    DOM.lastSync.textContent=

    Finance.lastSync

    ?

    lastSync()

    :

    "-";

}


/* =====================================================
   HEADER DESCRIPTION
===================================================== */

function renderHeaderDescription(){

    const summary=

    Finance.dashboard.summary;

    let text=

    "Mari lihat kondisi keuanganmu hari ini 🫴";

    if(summary.balance>0){

        text=

        "Keuanganmu masih sehat. Pertahankan kebiasaan baikmu 💰";

    }

    else if(summary.balance===0){

        text=

        "Pemasukan dan pengeluaranmu seimbang bulan ini.";

    }

    else{

        text=

        "Pengeluaran lebih besar daripada pemasukan. Yuk evaluasi budget.";

    }

    DOM.headerDescription.textContent=

    text;

}

/* =====================================================
   INITIALIZE DASHBOARD
===================================================== */

function initializeDashboard(){

    hideError();

    hideEmpty();

    renderDashboard();

}


/* =====================================================
   REFRESH DASHBOARD
===================================================== */

function refreshDashboard(){

    renderDashboard();

}


/* =====================================================
   RESET DASHBOARD
===================================================== */

function resetDashboard(){

    DOM.totalIncome.textContent="Rp0";

    DOM.totalExpense.textContent="Rp0";

    DOM.totalBalance.textContent="Rp0";

    DOM.savingRate.textContent="0%";

    DOM.transactionCount.textContent="0";

}


/* =====================================================
   END OF FILE
===================================================== */
