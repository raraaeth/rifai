/* =====================================================
   FINANCE DASHBOARD
   FILE : js/main.js
   DESCRIPTION : Application Entry Point
===================================================== */


/* =====================================================
   INITIALIZE APPLICATION
===================================================== */

async function initializeApplication(){

    try{

        showLoading();

        await initializeAPI();

        processAll();

        initializeUI();

        initializeEvents();

        hideLoading();

        console.log(

            `${APP.NAME} v${APP.VERSION} Ready`

        );

    }

    catch(error){

        console.error(error);

        showError(

            "Gagal memuat dashboard."

        );

    }

}

/* =====================================================
   REFRESH APPLICATION
===================================================== */

async function refreshApplication(){

    await initializeApplication();

}

/* =====================================================
   RESET APPLICATION
===================================================== */

function resetApplication(){

    clearData();

    resetUI();

}


/* =====================================================
   RELOAD APPLICATION
===================================================== */

async function reloadApplication(){

    resetApplication();

    await initializeApplication();

}


/* =====================================================
   APPLICATION READY
===================================================== */

function applicationReady(){

    return (

        Finance.ready===true &&

        Finance.error===null

    );

}

/* =====================================================
   AUTO START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    async()=>{

        await initializeApplication();

    }

);


/* =====================================================
   GLOBAL
===================================================== */

window.App={

    initialize:

    initializeApplication,

    refresh:

    refreshApplication,

    reload:

    reloadApplication,

    reset:

    resetApplication,

    ready:

    applicationReady

};


/* =====================================================
   END OF FILE
===================================================== */

