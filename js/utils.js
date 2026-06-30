/* =====================================================
   FINANCE DASHBOARD
   FILE : js/utils.js
   DESCRIPTION : DOM & UI Helpers
===================================================== */


/* =====================================================
   DOM SELECTOR
===================================================== */

const $ = (selector)=>
document.querySelector(selector);

const $$ = (selector)=>
[
    ...document.querySelectorAll(selector)
];


/* =====================================================
   DOM CONTENT
===================================================== */

function setText(selector,value){

    const element=$(selector);

    if(!element) return;

    element.textContent=value;

}

function setHTML(selector,value){

    const element=$(selector);

    if(!element) return;

    element.innerHTML=value;

}


/* =====================================================
   DOM VISIBILITY
===================================================== */

function show(selector){

    const element=$(selector);

    if(!element) return;

    element.classList.remove("hidden");

}

function hide(selector){

    const element=$(selector);

    if(!element) return;

    element.classList.add("hidden");

}

function toggle(selector){

    const element=$(selector);

    if(!element) return;

    element.classList.toggle("hidden");

}


/* =====================================================
   DOM ELEMENT
===================================================== */

function createElement(

    tag,

    className="",

    html=""

){

    const element=

    document.createElement(tag);

    element.className=className;

    element.innerHTML=html;

    return element;

}

function removeChildren(element){

    while(element.firstChild){

        element.removeChild(

            element.firstChild

        );

    }

}


/* =====================================================
   LOADING
===================================================== */

function showLoading(){

    show("#loadingOverlay");

}

function hideLoading(){

    hide("#loadingOverlay");

}


/* =====================================================
   ERROR
===================================================== */

function showError(message){

    setText(

        "#errorMessage",

        message

    );

    show("#errorState");

}

function hideError(){

    hide("#errorState");

}


/* =====================================================
   EMPTY STATE
===================================================== */

function showEmpty(){

    show("#emptyState");

}

function hideEmpty(){

    hide("#emptyState");

}

/* =====================================================
   FORMAT
===================================================== */

function toNumber(value){

    if(
        value===null ||
        value===undefined ||
        value===""
    ){
        return 0;
    }

    if(typeof value==="number"){
        return value;
    }

    const text = String(value)
        .replace(/Rp/gi,"")
        .replace(/\s/g,"")
        .replace(/\./g,"")
        .replace(",", ".");

    return Number(text) || 0;

}


/* =====================================================
   CURRENCY
===================================================== */

function formatCurrency(value){

    return new Intl.NumberFormat(

        "id-ID",

        {

            style:"currency",

            currency:"IDR",

            maximumFractionDigits:0

        }

    ).format(

        toNumber(value)

    );

}


/* =====================================================
   NUMBER
===================================================== */

function formatNumber(value){

    return new Intl.NumberFormat(

        "id-ID"

    ).format(

        toNumber(value)

    );

}


/* =====================================================
   COMPACT MONEY
===================================================== */

function compactMoney(value){

    value=toNumber(value);

    if(value>=1000000000){

        return `${

            (value/1000000000)

            .toFixed(1)

        } M`;

    }

    if(value>=1000000){

        return `${

            (value/1000000)

            .toFixed(1)

        } Jt`;

    }

    if(value>=1000){

        return `${

            (value/1000)

            .toFixed(1)

        } Rb`;

    }

    return formatNumber(value);

}


/* =====================================================
   PERCENT
===================================================== */

function formatPercent(value){

    return `${

        Number(value)

        .toFixed(1)

    }%`;

}


/* =====================================================
   CAPITALIZE
===================================================== */

function capitalize(text){

    if(!text) return "";

    return text

    .toLowerCase()

    .replace(

        /\b\w/g,

        letter=>letter.toUpperCase()

    );

}

/* =====================================================
   COLLECTION
===================================================== */


/* =====================================================
   GROUP BY
===================================================== */

function groupBy(array,key){

    return array.reduce(

        (result,item)=>{

            const value=item[key] ?? "";

            if(!result[value]){

                result[value]=[];

            }

            result[value].push(item);

            return result;

        },

        {}

    );

}


/* =====================================================
   SUM BY
===================================================== */

function sumBy(array,key){

    return array.reduce(

        (total,item)=>{

            return total +

            toNumber(item[key]);

        },

        0

    );

}


/* =====================================================
   UNIQUE
===================================================== */

function unique(array){

    return [

        ...new Set(array)

    ];

}


/* =====================================================
   SORT DATE DESC
===================================================== */

function sortDateDesc(

    array,

    key="tanggal"

){

    return [...array].sort(

        (a,b)=>

        new Date(b[key])

        -

        new Date(a[key])

    );

}


/* =====================================================
   SORT DATE ASC
===================================================== */

function sortDateAsc(

    array,

    key="tanggal"

){

    return [...array].sort(

        (a,b)=>

        new Date(a[key])

        -

        new Date(b[key])

    );

}


/* =====================================================
   SORT NOMINAL DESC
===================================================== */

function sortNominalDesc(

    array,

    key="nominal"

){

    return [...array].sort(

        (a,b)=>

        toNumber(b[key])

        -

        toNumber(a[key])

    );

}


/* =====================================================
   SORT NOMINAL ASC
===================================================== */

function sortNominalAsc(

    array,

    key="nominal"

){

    return [...array].sort(

        (a,b)=>

        toNumber(a[key])

        -

        toNumber(b[key])

    );

}

/* =====================================================
   DATE
===================================================== */


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date){

    if(!date) return "-";

    return new Date(date)

    .toLocaleDateString(

        "id-ID",

        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }

    );

}


/* =====================================================
   SHORT DATE
===================================================== */

function shortDate(date){

    if(!date) return "-";

    return new Date(date)

    .toLocaleDateString(

        "id-ID",

        {

            day:"2-digit",

            month:"short"

        }

    );

}


/* =====================================================
   TODAY
===================================================== */

function today(){

    return new Date()

    .toISOString()

    .slice(0,10);

}


/* =====================================================
   MONTH NAME
===================================================== */

function monthName(month){

    const months=[

        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"

    ];

    return months[month-1] || "-";

}


/* =====================================================
   CURRENT MONTH
===================================================== */

function getCurrentMonth(){

    const date=new Date();

    return `${

        date.getFullYear()

    }-${

        String(

            date.getMonth()+1

        ).padStart(2,"0")

    }`;

}


/* =====================================================
   DAYS REMAINING
===================================================== */

function daysRemaining(){

    const now=new Date();

    const lastDay=new Date(

        now.getFullYear(),

        now.getMonth()+1,

        0

    );

    return (

        lastDay.getDate()

        -

        now.getDate()

    );

}


/* =====================================================
   GREETING
===================================================== */

function getGreeting(){

    const hour=new Date().getHours();

    if(hour<11){

        return "Selamat Pagi";

    }

    if(hour<15){

        return "Selamat Siang";

    }

    if(hour<18){

        return "Selamat Sore";

    }

    return "Selamat Malam";

}


/* =====================================================
   LAST SYNC
===================================================== */

function lastSync(){

    return new Date()

    .toLocaleString(

        "id-ID",

        {

            dateStyle:"long",

            timeStyle:"short"

        }

    );

  }

/* =====================================================
   BUDGET
===================================================== */


/* =====================================================
   BUDGET STATUS
===================================================== */

function getBudgetStatus(percent){

    if(percent<60){

        return "Aman";

    }

    if(percent<85){

        return "Waspada";

    }

    if(percent<=100){

        return "Hampir Habis";

    }

    return "Melebihi Budget";

}


/* =====================================================
   BUDGET CLASS
===================================================== */

function getBudgetClass(percent){

    if(percent<60){

        return "safe";

    }

    if(percent<85){

        return "warning";

    }

    if(percent<=100){

        return "danger";

    }

    return "over";

}


/* =====================================================
   HEALTH SCORE
===================================================== */

function calculateHealthScore(

    savingRate,

    budgetUsed

){

    let score=100;

    score-=Math.max(

        0,

        budgetUsed-100

    )*0.5;

    score-=Math.max(

        0,

        20-savingRate

    )*1;

    return Math.max(

        0,

        Math.min(

            100,

            Math.round(score)

        )

    );

}


/* =====================================================
   HEALTH LABEL
===================================================== */

function getHealthLabel(score){

    if(score>=90){

        return "Sangat Sehat";

    }

    if(score>=75){

        return "Sehat";

    }

    if(score>=60){

        return "Cukup";

    }

    if(score>=40){

        return "Perlu Perhatian";

    }

    return "Kurang Sehat";

}


/* =====================================================
   RANDOM INSIGHT
===================================================== */

function randomInsight(){

    const insights=[

        "Pengeluaran kecil yang konsisten sering kali lebih besar dampaknya daripada satu pengeluaran besar.",

        "Sisihkan tabungan di awal bulan, bukan di akhir bulan.",

        "Evaluasi pengeluaran mingguan membantu menjaga budget tetap sehat.",

        "Pastikan kebutuhan selalu didahulukan dibanding keinginan.",

        "Target keuangan yang realistis lebih mudah dicapai.",

        "Catatan keuangan yang rapi akan memudahkan mengambil keputusan.",

        "Menjaga cash flow positif lebih penting daripada sekadar meningkatkan pemasukan.",

        "Disiplin terhadap budget adalah kunci keuangan yang sehat."

    ];

    return insights[

        Math.floor(

            Math.random()

            * insights.length

        )

    ];

}

/* =====================================================
   PERFORMANCE
===================================================== */


/* =====================================================
   SLEEP
===================================================== */

function sleep(ms){

    return new Promise(

        resolve=>

        setTimeout(

            resolve,

            ms

        )

    );

}


/* =====================================================
   DEBOUNCE
===================================================== */

function debounce(

    callback,

    delay=300

){

    let timeout;

    return (...args)=>{

        clearTimeout(timeout);

        timeout=setTimeout(

            ()=>{

                callback(...args);

            },

            delay

        );

    };

}


/* =====================================================
   THROTTLE
===================================================== */

function throttle(

    callback,

    limit=250

){

    let waiting=false;

    return (...args)=>{

        if(waiting){

            return;

        }

        callback(...args);

        waiting=true;

        setTimeout(

            ()=>{

                waiting=false;

            },

            limit

        );

    };

}


/* =====================================================
   CSV EXPORT
===================================================== */

function downloadCSV(

    filename,

    content

){

    const blob=new Blob(

        [content],

        {

            type:"text/csv"

        }

    );

    const url=

    URL.createObjectURL(blob);

    const link=

    document.createElement("a");

    link.href=url;

    link.download=filename;

    link.click();

    URL.revokeObjectURL(url);

}


/* =====================================================
   VALIDATION
===================================================== */

function isEmpty(value){

    return (

        value===null ||

        value===undefined ||

        value===""

    );

}

function isNumber(value){

    return !Number.isNaN(

        Number(value)

    );

}


/* =====================================================
   END OF FILE
===================================================== */
