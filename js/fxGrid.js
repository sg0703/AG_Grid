const columnDefs = [
{ field: "currency",  filter: true},
{ field: "quote", filter: true },
];

// let the grid know which columns and what data to use
const gridOptions = {
    columnDefs: columnDefs,
    //rowData: rowData,
    rowSelection: 'multiple'
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#exchGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});

function getSelectedRows() {
    var selectedNodes = gridOptions.api.getSelectedNodes();
    var selectedData = selectedNodes.map(node => node.data);

    console.log(selectedData);
}

agGrid.simpleHttpRequest({
    url: 'https://finnhub.io/api/v1/forex/rates?base=USD&token=c162mdv48v6ootkka5hg'
})
.then((data) => {
    let processedData = Object.keys(data.quote).map((key) => { 
    return { currency: key, quote: data.quote[key] }
    });

    fxGridOptions.api.setRowData(processedData);
})