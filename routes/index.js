var express = require("express");
var router = express.Router();

require("../models/connection");
const moment = require("moment");
const Trip = require("../models/trips");

router.get("/:departure/:arrival/:date", (req, res) => {
    const {departure, arrival, date } = req.params
  Trip.find({
    departure: new RegExp (departure, 'i'),
    arrival: new RegExp (arrival, 'i'),
    date: { $gte: moment(date).startOf('day'), $lte: moment(date).endOf('day') },
  }).then((trips) => {
    if(trips.length>0){
        res.json({ result: true, trips });
    }else{
        res.json({result: false, error: "trips not found"})
    }
    
  });
});

module.exports = router;
