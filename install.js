const nedb = require('nedb');
const insert = {
    office: [],
    temp: [],
    records: []
};

main();
parse();
done();

function main () {
    if ('office') 
        insert.office = require('./temp/office');

    if ('records')
        insert.temp = require('./temp/records');
}

function parse () {
    var temp = insert.temp;

    for (let key in temp) {
        if ( temp.hasOwnProperty(key) ) {
            let object = temp[key];

            for (let i in object)
                if ( object.hasOwnProperty(i) ) {
                    if ( insert.records[i] === undefined )
                        insert.records[i] = {};

                    insert.records[i][key] = object[i];
                }
        }
    }
}

function done () {
    if ('office') {
        let data = new nedb({ filename: 'data/office' });

        data.loadDatabase();
        insert.office.forEach(function (push) {
            data.insert(push);
        });
    }

    if ('records') {
        let data = new nedb({ filename: 'data/records' });

        data.loadDatabase();
        insert.office.forEach(function (record) {
            record.detected = new Date(record.detected);
            data.insert(record);
        });
    }
}