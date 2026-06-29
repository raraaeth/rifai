/* =====================================================
   FINANCE DASHBOARD
   FILE : js/events.js
   DESCRIPTION : Global Events
===================================================== */


/* =====================================================
   BIND GLOBAL EVENTS
===================================================== */

function bindGlobalEvents(){

    bindRefreshEvent();

    bindWindowEvents();

}


/* =====================================================
   REFRESH BUTTON
===================================================== */

function bindRefreshEvent(){

    const button=

    document.querySelector(

        "#refreshButton"

    );

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        async()=>{

            await refreshApplication();

        }

    );

}


/* =====================================================
   WINDOW EVENTS
===================================================== */

function bindWindowEvents(){

    window.addEventListener(

        "online",

        ()=>{

            console.log(

                "Internet Connected"

            );

        }

    );

    window.addEventListener(

        "offline",

        ()=>{

            console.log(

                "Internet Disconnected"

            );

        }

    );

}

/* =====================================================
   VISIBILITY
===================================================== */

function bindVisibilityEvent(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(

                document.hidden

            ){

                return;

            }

            refreshUI();

        }

    );

}


/* =====================================================
   RESIZE
===================================================== */

function bindResizeEvent(){

    window.addEventListener(

        "resize",

        debounce(

            ()=>{

                refreshChart();

            },

            300

        )

    );

}


/* =====================================================
   INITIALIZE EVENTS
===================================================== */

function initializeEvents(){

    bindGlobalEvents();

    bindVisibilityEvent();

    bindResizeEvent();

}


/* =====================================================
   END OF FILE
===================================================== */
