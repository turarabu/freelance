const fs = require('fs');
const NEDB = require('nedb');

const insert = require('./temp/insert');

const data = new NEDB({ filename: 'office' });

var result = [];

data.loadDatabase();
main();

function main () {
    for (let key in insert) {
        if ( insert.hasOwnProperty(key) )
            handle(key, insert[key]);
    }

    fs.writeFileSync(`${__dirname}/temp/result.json`, JSON.stringify(result));
}

function handle (key, object) {
    for (let i in object)
        if ( object.hasOwnProperty(i) ) {
            if ( result[i] === undefined )
                result[i] = {};

            result[i][key] = object[i];
        }
}