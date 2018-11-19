const getUl = () => document.getElementById('invalidOrders');
const liCreator = () => document.createElement('li');
const textNodeCreator = document.createTextNode.bind(document);

const createTableColumn = () => {
    const table = document.getElementById("validOrders");

    const columnHeader = table
        .createTHead()
        .insertRow(0);
        
    const columnRow = table.insertRow(1);

    return { columnHeader, columnRow };
}

const createAndAppendLi = ul => each(node => {
    const li = liCreator();        
    li.appendChild(node);
    ul.appendChild(li);
});

function runReport() {
    const builder = reportBuilder(createTableColumn, textNodeCreator, createAndAppendLi(getUl()));
    builder(orders);
}

const orders = [
    { name: 'TV', price: 300, date: '2018-10-10' },
    { name: 'TV', price: 600, date: '2018-10-10' },    
    { name: 'laptop', price: 600, date: '2018-10-12' },
    { name: 'PC', price: 800, date: '2018-09-05' },
    { name: 'owen', price: 300 },
    { name: 'Camera', price: 500, date: '2018-03-03' },
    { name: 'Fridge', price: 1000, date: '2018-12-11' },
    { name: 'table', price: 150, date: '2018-12-10' },
    { name: 'Sofa', price: 400, date: '2018-12-08' },
    { name: 'chair', date: '2018-09-10' },
    { name: 'Window', price: 300, date: '2018-05-05' }
];