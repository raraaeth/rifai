/* =====================================================
   FINANCE DASHBOARD
   FILE : js/process.js
   DESCRIPTION : Data Processor
===================================================== */

/* =====================================================
   PROCESS DATA
===================================================== */

function processData(){

    processTransaction();

    loadPlanning();

    processSummary();

    processStatistic();

}


/* =====================================================
   TRANSACTION
===================================================== */

function processTransaction(){

    Finance.data.transaksi =

    [...Finance.raw.transaksi];

}


/* =====================================================
   LOAD PLANNING DATA
===================================================== */

function loadPlanning(){

    Finance.data.planning =

    [...Finance.raw.planning];

}

/* =====================================================
   SUMMARY
===================================================== */

function processSummary(){

    const transaksi=

    Finance.data.transaksi;

    const income=

    transaksi

    .filter(

        item=>

        item.jenis===CATEGORY.INCOME

    )

    .reduce(

        (total,item)=>

        total+

        toNumber(

            item.nominal

        ),

        0

    );

    const expense=

    transaksi

    .filter(

        item=>

        item.jenis===CATEGORY.EXPENSE

    )

    .reduce(

        (total,item)=>

        total+

        toNumber(

            item.nominal

        ),

        0

    );

    const balance=

    income-expense;

    const savingRate=

    income===0

    ? 0

    :

    (

        balance/

        income

    )*100;

    Finance.dashboard.summary={

        income,

        expense,

        balance,

        savingRate

    };

}

/* =====================================================
   STATISTIC
===================================================== */

function processStatistic(){

    const transaksi=

    Finance.data.transaksi;

    const income=

    transaksi.filter(

        item=>

        item.jenis===CATEGORY.INCOME

    );

    const expense=

    transaksi.filter(

        item=>

        item.jenis===CATEGORY.EXPENSE

    );

    const biggestIncome=

    sortNominalDesc(

        income

    )[0] || {};

    const biggestExpense=

    sortNominalDesc(

        expense

    )[0] || {};

    const averageExpense=

    expense.length===0

    ? 0

    :

    sumBy(

        expense,

        "nominal"

    ) / expense.length;

    Finance.dashboard.statistic={

        transactionCount:

        transaksi.length,

        biggestIncome,

        biggestExpense,

        averageExpense

    };

}

/* =====================================================
   CHART
===================================================== */

function processChart(){

    const transaksi=

    Finance.data.transaksi;

    const grouped={};

    transaksi.forEach(item=>{

        const date=

        new Date(item.tanggal);

        const key=

        `${

            date.getFullYear()

        }-${

            String(

                date.getMonth()+1

            ).padStart(2,"0")

        }`;

        if(!grouped[key]){

            grouped[key]={

                month:key,

                income:0,

                expense:0

            };

        }

        if(

            item.jenis===CATEGORY.INCOME

        ){

            grouped[key].income+=

            item.nominal;

        }

        else{

            grouped[key].expense+=

            item.nominal;

        }

    });

    Finance.dashboard.chart=

    Object.values(grouped)

    .sort(

        (a,b)=>

        a.month.localeCompare(b.month)

    )

    .slice(

        -DASHBOARD.CHART_MONTH

    );

}


/* =====================================================
   PLANNING
===================================================== */

function processPlanning(){

    const planning=

    Finance.data.planning;

    const expense=

    Finance.dashboard.summary.expense;

    const totalBudget=

    sumBy(

        planning,

        "budget"

    );

    const usedPercent=

    totalBudget===0

    ? 0

    :

    (

        expense/

        totalBudget

    )*100;

    const healthScore=

    calculateHealthScore(

        Finance.dashboard.summary.savingRate,

        usedPercent

    );

    Finance.dashboard.planning={

        salary:

        planning[0]?.gaji || 0,

        totalBudget,

        used:expense,
        remaining:

        totalBudget-expense,

        usedPercent,

        healthScore,

        healthLabel:

        getHealthLabel(

            healthScore

        ),

        items:planning

    };

}
/* =====================================================
   REMINDER
===================================================== */

function processReminder(){

    const reminder=[];

    const planning=

    Finance.dashboard.planning;

    if(

        planning.usedPercent>=100

    ){

        reminder.push({

            type:"danger",

            icon:"warning",

            text:"Budget bulan ini telah terlampaui."

        });

    }

    else if(

        planning.usedPercent>=85

    ){

        reminder.push({

            type:"warning",

            icon:"notifications",

            text:"Budget bulan ini hampir habis."

        });

    }

    if(

        Finance.dashboard.summary
        .savingRate<20

    ){

        reminder.push({

            type:"warning",

            icon:"savings",

            text:"Saving Rate masih di bawah target."

        });

    }

    if(

        daysRemaining()<=5

    ){

        reminder.push({

            type:"info",

            icon:"calendar_month",

            text:"Bulan akan segera berakhir."

        });

    }

    Finance.dashboard.reminder=

    reminder;

}


/* =====================================================
   INSIGHT
===================================================== */

function processInsight(){

    Finance.dashboard.insight=[

        {

            title:"Insight Hari Ini",

            description:

            randomInsight()

        }

    ];

}


/* =====================================================
   PROCESS ALL
===================================================== */

function processAll(){

    processTransaction();

    loadPlanning();

    processSummary();

    processStatistic();

    processChart();

    processPlanning();

    processReminder();

    processInsight();

}


/* =====================================================
   END OF FILE
===================================================== */
