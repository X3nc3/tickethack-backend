var express = require("express");
var router = express.Router();

const Trip = require("../models/trips");
const Booking = require("../models/bookings");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  Trip.findById(req.body.tripId).then((trip) => {
    if (trip) {
      const newBooking = new Booking({
        trip: trip._id,
        isInBooking: false,
      });
      newBooking.save().then(() => {
        res.json({ result: true });
      });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

router.get("/", (req, res) => {
  Booking.find({ isInBooking: false })
    .populate("trip")
    .then((tripCart) => {
      if (tripCart.length > 0) {
        res.json({ result: true, tripCart });
      } else {
        res.json({ result: false, error: "no tripCart fond!" });
      }
    });
}); 

router.delete("/:id", (req, res) => {
  Booking.deleteOne({ trip: req.params.id })
  .then((deleteTripCart) => {
    Booking.find({ isInBooking: false })
    .populate("trip")
    .then(tripCart => {
        res.json({ result: true, tripCart})
    });
  });
});

module.exports = router;
