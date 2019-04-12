const nedb = require('nedb');
const express = require('express');
const app = express();

app.use( express.static('frontend/dist') );
app.use( express.json()) ;
app.use( express.urlencoded() );

app.post('/api/date', function (request, response) {
    var date = new Date( request.body.date ).toDateString();

    var office = new nedb({ filename: 'data/office' });
    var records = new nedb({ filename: 'data/records' });

    records.loadDatabase();
    office.loadDatabase();

    office.find({}, function (error, data) {
        records.find({ date }, function (error, result) {
            var res = [];

            result.forEach(function (record) {
                if (
                    (record.source.search('entrance') === -1) && 
                    (record.source.search('exit') === -1)
                ) return;

                var push = record;

                for (let i = 0; i != data.length; ++i) {
                    if( data[i].hash === record.idxid ) {
                        push.user = data[i];
                    }
                }

                res.push(push);
            });

            response.send( JSON.stringify(res) );
        });
    });

});

app.listen(8080, function () {
    console.log('App listening on port 8080');
});