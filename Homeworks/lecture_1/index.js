const { upperFirst, groupBy, partition, flow, map, join, each, reduce } = _;

const validator = x => x.name && x.price && x.date;

const mapper = x => ({
    name: upperFirst(x.name),
    price: `\$${x.price}`,
    date: x.date
});

const reportBuilder = (tableColumnCreator, textNodeCreator, nodePrinter) => orders => {
    const [validOrders, invalidOrders] = partition(validator, orders);
    
    flow([
        map(mapper),
        groupBy('date'),
        createDataColumn,
        printValidOrdersTable(tableColumnCreator())
    ])(validOrders);

    printInvalidOrders(textNodeCreator, nodePrinter)(invalidOrders);
}

const fmap = value => Object.keys(value).map(key => ({
    header: key,
    value: value[key]
}));

const getRow = flow(
    map(item => `${item.name} - ${item.price}\n`),
    join(' | ')
);

const createDataColumn = flow(
    fmap,
    map(({ header, value }) => ({
        header,
        row: getRow(value)
    }))
);

const printValidOrdersTable = ({ columnHeader, columnRow }) =>
    each(({ header, row }, index) => {
        columnHeader.insertCell(index).innerHTML = header;
        columnRow .insertCell(index).innerHTML = row
    })

const printInvalidOrders = (textNodeCreator, printNode) => 
    flow(
        createTextNodes(textNodeCreator),
        printNode
    );

const createTextNodes = textNodeCreator => map(order => 
    textNodeCreator(`${order.name ? `Name: ${order.name}` : ''}${order.price ? ` | Price: ${order.price}` : '' }${order.date ? ` | Date: ${order.date}`: ''} `)
);
