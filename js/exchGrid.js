/**
 * FX symbols by exchange 
 * Populates form with available exchanges
 * Once an exchange is chosen, populates chard with avail FX symbols
 */

// FinnHub API key
const key = 'c162mdv48v6ootkka5hg';

const exchColumnDefs = [
    { field: "symbol",  filter: true},
    { field: "displaySymbol", filter: true },
    { field: "description", filter: true }
];

// let the grid know which columns and what data to use
const exchGridOptions = {
    columnDefs: exchColumnDefs,
    //rowData: rowData,
    rowSelection: 'multiple'
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const exchGridDiv = document.querySelector('#exchGrid');
    new agGrid.Grid(exchGridDiv, exchGridOptions);
});

// pull available exchanges from FinnHub, populate drop-down list
populateFormOptions();

//
const selectFxForm = document.getElementById('selectFxForm');

selectFxForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get selected exchange from form
    let exchSelect = document.getElementById("exchSelect");
    let exchange = exchSelect.options[exchSelect.selectedIndex].text;

    populateGrid(exchange);

})

async function populateFormOptions() {
    const response = await fetch(`https://finnhub.io/api/v1/forex/exchange?token=${key}`);

    const exchanges = await response.json();

    exchanges.forEach(exchange => {
        console.log('here')
        let formRoot = document.getElementById('exchSelect');

        let formSelect = document.createElement('option');
        formSelect.setAttribute('id',`exchange-${exchange}`);
        formSelect.innerText = exchange;

        formRoot.append(formSelect);
    })

    console.log(exchanges)
}

async function populateGrid(selExchange) {
    console.log(selExchange)

    agGrid.simpleHttpRequest({
        url: `https://finnhub.io/api/v1/forex/symbol?exchange=${selExchange}&token=${key}`
    })
    .then((data) => {
        console.log(data)
        /** 
        let processedData = Object.keys(data.symbol).map((key) => { 
        return { curr: key, quote: data.quote[key] }
        });
        **/
    
        exchGridOptions.api.setRowData(data);
    })
}
 
/**
 * 
function getSelectedRows() {
    var selectedNodes = gridOptions.api.getSelectedNodes();
    var selectedData = selectedNodes.map(node => node.data);

    console.log(selectedData);
}
 */