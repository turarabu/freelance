const nedb = require('nedb');
const express = require('express');
const app = express();

app.use( express.static('frontend/dist') );
app.use( express.json()) ;
app.use( express.urlencoded() );

app.get('/api/office/list', function (request, response) {
    var office = new nedb({ filename: 'data/office' });
    office.loadDatabase();

    office.find({}, function (error, data) {
        response.send( JSON.stringify(data) );
    });
});

app.post('/api/office/add', function (request, response) {
    var office = new nedb({ filename: 'data/office' });
    office.loadDatabase();

    office.insert(request.body);
    response.send( JSON.stringify( request.body ) );
});

app.post('/api/office/remove', function (request, response) {
    var office = new nedb({ filename: 'data/office' });
    office.loadDatabase();

    office.remove(request.body);
    response.send( JSON.stringify( {error: false} ) );
});

app.post('/api/office/edit', function (request, response) {
    var office = new nedb({ filename: 'data/office' });
    office.loadDatabase();

    office.update({ hash: request.body.hash }, request.body);
    response.send( JSON.stringify( {error: false} ) );
});

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