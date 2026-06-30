/* =====================================================
   FINANCE DASHBOARD
   FILE : js/charts.js
   DESCRIPTION : Chart Renderer
===================================================== */


/* =====================================================
   RENDER CHART
===================================================== */

function renderChart(){

    destroyChart();

    createIncomeExpenseChart();

    updateChartSummary();

}


/* =====================================================
   DESTROY CHART
===================================================== */

function destroyChart(){

    if(

        Finance.chart.incomeExpense

    ){

        Finance.chart.incomeExpense.destroy();

        Finance.chart.incomeExpense=null;

    }

}


/* =====================================================
   CREATE INCOME EXPENSE CHART
===================================================== */

function createIncomeExpenseChart(){

    const chart=

    Finance.dashboard.chart;

    Finance.chart.incomeExpense=

    new Chart(

        DOM.incomeExpenseChart,

        {

            type:"bar",

            data:{

                labels:

                chart.map(

                    item=>item.month

                ),

                datasets:[

                    {

                        label:"Pemasukan",

                        data:

                        chart.map(

                            item=>item.income

                        ),

                        backgroundColor:"#10B981",

                        borderRadius:8

                    },

                    {

                        label:"Pengeluaran",

                        data:

                        chart.map(

                            item=>item.expense

                        ),

                        backgroundColor:"#EF4444",

                        borderRadius:8

                    }

                ]

            },

            options:getChartOptions()

        }

    );

}

/* =====================================================
   CHART OPTIONS
===================================================== */

function getChartOptions(){

    return{

        responsive:true,

        maintainAspectRatio:false,

        interaction:{

            mode:"index",

            intersect:false

        },

        plugins:{

            legend:{

                display:true,

                position:"top",

                labels:{

                    usePointStyle:true,

                    boxWidth:10

                }

            },

            tooltip:{

                callbacks:{

                    label(context){

                        return `${

                            context.dataset.label

                        }: ${

                            formatCurrency(

                                context.raw

                            )

                        }`;

                    }

                }

            }

        },

        scales:{

            x:{

                grid:{

                    display:false

                }

            },

            y:{

                beginAtZero:true,

                ticks:{

                    callback(value){

                        return compactMoney(value);

                    }

                }

            }

        }

    };

}

/* =====================================================
   CHART SUMMARY
===================================================== */

function updateChartSummary(){

    const summary = Finance.dashboard.chartSummary;

    setChartText(

        DOM.chartIncome,

        formatCurrency(

            summary.income

        )

    );

    setChartText(

        DOM.chartExpense,

        formatCurrency(

            summary.expense

        )

    );

    setChartText(

        DOM.chartBalance,

        formatCurrency(

            summary.balance

        )

    );

}


/* =====================================================
   CHART TEXT
===================================================== */

function setChartText(

    element,

    value

){

    if(!element){

        return;

    }

    element.textContent=value;

}

/* =====================================================
   INITIALIZE CHART
===================================================== */

function initializeChart(){

    if(

        !Finance.dashboard.chart ||

        Finance.dashboard.chart.length===0

    ){

        return;

    }

    renderChart();

}


/* =====================================================
   REFRESH CHART
===================================================== */

function refreshChart(){

    renderChart();

}


/* =====================================================
   RESET CHART
===================================================== */

function resetChart(){

    destroyChart();

    setChartText(

        DOM.chartIncome,

        "Rp0"

    );

    setChartText(

        DOM.chartExpense,

        "Rp0"

    );

    setChartText(

        DOM.chartBalance,

        "Rp0"

    );

}


/* =====================================================
   END OF FILE
===================================================== */

