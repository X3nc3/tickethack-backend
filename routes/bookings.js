var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings');

router.put('/', (req, res)=> {
    Booking.updateMany({isInBooking: false}, {isInBooking: true}).then((data)=> {
        res.json({
            result: true, data
        })
    })
})

router.get('/', (req,res)=> {
    Booking.find({isInBooking: true})
    .populate('trip')
    .then(tripBooking => {
        res.json({result: true, tripBooking})
        console.log(tripBooking);
    })
})

module.exports = router;
