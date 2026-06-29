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

    processPlanning();

    processSummary();

    processStatistic();

}


/* =====================================================
   TRANSACTION
===================================================== */

function processTransaction(){

    Finance.data.transaksi=

    [...Finance.raw.transaksi];

}


/* =====================================================
   PLANNING
===================================================== */

function processPlanning(){

    Finance.data.planning=

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
