/* =====================================================
   FINANCE DASHBOARD
   FILE : js/planning.js
   DESCRIPTION : Planning Renderer
===================================================== */


/* =====================================================
   RENDER PLANNING
===================================================== */

function renderPlanning(){

    renderPlanningSummary();

    updatePlanningHealth()

    renderPlanningList();

}


/* =====================================================
   SUMMARY
===================================================== */

function renderPlanningSummary(){

    const planning=

    Finance.dashboard.planning;

    DOM.budgetSalary.textContent=

    formatCurrency(

        planning.salary

    );

    DOM.budgetTotal.textContent=

    formatCurrency(

        planning.totalBudget

    );

    DOM.budgetUsed.textContent=

    formatCurrency(

        planning.used

    );

    DOM.budgetRemaining.textContent=

    formatCurrency(

        planning.remaining

    );

}

/* =====================================================
   PLANNING LIST
===================================================== */

function renderPlanningList(){

    const planning=

    Finance.dashboard.planning;

    removeChildren(

        DOM.planningContainer

    );

    if(planning.items.length===0){

        DOM.planningContainer.innerHTML=`

        <div class="planning-item">

            Belum ada data planning.

        </div>

        `;

        return;

    }

    planning.items.forEach(item=>{

        renderPlanningItem(item);

    });

}


/* =====================================================
   PLANNING ITEM
===================================================== */

function renderPlanningItem(item){

    const percent=

    item.budget===0

    ? 0

    :

    (

        item.used/

        item.budget

    )*100;

    const element=

    createElement(

        "div",

        "planning-item fade-in"

    );

    element.innerHTML=`

    <div class="planning-info">

        <h3>

            ${capitalize(item.kategori)}

        </h3>

        <p>

            Budget :
            ${formatCurrency(item.budget)}

        </p>

    </div>

    <div class="planning-value">

        <h4>

            ${formatCurrency(item.used)}

        </h4>

        <span>

            ${formatPercent(percent)}

        </span>

    </div>

    <span class="planning-status ${

        getBudgetClass(percent)

    }">

        ${getBudgetStatus(percent)}

    </span>

    `;

    DOM.planningContainer.appendChild(

        element

    );

}

/* =====================================================
   VALIDATION
===================================================== */

function validatePlanning(){

    const planning=

    Finance.dashboard.planning;

    if(

        !planning ||

        planning.items.length===0

    ){

        DOM.planningContainer.innerHTML=`

        <div class="planning-item">

            <p>

                Belum ada data budget.

            </p>

        </div>

        `;

        return false;

    }

    return true;

}


/* =====================================================
   REFRESH
===================================================== */

function refreshPlanning(){

    if(

        !validatePlanning()

    ){

        return;

    }

    renderPlanning();

}


/* =====================================================
   RESET
===================================================== */

function resetPlanning(){

    DOM.budgetSalary.textContent="Rp0";

    DOM.budgetTotal.textContent="Rp0";

    DOM.budgetUsed.textContent="Rp0";

    DOM.budgetRemaining.textContent="Rp0";

    DOM.budgetHealth.textContent="0";

    DOM.budgetHealthStatus.textContent="-";

    DOM.budgetProgress.style.width="0%";

    removeChildren(

        DOM.planningContainer

    );

}

/* =====================================================
   INITIALIZE PLANNING
===================================================== */

function initializePlanning(){

    if(

        !validatePlanning()

    ){

        return;

    }

    renderPlanning();

}


/* =====================================================
   UPDATE HEALTH BAR
===================================================== */

function updatePlanningHealth(){

    const planning=

    Finance.dashboard.planning;

    DOM.budgetProgress.style.width=

    `${planning.usedPercent}%`;

    DOM.budgetProgress.className=

    `progress-bar ${

        getBudgetClass(

            planning.usedPercent

        )

    }`;

}


/* =====================================================
   UPDATE PLANNING
===================================================== */

function updatePlanning(){

    refreshPlanning();

}


/* =====================================================
   END OF FILE
===================================================== */




