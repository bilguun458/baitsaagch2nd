var mongoose = require('mongoose');
var busModel = mongoose.model('Buss');

//placeholder funcs
var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//transportuudiin medeeleluud жагсаалтаар буцаах GET хүсэлт
module.exports.transportsListRead = function(req, res) {
	if (req.params && req.params.dir) {
		busModel
		.find( { directions: { $elemMatch: { name: req.params.dir } } } )
		.select("busNumber directions")
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transports not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, transport);
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No direction in request"
		});
	}
};
//нэг transportiin medeelel буцаах GET хүсэлт
module.exports.transportRead = function(req, res) {
	if (req.params && req.params.bus_id) {
		busModel
		.findById(req.params.bus_id)
		//.select('busNumber fromDirection toDirection toDate')
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transport not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, transport);
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No bus number in request"
		});
	}
};
//Yag jinhene deer tuhain dugaartai avtobusnii lat long butsaana gej uzne
module.exports.getLocation = function(req, res) {
	if (req.params && req.params.bus_num) {
		transport = {"lat": 46.353, "lng": 108.403};
		sendJsonResponse(res, 200, transport);
	} else {
		sendJsonResponse(res, 404, {
			"message": "No bus number in request"
		});
	}
};

//jinhenen ni postuudiin location uud , bairhiltai butsaana
module.exports.getLocations = function(req, res) {
	locs = [{name:"Улаанбаатар", lat : 47.8864, lng : 106.9057},
		    {name:"Дархан", lat : 49.4648, lng : 105.9746},
		    {name:"Чойр", lat : 46.3529, lng : 108.4032},
		    {name:"Замын Үүд", lat : 43.7152, lng : 111.9041}];
	sendJsonResponse(res, 200, locs);
};
//Ирсэн цаг(cameDate)-ийг update хийх put хүсэлт
module.exports.transportUpdateCameDate = function(req, res) {
	if (req.params && req.params.bus_id && req.params.late && req.params.speed && req.params.change) {
		busModel
		.findById(req.params.bus_id)
		//.select('busNumber fromDirection toDirection toDate')
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transport not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			transport.cameDate = Date.now();//Odoogiin date
			transport.late = req.params.late;
			transport.speed = req.params.speed;
			transport.change = req.params.change;
			transport.save(function(err, transport) {
				if (err) {
					sendJsonResponse(res, 404, err);
				} else {
					sendJsonResponse(res, 200, transport);
				}
			});
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No bus number or came date in request"
		});
	}
};
//Андуурч автобус ирсэн гэсэн мэдээлэл оруулсан тохиолдолд буцаах функц
module.exports.transportUpdateMistake = function(req, res) {
	if (req.params && req.params.bus_id) {
		busModel
		.findById(req.params.bus_id)
		//.select('busNumber fromDirection toDirection toDate')
		.exec(function(err, transport) {
			if (!transport) {
				sendJsonResponse(res, 404, {
					"message": "transport not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			transport.cameDate = null;//null date
			transport.save(function(err, transport) {
				if (err) {
					sendJsonResponse(res, 404, err);
				} else {
					sendJsonResponse(res, 200, transport);
				}
			});
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No bus number or came date in request"
		});
	}
};
//conf medeelel буцаах GET хүсэлт
module.exports.getConf = function(req, res) {
	busModel
	.find({"cameDate" : null})
	//.count()
	.exec(function(err, transport) {
		if (!transport) {
			sendJsonResponse(res, 404, {
				"message": "transports not found"
			});
			return;
		} else if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}
		sendJsonResponse(res, 200, transport);
	});
};