var mongoose = require('mongoose');

var driverSchema = new mongoose.Schema({
    name: String,
    phone: String
});

var dirSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    long: Number
});

var transportsSchema = new mongoose.Schema({
	busNumber: String,
	companyName: String,
	directions: [dirSchema],
	fromDate: String,
	toDate: String,
	drivers: [driverSchema],
	distance: Number
});

mongoose.model('Buss', transportsSchema, 'transports');

/*
db.transports.insert({
busNumber: '1111УНА',
companyName: 'Буянт огоо',
fromDirection: 'Чойр',
toDirection: 'Улаанбаатар',
fromDate: ISODate("2017-12-22T06:40:03.389Z"),
toDate: ISODate("2017-12-20T12:40:03.389Z"),
drivers: [{
    name: 'Лодой',
    phone: '99776655',
    },
    {
    name: 'Бат',
    phone: '88773344',
    }],
distance: 230
});


{
    "busNumber": "1234УНА",
    "companyName": "Хараацайн жигүүр",
    "directions": [
        "Улаанбаатар",
        "Туул",
        "Эрдэнэ",
        "Мааньт",
        "Хоолт",
        "Ерөө",
        "Баянтал",
        "Шивээ",
        "Чойр"
    ],
    "fromDate": {
        "$date": "2018-01-04 09:40:03"
    },
    "toDate": {
        "$date": "2017-01-04 12:40:03"
    },
    "drivers": [
        {
            "name": "Банзрагч",
            "phone": "99776655"
        }
    ],
    "distance": 230
}

*/