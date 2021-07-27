/**
 * Foreign Exchange rates US $ base currency
 */

// configure grid
const fxColumnDefs = [
    { field: "currency",  filter: true, sortable: true },
    { field: "quote", filter: true, sortable: true },
];

const fxGridOptions = {
    columnDefs: fxColumnDefs,
    rowSelection: 'multiple'
};

// build grid
const fxGridDiv = document.querySelector('#fxGrid');
new agGrid.Grid(fxGridDiv, fxGridOptions);
getFxRates();

// function to fet FX Rate data from FinnHub
async function getFxRates() {
    const data = await agGrid.simpleHttpRequest({
        url: 'https://finnhub.io/api/v1/forex/rates?base=USD&token=c162mdv48v6ootkka5hg'
    });

    let processedData = Object.keys(data.quote).map((key) => { 
        return { currency: key, quote: `$${data.quote[key]}` }
    });

    fxGridOptions.api.setRowData(processedData);
}