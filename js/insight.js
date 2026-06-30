/* =====================================================
   FINANCE DASHBOARD
   FILE : js/insight.js
   DESCRIPTION : Insight Renderer
===================================================== */


/* =====================================================
   RENDER INSIGHT
===================================================== */

function renderInsight(){

    const insights=

    Finance.dashboard.insight;

    removeChildren(

        DOM.insightContainer

    );

    if(

        insights.length===0

    ){

        renderEmptyInsight();

        return;

    }

    insights.forEach(item=>{

        renderInsightCard(item);

    });

}
/* =====================================================
   INSIGHT CARD
===================================================== */

function renderInsightCard(item){

    const card=

    createElement(

        "div",

        "insight-card fade-in"

    );

    card.innerHTML=`

    <div class="insight-icon">

        ${item.icon || "💡"}

    </div>

    <div class="insight-content">

        <h3>

            ${item.title}

        </h3>

        <p>

            ${item.description}

        </p>

    </div>

    `;

    DOM.insightContainer.appendChild(

        card

    );

}

/* =====================================================
   EMPTY INSIGHT
===================================================== */

function renderEmptyInsight(){

    const card=

    createElement(

        "div",

        "insight-card"

    );

    card.innerHTML=`

    <div class="insight-icon">

        📊

    </div>

    <div class="insight-content">

        <h3>

            Belum Ada Insight

        </h3>

        <p>

            Insight akan muncul setelah data berhasil diproses.

        </p>

    </div>

    `;

    DOM.insightContainer.appendChild(

        card

    );

}


/* =====================================================
   REFRESH INSIGHT
===================================================== */

function refreshInsight(){

    renderInsight();

}

/* =====================================================
   INITIALIZE INSIGHT
===================================================== */

function initializeInsight(){

    renderInsight();

}


/* =====================================================
   RESET INSIGHT
===================================================== */

function resetInsight(){

    removeChildren(

        DOM.insightContainer

    );

    renderEmptyInsight();

}


/* =====================================================
   UPDATE INSIGHT
===================================================== */

function updateInsight(){

    refreshInsight();

}


/* =====================================================
   END OF FILE
===================================================== */
