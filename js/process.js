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
   
   console.log("Finance.filter.month =", Finance.filter.month);


    /* ==========================
       Planning Bulan Aktif
    ========================== */

    const planning =

    Finance.data.planning.filter(

        item=>item.Bulan===month

    );
   console.log("Planning =", planning);


    /* ==========================
       Transaksi Bulan Aktif
    ========================== */

    const transaksi =

    Finance.data.transaksi.filter(

        item=>

        item.tanggal.startsWith(month)

    );
console.log("Transaksi =", transaksi);
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

    const summary=

    Finance.dashboard.summary;

    /* ======================================
       OVER BUDGET
    ====================================== */

    planning.items

    .filter(item=>item.used>item.budget)

    .forEach(item=>{

        reminder.push({

            type:"danger",

            icon:"🚨",

            text:

            `${capitalize(item.kategori)} melebihi budget sebesar ${

                formatCurrency(

                    item.used-item.budget

                )

            }.`

        });

    });

    /* ======================================
       HAMPIR HABIS
    ====================================== */

    planning.items

    .filter(item=>

        item.used<=item.budget &&

        item.budget>0 &&

        (item.used/item.budget)>=0.85

    )

    .forEach(item=>{

        reminder.push({

            type:"warning",

            icon:"⚠️",

            text:

            `Budget ${capitalize(

                item.kategori

            )} telah digunakan ${

                Math.round(

                    item.used/item.budget*100

                )

            }%.`

        });

    });

    /* ======================================
       SAVING RATE
    ====================================== */

    if(summary.savingRate<20){

        reminder.push({

            type:"warning",

            icon:"💰",

            text:

            `Saving Rate masih ${

                Math.round(

                    summary.savingRate

                )

            }%. Target minimal 20%.`

        });

    }

    /* ======================================
       AKHIR BULAN
    ====================================== */

    if(daysRemaining()<=5){

        reminder.push({

            type:"info",

            icon:"📅",

            text:

            `Bulan ini tinggal ${

                daysRemaining()

            } hari lagi.`

        });

    }

    /* ======================================
       KONDISI AMAN
    ====================================== */

    if(reminder.length===0){

        reminder.push({

            type:"success",

            icon:"🎉",

            text:

            "Seluruh budget masih sesuai rencana. Pertahankan!"

        });

    }

    Finance.dashboard.reminder=

    reminder.slice(0,5);

}



/* =====================================================
   INSIGHT
===================================================== */

function processInsight(){

    const insights=[];

    const summary=

    Finance.dashboard.summary;

    const statistic=

    Finance.dashboard.statistic;

    const planning=

    Finance.dashboard.planning;

    /* ======================================
       TOTAL PENGELUARAN PRODUKTIF
       (EXCLUDE NAFKAH ISTRI & ORTU)
    ====================================== */

    const productiveExpense=

    Finance.data.transaksi

    .filter(item=>

        item.jenis===CATEGORY.EXPENSE &&

        !EXCLUDED_CATEGORY.includes(

            item.kategori

        )

    )

    .reduce(

        (total,item)=>

        total+

        toNumber(item.nominal),

        0

    );

    /* ======================================
       PENGELUARAN TERBESAR
    ====================================== */

    if(statistic.biggestExpense?.kategori){

        const expensePercent=

        productiveExpense===0

        ? 0

        :

        (

            toNumber(

                statistic.biggestExpense.nominal

            )

            /

            productiveExpense

        )*100;

        insights.push({

            icon:"💰",

            title:"Pengeluaran Terbesar",

            description:

            `${capitalize(

                statistic.biggestExpense.kategori

            )} merupakan pengeluaran terbesar bulan ini sebesar ${

                formatCurrency(

                    statistic.biggestExpense.nominal

                )

            } (${Math.round(

                expensePercent

            )}% dari total pengeluaran produktif).`

        });

    }

    /* ======================================
       SAVING RATE
    ====================================== */

    if(summary.savingRate>=30){

        insights.push({

            icon:"📈",

            title:"Saving Rate",

            description:

            `Saving Rate mencapai ${

                Math.round(

                    summary.savingRate

                )

            }%. Kondisi keuangan sangat sehat.`

        });

    }

    else if(summary.savingRate>=20){

        insights.push({

            icon:"✅",

            title:"Saving Rate",

            description:

            `Saving Rate ${

                Math.round(

                    summary.savingRate

                )

            }%. Target bulan ini berhasil dicapai.`

        });

    }

    else{

        insights.push({

            icon:"⚠️",

            title:"Saving Rate",

            description:

            `Saving Rate hanya ${

                Math.round(

                    summary.savingRate

                )

            }%. Sebaiknya kurangi pengeluaran agar target tabungan tercapai.`

        });

    }

    /* ======================================
       PLANNING
    ====================================== */

    if(planning.items.length){

        const highest=

        [...planning.items]

        .sort(

            (a,b)=>

            (b.used/b.budget)-

            (a.used/a.budget)

        )[0];

        const percent=

        highest.budget===0

        ? 0

        :

        (

            highest.used/

            highest.budget

        )*100;

        const remaining=

        Math.max(

            highest.budget-

            highest.used,

            0

        );

        insights.push({

            icon:"🎯",

            title:"Planning Budget",

            description:

            `Budget ${capitalize(

                highest.kategori

            )} telah digunakan ${

                Math.round(percent)

            }% (${formatCurrency(

                highest.used

            )} dari ${formatCurrency(

                highest.budget

            )}). Sisa budget ${

                formatCurrency(

                    remaining

                )

            }.`

        });

    }

    /* ======================================
       CASH FLOW
    ====================================== */

    insights.push({

        icon:"💵",

        title:"Cash Flow",

        description:

        `Total pemasukan ${

            formatCurrency(

                summary.income

            )

        }, pengeluaran ${

            formatCurrency(

                summary.expense

            )

        }, sehingga saldo saat ini ${

            formatCurrency(

                summary.balance

            )

        }.`

    });

    /* ======================================
       AKTIVITAS
    ====================================== */

    const average=

    statistic.transactionCount===0

    ? 0

    :

    summary.expense/

    statistic.transactionCount;

    insights.push({

        icon:"🧾",

        title:"Aktivitas Bulan Ini",

        description:

        `Terdapat ${

            statistic.transactionCount

        } transaksi dengan rata-rata nilai transaksi ${

            formatCurrency(

                average

            )

        }.`

    });

    Finance.dashboard.insight=

    insights.slice(0,5);

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
