/**
 * FX symbols by exchange 
 * Populates form with available exchanges
 * Once an exchange is chosen, populates grid with avail FX symbols
 */

// FinnHub API key
const key = 'c162mdv48v6ootkka5hg';

// grid configuration
const exchColumnDefs = [
    { field: "symbol",  filter: true, sortable: true },
    { field: "displaySymbol", filter: true, sortable: true },
    { field: "description", filter: true, sortable: true }
];

const exchGridOptions = {
    columnDefs: exchColumnDefs,
    rowSelection: 'multiple'
};

// load grid 
const exchGridDiv = document.querySelector('#exchGrid');
new agGrid.Grid(exchGridDiv, exchGridOptions);

// load dropdown options 
populateFormOptions();

// function to get available FX exchanges 
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
}

// once user picks an exchange, query FinnHub for avail symbols
async function populateGrid(selExchange) {
    const data = await agGrid.simpleHttpRequest({
        url: `https://finnhub.io/api/v1/forex/symbol?exchange=${selExchange}&token=${key}`
    })

    // no processing necessary - data is ready to go to grid
    exchGridOptions.api.setRowData(data);
}

// set up event listener to handle form submission
const selectFxForm = document.getElementById('selectFxForm');

selectFxForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get selected exchange from form
    let exchSelect = document.getElementById("exchSelect");
    let exchange = exchSelect.options[exchSelect.selectedIndex].text;

    populateGrid(exchange);

})