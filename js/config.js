/* =====================================================
   FINANCE DASHBOARD
   FILE : js/config.js
   DESCRIPTION : Configuration
===================================================== */


/* =====================================================
   APPLICATION
===================================================== */

const APP={

    NAME:"Finance Dashboard",

    VERSION:"2.0.0",

    AUTHOR:"Ainur",

    LOCALE:"id-ID",

    CURRENCY:"IDR"

};


/* =====================================================
   GOOGLE SHEETS
===================================================== */

const SHEET={

    ID:

    "19-mq1MdlveqoRNVWeYz5tYISOuW7sRWqxuaX-KdeyeU",

    TRANSACTION:

    "transaksi",

    PLANNING:

    "planning"

};


/* =====================================================
   API
===================================================== */

const API={

    BASE:

    "https://opensheet.elk.sh",

    transaksi(){

        return `${

            this.BASE

        }/${
            SHEET.ID
        }/${
            SHEET.TRANSACTION
        }`;

    },

    planning(){

        return `${

            this.BASE

        }/${
            SHEET.ID
        }/${
            SHEET.PLANNING
        }`;

    }

};


/* =====================================================
   DASHBOARD
===================================================== */

const DASHBOARD={

    HISTORY_LIMIT:10,

    CHART_MONTH:3,

    DEFAULT_MONTH:

    getCurrentMonth(),

    DEFAULT_CATEGORY:"all",

    DEFAULT_SORT:"newest"

};


/* =====================================================
   CATEGORY
===================================================== */

const CATEGORY={

    INCOME:"masuk",

    EXPENSE:"keluar",

    SAVING:"tabungan",

    WIFE:"nafkah istri"

};

/* =====================================================
   EXCLUDED CATEGORY
===================================================== */

const EXCLUDED_CATEGORY=[

    "nafkah istri",

    "ortu"

];
/* =====================================================
   APPLICATION STATE
===================================================== */

const Finance={

    /* ======================================
       RAW DATA
    ====================================== */

    raw:{

        transaksi:[],

        planning:[]

    },


    /* ======================================
       PROCESSED DATA
    ====================================== */

    data:{

        transaksi:[],

        planning:[]

    },


    /* ======================================
       DASHBOARD
    ====================================== */

    dashboard:{

        summary:{

            income:0,

            expense:0,

            balance:0,

            savingRate:0

        },

        statistic:{},

        chart:[],

        reminder:[],

        insight:[]

    },


    /* ======================================
       FILTER
    ====================================== */

    filter:{

        month:

        DASHBOARD.DEFAULT_MONTH,

        category:

        DASHBOARD.DEFAULT_CATEGORY,

        search:"",

        sort:

        DASHBOARD.DEFAULT_SORT

    },
   
/* ======================================
   CHART INSTANCE
====================================== */

chart:{

    incomeExpense:null

},

    /* ======================================
       STATUS
    ====================================== */

    loading:false,

    ready:false,

    error:null,

    lastSync:null

};

/* =====================================================
   DOM CACHE
===================================================== */

const DOM={

    /* ======================================
       HEADER
    ====================================== */

    headerGreeting:$("#headerGreeting"),

    headerDescription:$("#headerDescription"),

    headerInsight:$("#headerInsight"),

    dashboardMonthText:$("#dashboardMonthText"),


    /* ======================================
       SUMMARY
    ====================================== */

    totalIncome:$("#totalIncome"),

    totalExpense:$("#totalExpense"),

    totalBalance:$("#totalBalance"),

    savingRate:$("#savingRate"),


    /* ======================================
       CHART
    ====================================== */

    incomeExpenseChart:$("#incomeExpenseChart"),

    chartIncome:$("#chartIncome"),

    chartExpense:$("#chartExpense"),

    chartBalance:$("#chartBalance"),


    /* ======================================
       STATISTICS
    ====================================== */

    biggestExpenseCategory:$("#biggestExpenseCategory"),

    biggestExpenseValue:$("#biggestExpenseValue"),

    biggestIncomeCategory:$("#biggestIncomeCategory"),

    biggestIncomeValue:$("#biggestIncomeValue"),

    averageExpense:$("#averageExpense"),

    transactionCount:$("#transactionCount"),


    /* ======================================
       PLANNING
    ====================================== */

    budgetSalary:$("#budgetSalary"),

    budgetTotal:$("#budgetTotal"),

    budgetUsed:$("#budgetUsed"),

    budgetRemaining:$("#budgetRemaining"),

    budgetHealth:$("#budgetHealth"),

    budgetHealthStatus:$("#budgetHealthStatus"),

    budgetProgress:$("#budgetProgress"),

    planningContainer:$("#planningContainer"),


    /* ======================================
       INSIGHT
    ====================================== */

    insightContainer:$("#insightContainer"),


    /* ======================================
       REMINDER
    ====================================== */

    reminderContainer:$("#reminderContainer"),


    /* ======================================
       TRANSACTION
    ====================================== */

    transactionBadge:$("#transactionBadge"),

    transactionMonth:$("#transactionMonth"),

    categoryFilter:$("#categoryFilter"),

    transactionSearch:$("#transactionSearch"),

    transactionSort:$("#transactionSort"),

    transactionTable:$("#transactionTable"),

    mobileTransaction:$("#mobileTransaction"),

    showMore:$("#showMore"),


    /* ======================================
       FOOTER
    ====================================== */

    footerMonth:$("#footerMonth"),

    lastSync:$("#lastSync")

};

