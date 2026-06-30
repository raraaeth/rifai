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

    const planning = Finance.dashboard.planning;

    DOM.budgetSalary.textContent =
    formatCurrency(planning.salary);

    DOM.budgetUsed.textContent =
    formatCurrency(planning.used);

    DOM.budgetRemaining.textContent =
    formatCurrency(planning.remaining);

    DOM.budgetHealth.textContent =
    `${Math.round(planning.usedPercent)}%`;

}

/* =====================================================
   PLANNING LIST
===================================================== */

function renderPlanningList(){

    const planning =

    Finance.dashboard.planning;

    removeChildren(

        DOM.planningContainer

    );

    if(planning.items.length===0){

        DOM.planningContainer.innerHTML=`

        <div class="planning-item">

            Belum ada data budget.

        </div>

        `;

        return;

    }

    const card =

    createElement(

        "div",

        "planning-card-list fade-in"

    );

   
let html = "";

const items =

[...planning.items]

.sort(

    (a,b)=>{

        const percentA =

        a.budget===0

        ? 0

        : (a.used/a.budget);

        const percentB =

        b.budget===0

        ? 0

        : (b.used/b.budget);

        return percentB-percentA;

    }

);

items.forEach(item=>{

    const percent =

    item.budget===0

    ? 0

    :

    (item.used/item.budget)*100;

        html += `

        <div class="planning-category-item">

            <div class="planning-category-header">

                <span>

                    ${capitalize(item.kategori)}

                </span>

                <strong>

                    ${Math.round(percent)}%

                </strong>

            </div>

            <div class="progress">

                <div

                    class="progress-bar ${getBudgetClass(percent)}"

                    style="width:${Math.min(percent,100)}%">

                </div>

            </div>

            <div class="planning-category-footer">

    <span>

        ${formatCurrency(item.used)}

        /

        ${formatCurrency(item.budget)}

    </span>

    <strong>

        Sisa

        ${formatCurrency(

            Math.max(

                item.budget-item.used,

                0

            )

        )}

    </strong>

</div>

        </div>

        `;

    });

    card.innerHTML = html;

    DOM.planningContainer.appendChild(card);

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

    DOM.budgetUsed.textContent="Rp0";

    DOM.budgetRemaining.textContent="Rp0";

    DOM.budgetHealth.textContent="0%";

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

    const planning =
    Finance.dashboard.planning;

    DOM.budgetProgress.style.width =
    `${Math.min(planning.usedPercent,100)}%`;

    DOM.budgetProgress.className =
    `progress-bar ${getBudgetClass(planning.usedPercent)}`;

    DOM.budgetHealth.textContent =
    `${Math.round(planning.usedPercent)}%`;

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




