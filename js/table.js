/* =====================================================
   FINANCE DASHBOARD
   FILE : js/table.js
   DESCRIPTION : Transaction Table
===================================================== */


/* =====================================================
   RENDER TABLE
===================================================== */

function renderTable(){

    const transaksi=

    getFilteredTransaction();

    renderDesktopTable(

        transaksi

    );

    renderMobileTable(

        transaksi

    );

    updateTransactionBadge(

        transaksi.length

    );

}


/* =====================================================
   FILTER TRANSACTION
===================================================== */

function getFilteredTransaction(){

    let data=[

        ...Finance.data.transaksi

    ];

    const filter=

    Finance.filter;


    /* ==========================
       MONTH
    ========================== */

    if(

        filter.month!=="all"

    ){

        data=data.filter(item=>

            item.tanggal

            .startsWith(

                filter.month

            )

        );

    }


    /* ==========================
       CATEGORY
    ========================== */

    if(

        filter.category!=="all"

    ){

        data=data.filter(item=>

            item.kategori===

            filter.category

        );

    }


    /* ==========================
       SEARCH
    ========================== */

    if(

        filter.search

    ){

        const keyword=

        filter.search

        .toLowerCase();

        data=data.filter(item=>

            item.keterangan

            .toLowerCase()

            .includes(

                keyword

            )

        );

    }


    /* ==========================
       SORT
    ========================== */

    switch(filter.sort){

        case "oldest":

            data=

            sortDateAsc(

                data

            );

            break;

        case "highest":

            data=

            sortNominalDesc(

                data

            );

            break;

        case "lowest":

            data=

            sortNominalAsc(

                data

            );

            break;

        default:

            data=

            sortDateDesc(

                data

            );

    }

    return data;

}


/* =====================================================
   DESKTOP TABLE
===================================================== */

function renderDesktopTable(

    transaksi

){

    const tbody=

    DOM.transactionTable

    .querySelector("tbody");

    removeChildren(

        tbody

    );

    if(transaksi.length===0){

        tbody.innerHTML=`

        <tr>

            <td colspan="5">

                Tidak ada transaksi.

            </td>

        </tr>

        `;

        return;

    }

    transaksi.forEach(item=>{

        const row=

        document.createElement("tr");

        row.innerHTML=`

        <td>

            ${formatDate(item.tanggal)}

        </td>

        <td>

            <span class="transaction-category">

                ${capitalize(item.kategori)}

            </span>

        </td>

        <td>

            ${item.keterangan}

        </td>

        <td class="${
            item.jenis===CATEGORY.INCOME
            ? "transaction-income"
            : "transaction-expense"
        }">

            ${capitalize(item.jenis)}

        </td>

        <td class="transaction-amount">

            ${formatCurrency(item.nominal)}

        </td>

        `;

        tbody.appendChild(

            row

        );

    });

}


/* =====================================================
   BADGE
===================================================== */

function updateTransactionBadge(

    total

){

    DOM.transactionBadge.textContent=

    `${

        formatNumber(total)

    } Transaksi`;

}

/* =====================================================
   MOBILE TABLE
===================================================== */

function renderMobileTable(

    transaksi

){

    removeChildren(

        DOM.mobileTransaction

    );

    if(transaksi.length===0){

        DOM.mobileTransaction.innerHTML=`

        <div class="card">

            Tidak ada transaksi.

        </div>

        `;

        return;

    }

    transaksi.forEach(item=>{

        const card=

        createElement(

            "div",

            "card transaction-mobile fade-in"

        );

        card.innerHTML=`

        <div class="transaction-mobile-header">

            <span class="transaction-category">

                ${capitalize(item.kategori)}

            </span>

            <strong class="${
                item.jenis===CATEGORY.INCOME
                ? "transaction-income"
                : "transaction-expense"
            }">

                ${formatCurrency(item.nominal)}

            </strong>

        </div>

        <div class="transaction-mobile-body">

            <p>

                ${item.keterangan}

            </p>

        </div>

        <div class="transaction-mobile-footer">

            <span>

                ${formatDate(item.tanggal)}

            </span>

            <span>

                ${capitalize(item.jenis)}

            </span>

        </div>

        `;

        DOM.mobileTransaction

        .appendChild(card);

    });

}

/* =====================================================
   POPULATE FILTER
===================================================== */

function populateFilter(){

    populateMonthFilter();

    populateCategoryFilter();

}


/* =====================================================
   MONTH FILTER
===================================================== */

function populateMonthFilter(){

    removeChildren(

        DOM.transactionMonth

    );

    DOM.transactionMonth.innerHTML=`

        <option value="all">

            Semua Bulan

        </option>

    `;

    const months=

    unique(

        Finance.data.transaksi.map(

            item=>item.tanggal.slice(0,7)

        )

    )

    .sort()

    .reverse();

    months.forEach(month=>{

        const option=

        createElement("option");

        option.value=month;

        option.textContent=month;

        if(

            month===Finance.filter.month

        ){

            option.selected=true;

        }

        DOM.transactionMonth.appendChild(

            option

        );

    });

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function populateCategoryFilter(){

    removeChildren(

        DOM.categoryFilter

    );

    DOM.categoryFilter.innerHTML=`

        <option value="all">

            Semua Kategori

        </option>

    `;

    const categories=

    unique(

        Finance.data.transaksi.map(

            item=>item.kategori

        )

    ).sort();

    categories.forEach(category=>{

        const option=

        createElement("option");

        option.value=category;

        option.textContent=

        capitalize(category);

        if(

            category===Finance.filter.category

        ){

            option.selected=true;

        }

        DOM.categoryFilter.appendChild(

            option

        );

    });

}

/* =====================================================
   EVENT
===================================================== */

function bindTableEvent(){

    DOM.transactionMonth

    .addEventListener(

        "change",

        event=>{

            Finance.filter.month=

            event.target.value;

            renderTable();

        }

    );

    DOM.categoryFilter

    .addEventListener(

        "change",

        event=>{

            Finance.filter.category=

            event.target.value;

            renderTable();

        }

    );

    DOM.transactionSearch

    .addEventListener(

        "input",

        debounce(event=>{

            Finance.filter.search=

            event.target.value.trim();

            renderTable();

        },300)

    );

    DOM.transactionSort

    .addEventListener(

        "change",

        event=>{

            Finance.filter.sort=

            event.target.value;

            renderTable();

        }

    );

}


/* =====================================================
   INITIALIZE TABLE
===================================================== */

function initializeTable(){

    populateFilter();

    bindTableEvent();

    renderTable();

}


/* =====================================================
   REFRESH TABLE
===================================================== */

function refreshTable(){

    renderTable();

}


/* =====================================================
   END OF FILE
===================================================== */


