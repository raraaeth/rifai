/* =====================================================
   FINANCE DASHBOARD
   FILE : js/api.js
   DESCRIPTION : API Service
===================================================== */


/* =====================================================
   FETCH JSON
===================================================== */

async function fetchJSON(url){

    const response=

    await fetch(url);

    if(!response.ok){

        throw new Error(

            `HTTP ${response.status}`

        );

    }

    return await response.json();

}


/* =====================================================
   FETCH TRANSACTION
===================================================== */

async function fetchTransaction(){

    const data=

    await fetchJSON(

        API.transaksi()

    );

    Finance.raw.transaksi=data;

}


/* =====================================================
   FETCH PLANNING
===================================================== */

async function fetchPlanning(){

    const data=

    await fetchJSON(

        API.planning()

    );

    Finance.raw.planning=data;

}

/* =====================================================
   LOAD DATA
===================================================== */

async function loadData(){

    try{

        Finance.loading=true;

        showLoading();

        await Promise.all([

            fetchTransaction(),

            fetchPlanning()

        ]);

        Finance.lastSync=

        new Date();

        Finance.ready=true;

        Finance.error=null;

    }

    catch(error){

        console.error(error);

        Finance.error=error;

        showError(

            "Gagal mengambil data dari Google Spreadsheet."

        );

        throw error;

    }

    finally{

        Finance.loading=false;

        hideLoading();

    }

}

/* =====================================================
   VALIDATION
===================================================== */

function validateArray(

    data,

    name

){

    if(

        !Array.isArray(data)

    ){

        throw new Error(

            `${name} is not valid.`

        );

    }

    return data;

}


/* =====================================================
   REFRESH DATA
===================================================== */

async function refreshData(){

    await loadData();

}


/* =====================================================
   CLEAR DATA
===================================================== */

function clearData(){

    Finance.raw.transaksi=[];

    Finance.raw.planning=[];

    Finance.data.transaksi=[];

    Finance.data.planning=[];

}


/* =====================================================
   INITIALIZE API
===================================================== */

async function initializeAPI(){

    clearData();

    await loadData();

}


/* =====================================================
   END OF FILE
===================================================== */
