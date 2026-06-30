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

    const expense =

transaksi.filter(item=>

    item.jenis===CATEGORY.EXPENSE &&

    item.kategori!==CATEGORY.WIFE &&

    item.kategori!=="ortu"

);

    const biggestIncome=

    sortNominalDesc(

        income

    )[0] || {};

    const biggestExpense=

    sortNominalDesc(

        expense

    )[0] || {};

    const totalExpense =

    expense.reduce(

    (total,item)=>

    total + toNumber(item.nominal),

    0

);

const averageExpense =

expense.length===0

? 0

: totalExpense / expense.length;

   console.log(totalExpense);
console.log(expense.length);
console.log(averageExpense);

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

    const transaksi =

    Finance.data.transaksi;

    const grouped = {};

    transaksi.forEach(item=>{

        const date =

        new Date(item.tanggal);

        const key =

        `${date.getFullYear()}-${String(
            date.getMonth()+1
        ).padStart(2,"0")}`;

        if(!grouped[key]){

            grouped[key]={

                month:key,

                income:0,

                expense:0

            };

        }

        if(item.jenis===CATEGORY.INCOME){

            grouped[key].income +=

            toNumber(item.nominal);

        }

        else if(item.jenis===CATEGORY.EXPENSE){

            grouped[key].expense +=

            toNumber(item.nominal);

        }

    });

    const chartData =

    Object.values(grouped)

    .sort(

        (a,b)=>a.month.localeCompare(b.month)

    )

    .slice(

        -DASHBOARD.CHART_MONTH

    );

    Finance.dashboard.chart = chartData;

    Finance.dashboard.chartSummary = {

        income: chartData.reduce(

            (total,item)=>total+item.income,

            0

        ),

        expense: chartData.reduce(

            (total,item)=>total+item.expense,

            0

        ),

        balance: chartData.reduce(

            (total,item)=>

            total+(item.income-item.expense),

            0

        )

    };

}

/* =====================================================
   PLANNING
===================================================== */

function processPlanning(){

    const month = Finance.filter.month;

    /* ==========================
       Planning Bulan Aktif
    ========================== */

    const planning =

    Finance.data.planning.filter(

        item=>item.Bulan===month

    );

    /* ==========================
       Transaksi Bulan Aktif
    ========================== */

    const transaksi =

    Finance.data.transaksi.filter(

        item=>

        item.tanggal.startsWith(month)

    );

    /* ==========================
       Gaji Bulan Aktif
    ========================== */

    const salary =

    transaksi

    .filter(

        item=>

        item.jenis===CATEGORY.INCOME &&

        item.kategori==="gaji"

    )

    .reduce(

        (total,item)=>

        total+toNumber(item.nominal),

        0

    );

    /* ==========================
       Total Pengeluaran
    ========================== */

    const used =

    transaksi

    .filter(

        item=>

        item.jenis===CATEGORY.EXPENSE

    )

    .reduce(

        (total,item)=>

        total+toNumber(item.nominal),

        0

    );

    /* ==========================
       Total Budget
    ========================== */

    const totalBudget =

    planning.reduce(

        (total,item)=>

        total+toNumber(item.Budget),

        0

    );

    /* ==========================
       Hitung Pengeluaran
       Per Kategori
    ========================== */

    const items =

    planning.map(plan=>{

        const category =

        plan.Kategori.toLowerCase();

        const budget =

        toNumber(plan.Budget);

        const used =

        transaksi

        .filter(

            item=>

            item.jenis===CATEGORY.EXPENSE &&

            item.kategori.toLowerCase()===category

        )

        .reduce(

            (total,item)=>

            total+toNumber(item.nominal),

            0

        );

        return{

            kategori:plan.Kategori,

            budget,

            used

        };

    });

    /* ==========================
       Financial Health
    ========================== */

    const usedPercent =

    totalBudget===0

    ? 0

    : (used/totalBudget)*100;

    const healthScore =

    calculateHealthScore(

        Finance.dashboard.summary.savingRate,

        usedPercent

    );

    Finance.dashboard.planning={

        salary,

        totalBudget,

        used,

        remaining:

        totalBudget-used,

        usedPercent,

        healthScore,

        items

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
